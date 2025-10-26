import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface modalStoreState {
  visibility: boolean;
  type: string;
  message: string;
}

const initialState: modalStoreState = {
  type: "information",
  visibility: true,
  message: "",
};

const modalSlice = createSlice({
  name: "messagesSlice",
  initialState,
  reducers: {
    setVisibility: (state, action: PayloadAction<boolean>) => {
      state.visibility = action.payload;
    },
  },
});

export const { setVisibility } = modalSlice.actions;
export default modalSlice.reducer;
