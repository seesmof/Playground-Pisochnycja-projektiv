const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Jesus is LORD"));
app.listen(8080);
