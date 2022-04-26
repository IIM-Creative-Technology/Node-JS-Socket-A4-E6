const express = require('express');
const app = express();
const localhost = '127.0.0.1'
const port = 3000;

const user = require('./routes/user');

app.use('/user', user);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on : http://${localhost}:${port}`);
});
