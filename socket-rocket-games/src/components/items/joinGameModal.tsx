import React, { ReactNode, useEffect, useState } from "react";
import { RootState, store } from "@/store/redux/store/";
import {
  setUsername,
  setOpponent,
  setJoined,
  setRoom,
  setPositionState,
  setPlayerTurnState,
  setRoomMembers,
} from "@/store/redux/slice/ticTacToeSlice";
import messagesSlice, {
  resetMessages,
  setAllMessages,
  setMessage,
} from "@/store/redux/slice/messagesSlice";
import modalSlice, { setVisibility } from "@/store/redux/slice/modalSlice";
import { useSelector } from "react-redux";

type ModalProps = {
  modalVis: boolean;
  // onSendValue: any;
  // children: ReactNode;
};

export default function JoinGameModal() {
  let ticTacToeSlice = store.getState().ticTacToeSlice;
  let messagesSlice = store.getState().messagesSlice;
  let modalSlice = useSelector((state: RootState) => state.modalSlice);

  // const [showModal, setShowModal] = useState(modalVis);

  function handleRoomSubmit(e: any) {
    e.preventDefault();
    console.log(e + " room emitted");

    // Emit a message to the room
    const message = " has joined the room!";
    if (ticTacToeSlice.room === "") {
      store.dispatch(resetMessages());
    }
    store.dispatch(setJoined(true));
    store.dispatch(setUsername(e.target[0].value));
    store.dispatch(setRoom(e.target[1].value));
    store.dispatch(
      setRoomMembers({ room: e.target[1].value, player: e.target[0].value })
    );
    store.dispatch(
      setMessage({
        message,
        username: e.target[0].value,
      })
    );
    store.dispatch(setVisibility(false));
  }

  return (
    <>
      {modalSlice.visibility ? (
        <>
          <div
            onClick={() => {
              store.dispatch(setVisibility(false));
            }}
            id="overlay"
            className="fixed opacity-60 top-0 left-0 right-0 bottom-0 z-100 bg-gray-500"
          ></div>
          <div
            id="popup-modal"
            //   tabIndex={-1}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-2/5"
          >
            <div className="relative w-full ">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  //   data-modal-hide="popup-modal"
                  onClick={() => {
                    store.dispatch(setVisibility(false));
                  }}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center">
                  {/* Contents of modal */}
                  <div className="flex flex-col justify-center pt-6">
                    <p className="p-2">
                      To get started, enter your player name and a game room.
                      Other players can join your game with the same room name
                      on their device.
                    </p>
                    <form
                      className="gap-y-2 flex flex-col"
                      onSubmit={handleRoomSubmit}
                    >
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
                  {/* Contents of modal */}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
