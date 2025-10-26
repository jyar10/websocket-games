import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface messagesStoreState {
  messages: messagesType[];
}
interface messagesType {
  message: string;
  username: string;
}

const initialState: messagesStoreState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "messagesSlice",
  initialState,
  reducers: {
    setAllMessages: (state, action: PayloadAction<messagesType[]>) => {
      state.messages = action.payload;
    },
    setMessage: (state, action: PayloadAction<messagesType>) => {
      state.messages.push({
        message: action.payload.message,
        username: action.payload.username,
      });
      state.messages = state.messages;
    },
    setReceiveMessage: (state, action: PayloadAction<messagesType>) => {
      state.messages.push({
        message: action.payload.message,
        username: action.payload.username,
      });
      state.messages = state.messages;
    },
    resetMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { setAllMessages, setMessage, resetMessages, setReceiveMessage } =
  messagesSlice.actions;
export default messagesSlice.reducer;
