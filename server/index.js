// server/index.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow all clients
  },
});

// health check route (to test deployment)
app.get("/", (req, res) => {
  res.send("🎲 Dice server is running!");
});

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  // handle dice roll
  socket.on("rollDice", () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    socket.emit("diceResult", roll); // send result ONLY to that user
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Railway will give PORT automatically
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
