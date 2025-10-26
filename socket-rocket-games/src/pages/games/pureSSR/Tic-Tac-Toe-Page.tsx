import TicTac from "@/components/games/TicTacToeGame";
import FloatingChat from "@/components/items/floatingChat";
import JoinGameModal from "@/components/items/joinGameModal";
import GamesLayout from "@/components/layouts/gamesLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import io from "socket.io-client";
// import useTicTacToeStore from "@/store/zustand/ticTacToeStore";
// import useModalStore from "@/store/zustand/modalStore";
import { store } from "@/store/redux/store/";
import {
  resetMessages,
  setAllMessages,
  setMessage,
} from "@/store/redux/slice/messagesSlice";
import {
  setUsername,
  setOpponent,
  setJoined,
  setRoom,
  setPositionState,
  setPlayerTurnState,
  connectToSocket,
  disconnectFromSocket,
} from "@/store/redux/slice/ticTacToeSlice";

export default function games() {
  let ticTacToeSlice = store.getState().ticTacToeSlice;
  let messagesSlice = store.getState().messagesSlice;

  store.dispatch(
    setAllMessages([
      {
        message: "Hello World",
        username: "admin",
      },
    ])
  );

  console.log("connectToSocket");
  store.dispatch(connectToSocket());

  // useEffect(() => {
  //   return () => {
  //     if (!store.getState().ticTacToeSlice.joined) {
  //       store.dispatch(disconnectFromSocket());
  //     }
  //   };
  // }, []);

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
            <div>pureSSR</div>
            <div>you: {ticTacToeSlice.username}</div>
            <div>opponent: {ticTacToeSlice.opponent}</div>
            <div>room: {ticTacToeSlice.room}</div>
          </div>
        </div>
        <FloatingChat chatVis={false}></FloatingChat>
        <JoinGameModal modalVis={true}></JoinGameModal>
        {ticTacToeSlice.joined ? (
          <button
            className="border border-black w-1/2 m-auto"
            onClick={() => {
              {
                /* set gameState store visibility here*/
              }
            }}
          >
            Start Game
          </button>
        ) : (
          <button
            className="border border-black w-1/2 m-auto"
            onClick={() => {
              {
                /* set modal store visibility here*/
              }
            }}
          >
            Join a Room
          </button>
        )}
      </GamesLayout>
    </>
  );
}
