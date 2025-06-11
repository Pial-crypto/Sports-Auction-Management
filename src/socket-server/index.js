const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.137.1:3000"],
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  // Join a specific tournament room
  socket.on("join_tournament", (tournamentId) => {
    console.log(`Socket ${socket.id} joined tournament ${tournamentId}`);
    socket.join(tournamentId);
  });

  // Broadcast message within a tournament room
  socket.on("send_message", (msg) => {
    console.log(`Message from `,msg);
    io.to(msg.tournament?.id).emit("receive_message", msg);
    let auctionStartTime = Date.now();
  let auctionDuration = 60000; // 5 minutes

  const timer = setInterval(() => {
    let now = Date.now();
    let elapsed = now - auctionStartTime;
    let timeLeft = Math.max(0, Math.floor((auctionDuration - elapsed) / 1000));

    io.to(msg.tournament?.id).emit("receiveTimeLeft", timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timer);
      io.emit("auctionEnded");
    }
  }, 1000);

  io.emit("auctionStarted", { startTime: auctionStartTime });
  });

  // New bid event to specific tournament room
  socket.on("sendNewBid", (bidData) => {
    io.to(bidData.tournament.id).emit("receiveNewBid", bidData);
  });

  // Bid end status for specific tournament
  socket.on("sendIsBidEnd", (End) => {
    io.to(End.tournament.id).emit("receiveIsBidEnd", End);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });

  
});

server.listen(3001, () => {
  console.log("✅ Socket.IO server running on http://localhost:3001");
});
