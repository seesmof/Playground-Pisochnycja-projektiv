const express = require("express");
const cors = require("cors");

port = 8080;
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ messages: "Jesus is KING" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}: http://localhost:${port}`);
});
