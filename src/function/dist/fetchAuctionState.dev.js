"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAuctionState = fetchAuctionState;

function fetchAuctionState(tournamentId) {
  var response, data;
  return regeneratorRuntime.async(function fetchAuctionState$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/getRedisData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              tournamentId: tournamentId
            })
          }));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;
          return _context.abrupt("return", data);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error("Error fetching auction state:", _context.t0);
          return _context.abrupt("return", null);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}