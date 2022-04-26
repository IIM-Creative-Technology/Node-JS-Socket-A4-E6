const express = require('express');
const { Client } = require('pg');
const user = require('./routes/user');

const app = express();
const localhost = '127.0.0.1';
const port = 3000;

app.use('/user', user);

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

client.query('SELECT NOW ()', (err, res) => {
    console.log(err, res);
    client.end();
});

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on : http://${localhost}:${port}`);
});
