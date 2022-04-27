const express = require("express");
const index = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(index);
const io = new Server(httpServer);
const user = require("./routes/user");

io.on("connection", (socket) => {
  console.log(`Connecté au client ${socket.id}`)
  socket.on("joinRoom",  () => {
    socket.join("room1");
    io.sockets.in("room1").emit('message','Someone joined the room'); //Todo recover message client
    // io.sockets.adapter.rooms Lister les rooms
  })
  socket.on('room1 chat message', function (values) {
    io.to("room1").emit('room callback', {...values, room: "room1"});
  });
});

index.use("/user", user);

index.get("/socket", (req, res) => {
  res.sendFile(__dirname + "/socketio/index.html");
});

httpServer.listen(3000);


