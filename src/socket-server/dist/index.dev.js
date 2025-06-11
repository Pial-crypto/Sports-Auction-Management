"use strict";

var _require = require("socket.io"),
    Server = _require.Server;

var http = require("http");

var server = http.createServer();
var io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.137.1:3000"],
    methods: ["GET", "POST"]
  }
});
io.on("connection", function (socket) {
  console.log("🟢 Client connected:", socket.id); // Join a specific tournament room

  socket.on("join_tournament", function (tournamentId) {
    console.log("Socket ".concat(socket.id, " joined tournament ").concat(tournamentId));
    socket.join(tournamentId);
  }); // Broadcast message within a tournament room

  socket.on("send_message", function (msg) {
    io.to(msg.tournamentId).emit("receive_message", msg);
  }); // New bid event to specific tournament room

  socket.on("sendNewBid", function (bidData) {
    io.to(bidData.tournament.id).emit("receiveNewBid", bidData);
  }); // Bid end status for specific tournament

  socket.on("sendIsBidEnd", function (End) {
    io.to(End.tournament.id).emit("receiveIsBidEnd", End);
  });
  socket.on("disconnect", function () {
    console.log("🔴 Client disconnected:", socket.id);
  });
});
server.listen(3001, function () {
  console.log("✅ Socket.IO server running on http://localhost:3001");
});