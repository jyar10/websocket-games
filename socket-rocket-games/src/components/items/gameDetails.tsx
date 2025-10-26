import React, { ReactNode, useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { AppDispatch, store, RootState } from "@/store/redux/store/";
import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import modalSlice, { setVisibility } from "@/store/redux/slice/modalSlice";

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
} from "@/store/redux/slice/ticTacToeSlice";

let ticTacToeSlice;

export default function gameDetails() {
  ticTacToeSlice = useSelector((state: RootState) => state.ticTacToeSlice);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-1/2 m-auto">
          <div className="flex flex-col gap-1 flex-wrap">
            <div>You: {ticTacToeSlice.username}</div>
            <div>Opponent: {ticTacToeSlice.opponent}</div>
            <div>Room: {ticTacToeSlice.room}</div>
          </div>
        </div>
      </div>
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
              store.dispatch(setVisibility(true));
            }
          }}
        >
          Join a Room
        </button>
      )}
    </>
  );
}
