import React, { ReactNode, useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";

type FlaotingChatProps = {
  modalVis: boolean;
  onSendValue: any;
  children: ReactNode;
};

export default function FloatingChat({
  modalVis,
  onSendValue,
  children,
}: FlaotingChatProps) {
  const [showExpandedChat, openChatHandler] = useState(false);
  const handleClick = () => {
    let value = true;
    onSendValue(value);
  };

  useEffect(() => {
    openChatHandler(false);
  }, [modalVis]);

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

            {/* <div className="overflow-auto flex-grow scrollbar">{children}</div> */}
            {children}
            <div className="flex justify-center gap-2 pb-2">
              <button
                onClick={handleClick}
                className="p-1 pr-2 pl-2 border border-blue-600 hover:border-blue-800 focus:ring-2 focus:outline-none focus:bg-blue-400 dark:focus:bg-blue-800 font-medium rounded-lg "
              >
                Send
              </button>
              <button
                onClick={() => openChatHandler(false)}
                className="p-1 pr-2 pl-2 border border-slate-700 hover:border-slate-800 focus:ring-slate-800 focus:ring-2 focus:outline-none focus:bg-slate-400 dark:focus:bg-slate-800 font-medium rounded-lg "
              >
                Close
              </button>
            </div>
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
