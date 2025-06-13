"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeLeftHook = void 0;

var _handleAuctionPage = require("@/function/handleAuctionPage");

var _react = require("react");

var timeLeftHook = function timeLeftHook(timeLeft, isBiddingActive, bidHistory, players, currentPlayerIndex, setPlayers, setSnackbar, userRole, socket) {
  // Timer effect
  (0, _react.useEffect)(function () {
    if (timeLeft > 0) {///nothing to do here
    } else if (timeLeft <= 0) {
      //  console.log("Before ending the bid")
      (0, _handleAuctionPage.endBidding)({
        bidHistory: bidHistory,
        players: players,
        currentPlayerIndex: currentPlayerIndex,
        setPlayers: setPlayers,
        setSnackbar: setSnackbar,
        userRole: userRole,
        socket: socket
      });
    }
  }, [timeLeft, isBiddingActive]);
};

exports.timeLeftHook = timeLeftHook;