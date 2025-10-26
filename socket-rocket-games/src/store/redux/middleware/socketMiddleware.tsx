import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";
import messagesSlice, {
  setAllMessages,
  setMessage,
  resetMessages,
  setReceiveMessage,
  messagesStoreState,
} from "../slice/messagesSlice";
import {
  setUsername,
  setOpponent,
  setJoined,
  setRoom,
  setPositionState,
  setPlayerTurnState,
  connectToSocket,
  ticTacToeState,
  setRoomMembers,
} from "@/store/redux/slice/ticTacToeSlice";

const socketMiddleware: Middleware = (store) => {
  let socket: Socket;
  let ticTacToeSlice: ticTacToeState;
  let messagesSlice: messagesStoreState;

  return (next) => (action) => {
    ticTacToeSlice = store.getState().ticTacToeSlice;
    messagesSlice = store.getState().messagesSlice;
    const isConnectionEstablished = socket && ticTacToeSlice.joined;

    if (connectToSocket.match(action)) {
      console.log("inside connect to socket match");
      socket = io("http://localhost:3001");
      socket.on("receiveMessage", (data: any) => {
        if (messagesSlice.messages.length >= 20) {
          store.dispatch(
            setAllMessages([
              {
                message: "messages cleared",
                username: "admin",
              },
            ])
          );
        }
        if (ticTacToeSlice.username !== data.username) {
          store.dispatch(
            setReceiveMessage({
              username: data.username,
              message: data.message,
            })
          );
        }
      });
      socket.on("getRoomMembers", (data: any) => {
        if (ticTacToeSlice.username !== data.player) {
          setRoomMembers({ room: ticTacToeSlice.room, player: data.player });
        }
      });
    }

    if (setRoomMembers.match(action) && isConnectionEstablished) {
      //request room
    }

    if (setRoomMembers.match(action) && isConnectionEstablished) {
      if (
        ticTacToeSlice.roomMembers.players[0] !== ticTacToeSlice.username &&
        ticTacToeSlice.roomMembers.players[1] !== ticTacToeSlice.username
      ) {
        socket.emit("setRoomMembers", action.payload);
        socket.emit("joinRoom", action.payload.room);
      } else {
        console.log("cannot connect - new username");
      }
    }

    if (setMessage.match(action) && isConnectionEstablished) {
      if (
        ticTacToeSlice.roomMembers.players[0] !== ticTacToeSlice.username &&
        ticTacToeSlice.roomMembers.players[1] !== ticTacToeSlice.username
      ) {
        socket.emit("message", {
          room: ticTacToeSlice.room,
          username: action.payload.username,
          message: action.payload.message,
          justJoined: true,
        });
      } else {
        console.log("cannot connect - new username");
      }
    }

    next(action);
  };
};

export default socketMiddleware;
