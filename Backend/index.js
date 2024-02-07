const express = require("express");
const app = express();
const cors = require("cors");

const { Server } = require("socket.io");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

const server = app.listen(5000, () => {
  console.log("App started at port 5000");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
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
  let room,name;
  socket.on("newData", (data) => {
    console.log(data.name);
    room=data.roomId
    name=data.name
    socket.broadcast.emit("test", {
      name: data.name,
      pic:data.pic
    });
    //console.log("Emitted newDataReceived event to room:", data.roomId);
  });

 
   

});
