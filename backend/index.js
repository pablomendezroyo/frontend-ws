const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Mock data
const welcomeMessage = {
  message: "Hello from the backend!",
};

const todoList = [
  {
    id: 1,
    title: "Learn React",
    completed: false,
  },
  {
    id: 2,
    title: "Learn WebSockets",
    completed: false,
  },
  {
    id: 3,
    title: "Learn Node.js",
    completed: false,
  },
];

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log("received: %s", message);

    // When backend receives 'getData' message, send back the mock data.
    if (message === "getData") {
      ws.send(JSON.stringify(welcomeMessage));
    }

    // When backend receives 'getTodoList' message, send back the mock data.
    if (message === "getTodoList") {
      ws.send(JSON.stringify(todoList));
    }
  });

  // Send a welcome message when a connection is established.
  ws.send("Connected to backend");
});

app.use(cors()); // To allow cross-origin requests

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = 6000;
server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
