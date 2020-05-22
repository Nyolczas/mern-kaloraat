const express = require("express");
const app = express();
const fileWatch = require('./fileWatch');

fileWatch

app.get("/", (req, res) => {
    res.send("hey pina");
});

app.listen(3000);