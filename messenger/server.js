const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

const users = {};

io.on("connection", (socket) => {
  socket.on("user-joined", (username) => {
    users[socket.id] = username;
    socket.broadcast.emit("user-status", { username, status: "joined" });
  });

  socket.on("send-message", (data) => {
    socket.broadcast.emit("recieve-message", {
      username: users[socket.id] || "Anonymous",
      message: data.message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  });

  socket.on("disconnect", () => {
    if (users[socket.id]) {
      socket.broadcast.emit("user-status", {
        username: users[socket.id],
        status: "left",
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
