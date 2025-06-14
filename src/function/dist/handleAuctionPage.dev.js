"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendBidInfo = exports.handleSelectPlayer = exports.sendMessage = exports.endBidding = void 0;

var _addNewAuction = require("./addNewAuction");

var _saveBidding = _interopRequireDefault(require("./saveBidding"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var endBidding = function endBidding(_ref) {
  var bidHistory = _ref.bidHistory,
      players = _ref.players,
      currentPlayerIndex = _ref.currentPlayerIndex,
      setPlayers = _ref.setPlayers,
      setSnackbar = _ref.setSnackbar,
      userRole = _ref.userRole,
      socket = _ref.socket;

  if (bidHistory.length > 0) {
    var winner = bidHistory[0];

    var updatedPlayers = _toConsumableArray(players);

    updatedPlayers[currentPlayerIndex] = _objectSpread({}, updatedPlayers[currentPlayerIndex], {
      status: 'sold',
      finalBid: winner.amount,
      soldTo: winner.team
    }); // Emit updated player queue

    socket && socket.emit('current_queue', updatedPlayers);
    setPlayers(updatedPlayers);
    console.log("🏆 I am the winner:", winner);

    if (userRole === 'organizer') {
      var currentPlayer = players[currentPlayerIndex];
      var auctionData = {
        playerId: currentPlayer.playerId || "N/A",
        tournamentId: currentPlayer.tournamentId,
        managerId: winner.managerId || "N/A",
        createdAt: new Date(),
        teamId: winner.id || "N/A",
        teamName: winner.team || "N/A",
        soldStatus: true,
        amount: winner.amount || 0
      };
      (0, _addNewAuction.addNewAuction)(auctionData);
    }

    setSnackbar({
      open: true,
      message: "\uD83C\uDF89 Bidding ended! ".concat(winner.team, " won with a bid of $").concat(winner.amount),
      severity: 'success'
    });
  } else if (currentPlayerIndex !== null && bidHistory && bidHistory.length === 0) {
    setSnackbar({
      open: true,
      message: '⚠️ Bidding ended with no bids. Player remained unsold.',
      severity: 'info'
    });
  }
};

exports.endBidding = endBidding;

var sendMessage = function sendMessage(message, tournament, user, socket) {
  socket && socket.emit("send_message", {
    message: message,
    tournament: tournament,
    senderId: user.id
  });
};

exports.sendMessage = sendMessage;

var handleSelectPlayer = function handleSelectPlayer(index, tournament, user, socket) {
  sendMessage(index, tournament, user, socket);
};

exports.handleSelectPlayer = handleSelectPlayer;

var sendBidInfo = function sendBidInfo(_ref2) {
  var bidAmount = _ref2.bidAmount,
      currentBid = _ref2.currentBid,
      myTeam = _ref2.myTeam,
      setSnackbar = _ref2.setSnackbar,
      players = _ref2.players,
      currentPlayerIndex = _ref2.currentPlayerIndex,
      tournament = _ref2.tournament,
      socket = _ref2.socket;
  console.log("Before sending bid info", myTeam);
  var bidValue = Number(bidAmount);

  if (bidValue <= currentBid) {
    setSnackbar({
      open: true,
      message: '⚠️ Bid amount must be higher than current bid',
      severity: 'error'
    });
    return;
  }

  console.log("This is my team", myTeam);
  var bidData = {
    amount: bidValue,
    team: myTeam.teamName,
    managerId: myTeam.managerId,
    teamId: myTeam.teamId,
    time: new Date().toLocaleTimeString()
  };
  console.log("Bid Info ➤", bidData);
  (0, _saveBidding["default"])({
    teamId: myTeam.id,
    teamName: myTeam.teamName,
    amount: bidValue,
    playerId: players[currentPlayerIndex].playerId,
    tournamentId: tournament.id
  }).then(function (response) {
    console.log("✅ Bidding saved successfully:", response);
  })["catch"](function (err) {
    console.error("❌ Failed to save bid:", err);
  });
  socket.emit("sendNewBid", {
    bidData: bidData,
    tournament: tournament
  });
};

exports.sendBidInfo = sendBidInfo;