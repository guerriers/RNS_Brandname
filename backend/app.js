require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3101;

app.get('/', (req, res) => {
    res.send('Hello, RNS Brandname!');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});