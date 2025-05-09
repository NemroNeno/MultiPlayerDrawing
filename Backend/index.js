const express = require("express");
const app = express();
const cors = require("cors");

const { Server } = require("socket.io");

const server = app.listen(5000, () => {
  console.log("App started at port 5000");
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//Route
let roomGlobal, curr;
io.on("connection", (socket) => {
  socket.on("userJoined", (data) => {
    const { name, userId, roomId, host, presenter } = data;

    socket.join(data?.roomId);
    socket.emit("userIsJoined", data.roomId, { success: true });
    console.log("userIsJoined in room: ", data.roomId);
  });
  let room, name;
  socket.on("newData", (data) => {
    room = data.roomId;
    name = data.name;
    io.to(room).emit("test", {
      name: data.name,
      pic: data.pic,
    });
    //console.log("Emitted newDataReceived event to room:", data.roomId);
  });

  //U3IxhA1QeZAC_r5wAABd
});
