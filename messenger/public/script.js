const { text, application } = require("express");

const socket = io();

const loginScreen = document.getElementById("login-screen");
const chatScreen = document.getElementById("chat-screen");
const usernameInput = document.getElementById("username-input");
const joinBtn = document.getElementById("join-btn");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const messagesContainer = document.getElementById("messages-container");

let currentUsername = "";

joinBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (username) {
    currentUsername = username;
    socket.emit("user-joined", username);
    loginScreen.classList.add("hidden");
    chatScreen.classList.remove("hidden");
  }
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  appendMessage({
    text: message,
    time: time,
    type: "sent",
  });

  socket.emit("send-message", { message });
  messageInput.value = "";
});

socket.on("receive-message", (data) => {
  appendMessage({
    username: data.username,
    text: data.message,
    time: data.time,
    type: "received",
  });
});

socket.on("user-status", (data) => {
  const statusDiv = document.createElement("div");
  statusDiv.classList.add("system-message");
  statusDiv.textContent = `${data.username} ${data.status === "joined" ? "joined" : "left"} the chat`;
  messagesContainer.appendChild(statusDiv);
  scrollToBottom();
});

function appendMessage({ username, text, time, type }) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", type);

  if (type === "received" && username) {
    const userDiv = document.createElement("div");
    userDiv.classList.add("username");
    userDiv.textContent = username;
    msgDiv.appendChild(userDiv);
  }

  const textDiv = document.createElement("div");
  textDiv.textContent = text;
  msgDiv.appendChild(textDiv);

  const timeDiv = document.createElement("div");
  timeDiv.classList.add("time");
  timeDiv.textContent = time;
  msgDiv.appendChild(timeDiv);

  messagesContainer.appendChild(msgDiv);
  scrollToBottom();
}

function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
