const express = require('express');
const { Client } = require('pg');
const { PrismaClient } = require('@prisma/client');
const user = require('./routes/user');

const app = express();
const localhost = '127.0.0.1';
const port = 3000;

app.use('/user', user);

const prisma = new PrismaClient()
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

async function main() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main().catch((e) => {
    throw e
});

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on : http://${localhost}:${port}`);
});
