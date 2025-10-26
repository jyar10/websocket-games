import { create } from "zustand";

type ticTacToeStore = {
  username: string;
  setUsername: (username: string) => void;
  joined: boolean;
  setJoined: () => void;
  room: string;
  setRoom: (room: string) => void;
  //   gameState: gameStateType;
  opponent: string;
  setOpponent: (opponent: string) => void;
  positionState: string[];
  setPositionState: (positionState: string[]) => void;
  playerTurn: boolean;
  setPlayerTurnState: () => void;
};

const useTicTacToeStore = create<ticTacToeStore>((set) => ({
  //-----------------------------//
  username: "",
  setUsername: (username: string) =>
    set(() => {
      return {
        username: username,
      };
    }),
  //-----------------------------//
  opponent: "",
  setOpponent: (opponent: string) =>
    set(() => {
      return {
        opponent: opponent,
      };
    }),
  //-----------------------------//
  joined: false,
  setJoined: () =>
    set((state: ticTacToeStore) => ({
      joined: !!state.joined,
    })),
  //-----------------------------//
  room: "",
  setRoom: (room: string) =>
    set(() => {
      return {
        room: room,
      };
    }),
  //-----------------------------//
  positionState: Array(9).fill(""),
  setPositionState: (positionState: string[]) =>
    set(() => {
      return {
        positionState: positionState,
      };
    }),
  playerTurn: false,
  setPlayerTurnState: () =>
    set((state) => {
      return {
        playerTurn: !!state.playerTurn,
      };
    }),
  //-----------------------------//
}));

export default useTicTacToeStore;
