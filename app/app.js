const express = require("express");
const { Client } = require("pg");
const user = require("./routes/user");
const cookieParser = require("cookie-parser");

const app = express();
const localhost = "127.0.0.1";
const port = 3000;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

app.use("/user", user);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "./assets/template/html/index.html");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on : http://${localhost}:${port}`);
});
