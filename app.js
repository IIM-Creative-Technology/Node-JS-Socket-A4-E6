const express = require("express");
const user = require("./app/routes/user");

const app = express();
const localhost = "127.0.0.1";
const port = 3000;

app.use("/user", user);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "./template/html/index.html");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on : http://${localhost}:${port}`);
});
