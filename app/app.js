const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer);
const user = require("./routes/user");

io.on("connection", (socket) => {
  console.log(`Connecté au client ${socket.id}`)
  socket.on("joinRoom",  (roomName) => {
    socket.join(roomName);
    io.sockets.in(roomName).emit('message','Someone joined the room');
  })
});

app.use("/user", user);




app.get("/socket", (req, res) => {
  res.sendFile(__dirname + "/socketio/index.html");
});


httpServer.listen(3000);


