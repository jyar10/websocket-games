import React, { ReactNode, useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { AppDispatch, store, RootState } from "@/store/redux/store/";
import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import {
  resetMessages,
  setAllMessages,
  setMessage,
} from "@/store/redux/slice/messagesSlice";

type FlaotingChatProps = {
  chatVis: boolean;
};
let messagesSlice: any;
let ticTacToeSlice;
let unsubscribe;

function handleChatSubmit(e: any) {
  let prevTicTacToeSlice = store.getState().ticTacToeSlice;
  if (e) {
    e.preventDefault();
  }
  let message = e.target[0].value || "";

  if (
    message &&
    prevTicTacToeSlice.room !== "" &&
    prevTicTacToeSlice.username !== ""
  ) {
    console.log("message emitted");
    // socket.emit("message", {
    //   room,
    //   username,
    //   message,
    //   justJoined: true,
    // });
    // resetMessages();
    store.dispatch(
      setMessage({
        message: e.target[0].value,
        username: prevTicTacToeSlice.username,
      })
    );
    e.target[0].value = "";
  }
}

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function FloatingChat({ chatVis }: FlaotingChatProps) {
  messagesSlice = useSelector((state: RootState) => state.messagesSlice);

  useEffect(() => {
    const scrollElement = document.querySelector("#scrollBar");
    const messages = document.querySelectorAll("#message");
    const messageElement = messages[messages.length - 1];

    if (scrollElement && messageElement) {
      scrollElement.scrollTop =
        messageElement.offsetHeight + messageElement.offsetTop;
    }
  }, [messagesSlice]);
  // useEffect(() => {
  //   const unsubscribe = store.subscribe(handleState);

  //   return () => {
  //     unsubscribe(); // Cleanup: Unsubscribe when the component unmounts
  //   };
  // }, []);
  // const unsubscribe = store.subscribe(handleState);
  // unsubscribe();

  const [showExpandedChat, openChatHandler] = useState(false);
  useEffect(() => {
    openChatHandler(false);
  }, [chatVis]);

  return (
    <>
      {showExpandedChat && (
        <div
          className={
            showExpandedChat
              ? "transition-opacity opacity-100 w-1/5 fixed bottom-24 right-10 bg-slate-600 h-64 rounded drop-shadow-lg flex text-white text-lg hover:drop-shadow-2xl"
              : "transition-opacity opacity-0 w-1/5 fixed  bottom-24 right-10 bg-slate-600 h-64 rounded drop-shadow-lg flex text-white text-lg hover:drop-shadow-2xl "
          }
        >
          <div className="flex flex-col justify-between w-full">
            <div className="flex justify-center w-full h-8 bg-slate-400 ">
              Chat <AiOutlineMail className=" pl-2 text-3xl" />
            </div>

            {/* children */}
            <div id="scrollBar" className="overflow-auto flex-grow scrollbar">
              {messagesSlice.messages.map(
                ({ username, message }: any, index: any) => (
                  <div id="message" className="pl-2 pt-1" key={index}>
                    {username}: {message}
                  </div>
                )
              )}
            </div>
            <form className="w-full" onSubmit={handleChatSubmit}>
              <input
                name="message"
                placeholder="enter your message"
                autoComplete={"off"}
                className="text-black w-full p-1"
              />
              <div className="flex justify-center gap-2 pb-2 p-2">
                <button
                  type="submit"
                  className="p-1 pr-2 pl-2 border border-blue-600 hover:border-blue-800 focus:ring-2 focus:outline-none focus:bg-blue-400 dark:focus:bg-blue-800 font-medium rounded-lg "
                >
                  Send
                </button>
                <button
                  type="button"
                  onClick={() => openChatHandler(false)}
                  className="p-1 pr-2 pl-2 border border-slate-700 hover:border-slate-800 focus:ring-slate-800 focus:ring-2 focus:outline-none focus:bg-slate-400 dark:focus:bg-slate-800 font-medium rounded-lg "
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {!showExpandedChat && (
        <button
          onClick={() => openChatHandler(true)}
          title="Contact Sale"
          className="fixed bottom-24 right-10 bg-green-700 w-24 h-10 rounded drop-shadow-lg flex justify-center items-center text-white text-lg hover:bg-green-500 hover:drop-shadow-2xl "
        >
          Chat <AiOutlineMail className="pl-2 text-2xl" />
        </button>
      )}
    </>
  );
}
