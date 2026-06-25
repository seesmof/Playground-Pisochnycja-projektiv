const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    console.log("Jesus is LORD")
    res.status(500).json({ name: "hey", "message": "error", })
})

app.listen(port)