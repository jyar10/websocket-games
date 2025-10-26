import React, { ReactNode, useEffect, useState } from "react";

type ModalProps = {
  showSetUpButton: boolean;
  onSendValue: any;
  children: ReactNode;
};

export default function Modal({
  showSetUpButton,
  onSendValue,
  children,
}: ModalProps) {
  const [showModal, setShowModal] = useState(false);

  const handleModalParentValue = (val: boolean) => {
    onSendValue(val);
  };

  return (
    <>
      {showSetUpButton ? (
        <button
          className="border border-black"
          onClick={() => setShowModal(true)}
        >
          {" "}
          Setup
        </button>
      ) : null}
      {showModal && showSetUpButton ? (
        <>
          <div
            onClick={() => {
              handleModalParentValue(false);
              setShowModal(false);
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
                    handleModalParentValue(false);
                    setShowModal(false);
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
                <div className="p-6 text-center">{children}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
