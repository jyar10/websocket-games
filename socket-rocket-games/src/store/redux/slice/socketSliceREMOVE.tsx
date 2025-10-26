import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import io from "socket.io-client";
import { useEffect } from "react";

let socket: any;

useEffect(() => {
  socketInitializer();

  return () => {
    if (socket) {
      socket.disconnect();
    }
  };
}, []);

async function socketInitializer() {
  socket = new (io as any)({
    path: "/api/socket",
    addTrailingSlash: false,
  });

  socket.on("receiveMessage", (data: any) => {
    // setAllMessages(data);
  });

  socket.on("secondPlayerJoined", (data: any) => {
    // setGameState({
    //   opponent: data.opponent,
    //   positionState: Array(9).fill(""),
    //   playerTurn: true,
    // });
  });

  socket.on("otherPlayerTookTurn", (data: any) => {
    // setGameState({
    //   opponent: data.opponent,
    //   positionState: Array(9).fill(""),
    //   playerTurn: false,
    // });
  });
}

interface socketState {
  socket: any;
}

const initialState: socketState = {
  socket: socket,
};

// const socketSlice = createSlice({
//   name: "socketSlice",
//   initialState,
//   reducers: {
//     joineRoom: (state, action: PayloadAction<messagesType[]>) => {
//       state.messages = action.payload;
//     },
//     setMessage: (state, action: PayloadAction<messagesType>) => {
//       state.messages.push({
//         message: action.payload.message,
//         username: action.payload.username,
//       });
//       state.messages = state.messages;
//     },
//     resetMessages: (state) => {
//       state.messages = [];
//     },
//   },
// });

// export const { setAllMessages, setMessage, resetMessages } =
//   socketSlice.actions;
// export default socketSlice.reducer;
