import TicTac from "@/components/games/TicTacToeGame";
import FloatingChat from "@/components/items/floatingChat";
import Modal from "@/components/items/joinGameModal";
import GamesLayout from "@/components/layouts/gamesLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import io from "socket.io-client";
// import useTicTacToeStore from "@/store/zustand/ticTacToeStore";
// import useModalStore from "@/store/zustand/modalStore";
import { store } from "@/store/redux/store/";
import {
  resetMessages,
  setAllMessages,
  setMessage,
} from "@/store/redux/slice/messagesSlice";
import { shallow } from "zustand/shallow";

let socket: any;

type gameStateType = {
  opponent: string;
  positionState: string[];
  playerTurn: boolean;
};

// const [modalVis, setModalVisibility] = useModalStore(
//   (state: { visibility: any; setVisibility: any }) => [
//     state.visibility,
//     state.setVisibility,
//   ],
//   shallow
// );

// const [
//   username,
//   setUsername,
//   joined,
//   setJoined,
//   room,
//   setRoom,
//   opponent,
//   setOpponent,
//   positionState,
//   setPositionState,
//   playerTurn,
//   setPlayerTurnState,
// ] = useTicTacToeStore(
//   (state: {
//     username: any;
//     setUsername: any;
//     joined: any;
//     setJoined: any;
//     room: any;
//     setRoom: any;
//     opponent: any;
//     setOpponent: any;
//     positionState: any;
//     setPositionState: any;
//     playerTurn: any;
//     setPlayerTurnState: any;
//   }) => [
//     state.username,
//     state.setUsername,
//     state.joined,
//     state.setJoined,
//     state.room,
//     state.setRoom,
//     state.opponent,
//     state.setOpponent,
//     state.positionState,
//     state.setPositionState,
//     state.playerTurn,
//     state.setPlayerTurnState,
//     shallow,
//   ]
// );
// store.getState().messages.messages

export default function games() {
  store.dispatch(
    setAllMessages([
      {
        message: "world ",
        username: "hello",
      },
    ])
  );

  const handleFloatChildValue = (value: string) => {
    // setMessage(value, username);
    handleChatSubmit(null);
  };

  const handleModalChildValue = (value: boolean) => {
    // setModalVisibility();
  };

  const handleGameStart = (value: gameStateType) => {
    // ticTacToeStore.setGameState(value);
  };

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
      setAllMessages(data);
    });

    socket.on("secondPlayerJoined", (data: any) => {
      // setGameState({
      //   opponent: data.opponent,
      //   positionState: Array(9).fill(""),
      //   playerTurn: true,
      // });
    });

    socket.on("otherPlayerTookTurn", (data: any) => {
      // setGameState({
      //   opponent: data.opponent,
      //   positionState: Array(9).fill(""),
      //   playerTurn: false,
      // });
    });
  }

  function handleBoardChange() {}

  function handleChatSubmit(e: any) {
    if (e) {
      e.preventDefault();
    }
    let message = e.target.value || "";

    // if (message && room !== "" && username !== "") {
    //   console.log("message emitted");
    //   socket.emit("message", {
    //     room,
    //     username,
    //     message,
    //     justJoined: true,
    //   });
    //   resetMessages();
    // }
  }

  function handleRoomSubmit(e: any) {
    e.preventDefault();
    console.log("room emitted");

    // Emit a message to the room
    const message = " has joined the room!";
    // if (room != roomName) {
    //   resetMessages();
    //   socket.emit("leaveRoom", room);
    // }
    // -
    // if (username) {
    //   socket.emit("joinRoom", room);
    //   setJoined();
    //   socket.emit("message", {
    //     room,
    //     username,
    //     message,
    //     justJoined: true,
    //   });
    //   setRoom(room);
    //   setUsername(username);
    // }
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
            {/* <div>you: {username}</div>
            <div>opponent: {opponent}</div>
            <div>room: {room}</div> */}
          </div>
        </div>
        <FloatingChat
          modalVis={false /*modalVis*/}
          onSendValue={handleFloatChildValue}
        >
          <div className="overflow-auto flex-grow scrollbar">
            {store
              .getState()
              .messages.messages.map(({ username, message }, index) => (
                <div className="pl-2 pt-1" key={index}>
                  {username}: {message}
                </div>
              ))}
          </div>
          <form className="w-full" onSubmit={handleChatSubmit}>
            <input
              name="message"
              placeholder="enter your message"
              onChange={(e) =>
                setMessage({
                  message: e.target.value,
                  username: username,
                })
              }
              autoComplete={"off"}
              className="text-black w-full p-1"
            />
          </form>
        </FloatingChat>
        <Modal onSendValue={handleModalChildValue}>
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
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
              />
              <input
                name="room"
                placeholder="enter your room"
                // onChange={(e) => setRoom(e.target.value)}
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
        {/* {joined ? (
          <button className="border border-black">
            {" "}
           // onClick={handleGameStart}
            Start the Game
          </button>
        ) : null} */}
      </GamesLayout>
    </>
  );
}
