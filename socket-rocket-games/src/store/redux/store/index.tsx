import { combineReducers, configureStore } from "@reduxjs/toolkit";

import messagesSlice from "../slice/messagesSlice";
import ticTacToeSlice from "../slice/ticTacToeSlice";
import modalSlice from "../slice/modalSlice";
import socketMiddleware from "@/store/redux/middleware/socketMiddleware";
// import middleware from "";
// import reduxLogger from "redux-logger";
// const logger = reduxLogger.createLogger()
// const rootReducer = combineReducers();
// messagesSlice: messagesSlice,
//     ticTacToeSlice: ticTacToeSlice,

export const store = configureStore({
  reducer: {
    messagesSlice: messagesSlice,
    ticTacToeSlice: ticTacToeSlice,
    modalSlice: modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
