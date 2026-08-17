const express = require("express");
const app = express();
const PORT = 8080;

const userRouter = require("./userRouter");

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Jesus is LORD" });
});

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
