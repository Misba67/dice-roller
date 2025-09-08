const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("A player connected:", socket.id);

  // When a player rolls dice
  socket.on("rollDice", () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    socket.emit("diceResult", roll); // send only to that player
  });

  socket.on("disconnect", () => {
    console.log("Player disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("🎲 Server running on http://localhost:4000");
});
