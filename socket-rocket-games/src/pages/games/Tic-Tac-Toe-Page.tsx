import TicTac from "@/components/games/TicTacToeGame";
import FloatingChat from "@/components/items/floatingChat";
import JoinGameModal from "@/components/items/joinGameModal";
import GameDetails from "@/components/items/gameDetails";
import GamesLayout from "@/components/layouts/gamesLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import io from "socket.io-client";
// import useTicTacToeStore from "@/store/zustand/ticTacToeStore";
// import useModalStore from "@/store/zustand/modalStore";
import { RootState, store } from "@/store/redux/store/";
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
import { Provider, useSelector } from "react-redux";

export default function games() {
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
      <Provider store={store}>
        <GamesLayout>
          <div className="flex justify-center">
            <h2 className="area-title">{path.pathname.split("/").pop()}</h2>
          </div>
          <div className="flex justify-center">
            {/* Game ------------ */}
            <TicTac /> {/* onBoardChange={handleBoardChange} /> */}
            {/* ----------- */}
          </div>
          <FloatingChat chatVis={false}></FloatingChat>
          <JoinGameModal></JoinGameModal>
          <GameDetails></GameDetails>
        </GamesLayout>
      </Provider>
    </>
  );
}
