import { Server, ServerOptions } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as NetServer } from "http";

let io;

export default function SocketHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!res?.socket?.server.io) {
    const httpServer: NetServer = res?.socket?.server as any;
    const io = new Server(httpServer, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      socket.on("joinRoom", (room) => {
        // if (roomName && roomName !== "") {
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
    });

    console.log("Setting up socket");
    res.socket.server.io = io;
  }

  res.end();
}
