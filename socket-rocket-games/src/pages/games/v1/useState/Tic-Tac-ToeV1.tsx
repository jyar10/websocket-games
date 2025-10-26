import TicTac from "@/components/games/TicTacToeGame";
// import ErrorModal from "@/Components/items/errorModal";
import FloatingChat from "@/components/items/floatingChat";
import Modal from "@/components/items/joinGameModal";
import GamesLayout from "@/components/layouts/gamesLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket: any;

type gameStateType = {
  opponent: string;
  positionState: string[];
  playerTurn: boolean;
};

export default function games() {
  let defaultGameState: gameStateType = {
    opponent: "none",
    positionState: Array(9).fill(""),
    playerTurn: true,
  };
  const [message, setMessage] = useState("");
  const [roomName, setRoom] = useState("");
  const [roomNameDisplay, setRoomDisplay] = useState("");
  const [joined, setHasJustJoined] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameDisplay, setUsernameDisplay] = useState("");
  const [sendMessage, setSendMessages] = useState(false);
  const [modalVis, setModalVis] = useState(false);
  const [gameState, setGameState] = useState(defaultGameState);
  const [showSetUpButton, setSetUpButtonState] = useState(true);

  useEffect(() => {}, [showSetUpButton]);

  const handleFloatChildValue = (value: boolean) => {
    setSendMessages(value);
    handleSubmit(null);
  };

  const handleModalChildValue = (value: boolean) => {
    setModalVis(value);
  };

  const handleGameStart = (value: gameStateType) => {
    setGameState(value);
  };

  const [allMessages, setAllMessages] = useState<any[]>([]);

  useEffect(() => {
    socketInitializer();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  async function socketInitializer() {
    socket = new (io as any)({
      path: "/api/socket",
      addTrailingSlash: false,
    });

    socket.on("receiveMessage", (data: any) => {
      setAllMessages((prevState) => [...prevState, data]);
    });

    socket.on("secondPlayerJoined", (data: any) => {
      setGameState({
        opponent: data.opponent,
        positionState: Array(9).fill(""),
        playerTurn: true,
      });
    });

    socket.on("otherPlayerTookTurn", (data: any) => {
      setGameState({
        opponent: data.opponent,
        positionState: Array(9).fill(""),
        playerTurn: false,
      });
    });
  }

  function handleBoardChange() {}

  function handleSubmit(e: any) {
    if (e) {
      e.preventDefault();
    }

    if (
      sendMessage &&
      message &&
      roomNameDisplay !== "" &&
      usernameDisplay !== ""
    ) {
      console.log("message emitted");
      socket.emit("message", {
        roomName,
        username,
        message,
        justJoined: true,
      });
      setSendMessages(false);
      setMessage("");
    }
  }

  function handleRoomSubmit(e: any) {
    e.preventDefault();
    console.log("room emitted");

    // Emit a message to the room
    const message = " has joined the room!";
    if (roomNameDisplay != roomName) {
      setAllMessages([]);
      socket.emit("leaveRoom", roomNameDisplay);
    }
    if (username) {
      socket.emit("joinRoom", roomName);
      setHasJustJoined(true);
      socket.emit("message", {
        roomName,
        username,
        message,
        justJoined: true,
      });
      setRoomDisplay(roomName);
      setUsernameDisplay(username);
      setSetUpButtonState(false);
    }
  }

  let path = useRouter();

  return (
    <>
      <GamesLayout>
        <div className="flex justify-center">
          <h2 className="area-title">{path.pathname.split("/").pop()}</h2>
        </div>
        <div className="flex justify-center">
          {/* Game ------------ */}
          <TicTac /> {/* onBoardChange={handleBoardChange} /> */}
          {/* ----------- */}
        </div>
        <div className="flex justify-center">
          <div className="flex gap-2 flex-wrap">
            <div>you: {usernameDisplay}</div>
            <div>opponent: {gameState.opponent}</div>
            <div>room: {roomNameDisplay}</div>
          </div>
        </div>
        <FloatingChat modalVis={modalVis} onSendValue={handleFloatChildValue}>
          <div className="overflow-auto flex-grow scrollbar">
            {allMessages.map(({ username, message }, index) => (
              <div key={index}>
                {username}: {message}
              </div>
            ))}
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              name="message"
              placeholder="enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoComplete={"off"}
              className="text-black w-full p-1"
            />
          </form>
        </FloatingChat>
        <Modal
          showSetUpButton={showSetUpButton}
          onSendValue={handleModalChildValue}
        >
          <div className="flex flex-col justify-center pt-6">
            <p className="p-2">
              To get started, enter your player name and a game room. Other
              players can join your game with the same room name on their
              device.
            </p>
            <form className="gap-y-2 flex flex-col" onSubmit={handleRoomSubmit}>
              <input
                className="border rounded-md border-black w-full p-2"
                placeholder="enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                name="room"
                placeholder="enter your room"
                value={roomName}
                onChange={(e) => setRoom(e.target.value)}
                autoComplete={"off"}
                className="border border-black rounded-md p-2"
              />
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Join
              </button>
            </form>
          </div>
        </Modal>
        {joined ? (
          <button className="border border-black">
            {" "}
            {/* onClick={handleGameStart} */}
            Start the Game
          </button>
        ) : null}
      </GamesLayout>
    </>
  );
}
