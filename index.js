const { Client } = require('pg');
const express = require('express')
const app = express()
const port = 3000
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

client.query('SELECT NOW ()', (err, res) => {
    console.log(err, res)
    client.end()
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})