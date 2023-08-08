const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Mock data
const data = {
  message: "Hello from the backend!",
};

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("getData", () => {
    socket.emit("data", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
