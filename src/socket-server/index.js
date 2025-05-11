const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();
const initial_state = {
  msg: null,
  bidData: null,
  End: false,
  timeLeft: null,
  bidHistory: [],
  currentQueue:[],

};

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Next.js runs here
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);
  console.log('initial state', initial_state);
  socket.emit("initial_state", initial_state);

  socket.on("send_message", (msg) => {
    console.log("Here is the message", msg);
    initial_state.msg = msg;
    initial_state.bidHistory = []; // Reset bid history for new player
    console.log("Before emitting after nulling")
    io.emit("receive_message", msg);
  });

  socket.on("sendNewBid", (bidData) => {
    console.log("Received bid:", bidData);
    initial_state.bidData = bidData;
    // Add new bid to history
    initial_state.bidHistory = [{
      team: bidData.team,
      amount: bidData.amount,
      time: bidData.time
    }, ...initial_state.bidHistory];
    console.log("Before emitting")
    io.emit("receiveNewBid", bidData);
  });

  socket.on("sendIsBidEnd", (End) => {
    console.log("Here is the ending", End);
    initial_state.End = End;
    console.log("Before emitting")
    io.emit("receiveIsBidEnd", End);
    // Reset after emitting
  setTimeout(() => {
    initial_state.End = false;
  }, 500); // একটু delay দিয়ে reset করলে emit এর জন্য সময় পাবে

      // 🧹 Purge the old player & bidding state
 
  });

  socket.on('time_left', (timeLeft) => {

    initial_state.timeLeft = timeLeft;
  });

  socket.on('bid_history', (bidHistory) => {
    console.log("Before emitting")
    initial_state.bidHistory = bidHistory;
  });
  socket.on('current_queue',(currentQueue)=>{
    console.log("Before emitting")
    initial_state.currentQueue=currentQueue
  })

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });

 
});

server.listen(3001, () => {
  console.log("✅ Socket.IO server running on http://localhost:3001");
});
