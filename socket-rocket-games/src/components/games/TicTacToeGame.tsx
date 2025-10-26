import React, { useEffect, useRef, useState } from "react";

const INITIAL_STATE = Array(9).fill("");

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function TicTac() {
  const [board, setBoard] = useState(INITIAL_STATE);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState<string | null>(null);

  // const prevParam = useRef(onBoardChange);

  // useEffect(() => {
  //   if (prevParam.current !== onBoardChange) {
  //     setBoard(onBoardChange.positionState);
  //   }

  //   prevParam.current = onBoardChange;
  // }, [onBoardChange]);

  // const handleClick = () => {
  //   let value = true;
  //   onSendBoard(value);
  // };

  const handleCellClick = (index: number) => {
    if (board[index] === "" && !winner) {
      const updatedBoard = [...board];
      updatedBoard[index] = currentPlayer;
      setBoard(updatedBoard);
      checkWinner(updatedBoard, currentPlayer);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const checkWinner = (board: any[], player: string) => {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        return;
      }
    }
    if (board.every((cell) => cell !== "")) {
      setWinner("Draw");
    }
  };

  const handleRestart = () => {
    setBoard(INITIAL_STATE);
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-3 gap-2 mb-8">
        {board.map((cell, index) => (
          <div
            key={index}
            className=" w-20 h-20 border border-gray-300 bg-white p-4 text-center cursor-pointer select-none"
            onClick={() => handleCellClick(index)}
          >
            {cell === "X" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-12 h-12"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : cell === "O" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-12 h-12"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            ) : null}
          </div>
        ))}
      </div>
      <div className="text-lg font-semibold mb-4">
        <div className="flex flex-col">
          {winner ? (
            <>
              {winner === "Draw" ? (
                <span>It's a draw!</span>
              ) : (
                <span>Player {winner} wins!</span>
              )}
              <button
                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleRestart}
              >
                Restart
              </button>
            </>
          ) : (
            <span>Current Player: {currentPlayer}</span>
          )}
        </div>
      </div>
    </div>
  );
}
