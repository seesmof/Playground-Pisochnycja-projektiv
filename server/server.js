const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;

const userRouter = require("./userRouter");
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Jesus is LORD" });
});

app.use("/user", userRouter);

app.post("/users", (req, res) => {
  const { name, email, age } = req.body;
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
