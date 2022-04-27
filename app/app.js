const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer);
const user = require("./routes/user");

io.on("connection", (socket) => {
  console.log(`Connecté au client ${socket.id}`)
  socket.on("joinRoom",  () => {
    socket.join("room1");
    io.sockets.in("room1").emit('message','Someone joined the room');
  })
});

app.use("/user", user);

app.get("/socket", (req, res) => {
  res.sendFile(__dirname + "/socketio/index.html");
});

httpServer.listen(3000);


