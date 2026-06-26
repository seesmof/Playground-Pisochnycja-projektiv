const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 8080;

let todos = [];

app.get("/", (req, res) => {
    return res.status(200).json()
})

app.get("/", (req, res) => {
    return res.status(200).send("Jesus is LORD")
})

app.listen(port)