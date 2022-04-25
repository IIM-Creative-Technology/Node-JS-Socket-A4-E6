const express = require('express');
const app = express();
const port = 3000;

const user = require('./routes/user');

app.use('/user', user);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})