// socket-server/index.js
const { Server } = require("socket.io");
const http = require("http");
const redisClient = require("../socket-server/redis"); // shared redis client

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.137.1:3000"],
    methods: ["GET", "POST"]
  }
});

let initialState = {}; // ✅ Fixed undefined error

// ✅ Reusable function to save auction state in Redis
async function saveAuctionState(tournamentId) {
  await redisClient.hSet(`auction:${tournamentId}`, {
    state: initialState[tournamentId] ? JSON.stringify(initialState[tournamentId]) : "{}"
  });
}

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("join_tournament", (tournamentId) => {
    console.log(`Socket ${socket.id} joined tournament ${tournamentId}`);
    socket.join(tournamentId);
  });

  socket.on("players", async (playersObj) => {

    console.log("Received players:", playersObj);

    const tournamentId = playersObj.tournament?.id;
    initialState[tournamentId] = {
      ...initialState[tournamentId] || {},
      players: playersObj.players
    };
    await saveAuctionState(tournamentId);
  });

  socket.on("send_message", async (msg) => {
    const tournamentId = msg.tournament?.id;
    io.to(tournamentId).emit("receive_message", msg);

    let auctionStartTime = Date.now();
    let auctionDuration = 60000;

    initialState[tournamentId] = {
      ...initialState[tournamentId] || {},
      currentPlayerIndex: msg.message,
      bidHistory: []
    };

    const timer = setInterval(async () => {
      let now = Date.now();
      let elapsed = now - auctionStartTime;
      let timeLeft = Math.max(0, Math.floor((auctionDuration - elapsed) / 1000));

      io.to(tournamentId).emit("receiveTimeLeft", timeLeft);

      initialState[tournamentId] = {
        ...initialState[tournamentId] || {},
        timeLeft: timeLeft
      };

      await saveAuctionState(tournamentId);

      if (timeLeft <= 0) {
        clearInterval(timer);
        io.to(tournamentId).emit("auctionEnded");
      }
    }, 1000);

    io.to(tournamentId).emit("auctionStarted", { startTime: auctionStartTime });
  });

  socket.on("sendNewBid", async (bidData) => {
    const tournamentId = bidData.tournament?.id;
    io.to(tournamentId).emit("receiveNewBid", bidData);

    const newBid = {
      team: bidData.bidData.team,
      amount: bidData.bidData.amount,
      time: new Date().toLocaleTimeString()
    };

    const existingState = initialState[tournamentId] || {};
    initialState[tournamentId] = {
      ...existingState,
      currentBid: newBid.amount,
      bidHistory: [...(existingState.bidHistory || []), newBid]
    };

    await saveAuctionState(tournamentId);
  });

  socket.on("sendIsBidEnd", async (End) => {
    const tournamentId = End.tournament?.id;
    const existingState = initialState[tournamentId] || {};
    const bidHistory = existingState.bidHistory || [];
    const winner = bidHistory[0];
    const updatedPlayers = existingState.players || [];

    updatedPlayers[existingState.currentPlayerIndex] = {
      ...updatedPlayers[existingState.currentPlayerIndex],
      status: 'sold',
      finalBid: winner?.amount || 0,
      soldTo: winner?.team || "N/A"
    };

    socket.emit('current_queue', updatedPlayers);

    initialState[tournamentId] = {
      ...existingState,
      players: updatedPlayers
    };

    await saveAuctionState(tournamentId);

    io.to(tournamentId).emit("receiveIsBidEnd", End);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("✅ Socket.IO server running on http://localhost:3001");
});
