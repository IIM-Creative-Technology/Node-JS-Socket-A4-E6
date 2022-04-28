const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer);
const user = require("./routes/user");
const uploadRoutes = require("./routes/upload");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path")


io.on("connection", (socket) => {
  console.log(`Connecté au client ${socket.id}`);
});

app.use("/user", user);
app.use("/upload", uploadRoutes);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/upload/index.html");
});
io.on("connection", (socket) => {
  socket.on("hello", (arg) => {
    console.log(arg); // world
  });
});

app.get("/socket", (req, res) => {
  res.sendFile(__dirname + "/socketio/index.html");
});

httpServer.listen(3000);

