import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { db } from "./firebase/firebase.js";

const app = express();
const port = 3001;
const httpServer = createServer(app);

let n = 0;

if (db) {
  console.log("db connected:");
  // set(ref(db, "users/" + (data.first + data.last).toLowerCase()), data);
}

// app.get("/api/socket", (req, res) => {
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// app.get("/test", (req, res) => {
//   res.send("Hello, World");
// });

io.on("connection", (socket) => {
  console.log("connection is live: " + n++);
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
    // }
  });

  socket.on("message", (data) => {
    // Broadcast the message to everyone in the room except the sender
    io.in(data.room).emit("receiveMessage", data);
  });

  socket.on("leaveRoom", (room) => {
    // Leave a room
    socket.leave(room);
    console.log(`User left room: ${room}`);
  });

  //Request room
  socket.on("getRoomMembers", (data) => {
    io.in(data.room).emit("setRoomMembers", data.players);
  });

  //Request room
  socket.on("setRoomMembers", (data) => {
    // rooms have to be stored somewhere
    // otherwise there will be a loop of adding yourself to a room and emitting the room to be updated
    io.in(data.room).emit("setRoomMembers", data.players);
  });

  // socket.on("disconnect", (reason) => {
  //   if (reason === "io server disconnect") {
  //     // the disconnection was initiated by the server, you need to reconnect manually
  //     socket.connect();
  //   }
  //   // else the socket will automatically try to reconnect
  // });
});
// });

httpServer.listen(port, () => {
  console.log(`Socket app listening on port ${port}`);
});
