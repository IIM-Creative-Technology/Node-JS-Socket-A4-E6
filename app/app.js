const express = require("express");
require('dotenv').config()
const pg = require("pg");
const fs = require('fs');
const postgresqlUri = process.env.DATABASE_URL
const conn = new URL(postgresqlUri);
conn.search = conn.query = "";
const config = {
  connectionString: conn.href,
  ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync('./app/ca.pem').toString(),
  },
};

const client = new pg.Client(config);
client.connect(function (err) {
    if (err)
        throw err;
    client.query("SELECT * FROM users", [], function (err, result) {
        if (err)
            throw err;

        console.log("Successfully connected");
        client.end(function (err) {
            if (err)
                throw err;
        });
    });
});

const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer);
const user = require("./routes/user");

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


httpServer.listen(3000);

