const express = require("express");
const app = express();
const port = 4000;

app.length("/", (req, res) => {
  res.send("Jesus is LORD");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`);
});
