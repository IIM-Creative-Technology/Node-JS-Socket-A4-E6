const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const user = require("./routes/user");
const uploadRoutes = require("./routes/upload");

io.on("connection", (socket) => {
  socket.on("joinRoom",  () => {
    socket.join("room1");
    io.sockets.in("room1").emit('welcome', {msg: `${socket.id} joined the room`, socketId: socket.id})
    // io.sockets.adapter.rooms Lister les rooms
  })
  socket.on('room1 chat message', function (values) {
    io.to("room1").emit('room callback', {...values, room: "room1"});
  });
});

app.use("/user", user);
app.use("/upload", uploadRoutes);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/upload/index.html");
});

app.get("/socket", (req, res) => {
  res.sendFile(__dirname + "/socketio/index.html");
});

httpServer.listen(process.env.EXPRESS_PORT || 3000);