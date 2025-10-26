import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type ticTacToeState = {
  username: string;
  joined: boolean;
  room: string;
  roomMembers: roomMembers;
  opponent: string;
  positionState: string[];
  playerTurn: boolean;
  socket: boolean;
};

type roomMembers = { room: string; players: string[] };
type roomMembersPayload = { room: string; player: string };

const initialState: ticTacToeState = {
  username: "",
  joined: false,
  room: "",
  roomMembers: { room: "", players: [] },
  opponent: "",
  positionState: [],
  playerTurn: false,
  socket: false,
};

const ticTacToeSlice = createSlice({
  name: "ticTacToeSlice",
  initialState,
  reducers: {
    //-----------------------------//
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },

    //-----------------------------//
    setOpponent: (state, action: PayloadAction<string>) => {
      state.opponent = action.payload;
    },

    //-----------------------------//
    setRoomMembers: (state, action: PayloadAction<roomMembersPayload>) => {
      state.roomMembers.room = action.payload.room;
      state.roomMembers.players.push(action.payload.player);
      state.roomMembers = state.roomMembers;
    },

    //-----------------------------//
    setJoined: (state, action: PayloadAction<boolean>) => {
      state.joined = action.payload;
    },
    //-----------------------------//
    setRoom: (state, action: PayloadAction<string>) => {
      state.room = action.payload;
    },
    //-----------------------------//
    setPositionState: (state, action: PayloadAction<string[]>) => {
      state.positionState = action.payload;
    },
    setPlayerTurnState: (state, action: PayloadAction<boolean>) => {
      state.playerTurn;
    },
    connectToSocket: (state) => {
      state.socket = true;
    },
    disconnectFromSocket: (state) => {
      state.socket = false;
    },
  },
});

export const {
  setUsername,
  setOpponent,
  setJoined,
  setRoom,
  setPositionState,
  setPlayerTurnState,
  connectToSocket,
  disconnectFromSocket,
  setRoomMembers,
} = ticTacToeSlice.actions;
export default ticTacToeSlice.reducer;
