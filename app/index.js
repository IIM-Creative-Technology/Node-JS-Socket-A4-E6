const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer);
const user = require("./routes/user");
const port = process.env.PORT || 3000


io.on("connection", (socket) => {
  console.log(`Connecté au client ${socket.id}`);
});

app.use("/user", user);

io.on("connection", (socket) => {
  socket.on("hello", (arg) => {
    console.log(arg); // world
  });
});



app.get("/socket", (req, res) => {
  res.sendFile(__dirname + "/socketio/index.html");
});


httpServer.listen(port);

