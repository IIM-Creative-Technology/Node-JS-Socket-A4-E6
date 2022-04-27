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
    client.query("SELECT * FROM test", [], function (err, result) {
        if (err)
            throw err;

        console.log("Successfully connected");
        client.end(function (err) {
            if (err)
                throw err;
        });
    });
});

const user = require("./routes/user");

const app = express();
const localhost = "127.0.0.1";
const port = 3000;


app.use("/user", user);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "./assets/template/html/index.html");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on : http://${localhost}:${port}`);
});
