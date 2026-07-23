const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Jesus is LORD" });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}.`);
});
