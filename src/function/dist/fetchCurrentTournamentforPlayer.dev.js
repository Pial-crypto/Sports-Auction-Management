"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fetchAllTournaments = _interopRequireDefault(require("./fetchAllTournaments"));

var _getAllreq = require("./getAllreq");

var _storage = _interopRequireDefault(require("@/class/storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fetchCurrentTournamentforPlayer = function fetchCurrentTournamentforPlayer() {
  var data, id, myRequests, myCurrentTournamentId;
  return regeneratorRuntime.async(function fetchCurrentTournamentforPlayer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getAllreq.fetchAllReq)());

        case 2:
          data = _context.sent;
          id = _storage["default"].get("user").id;
          myRequests = data.find(function (item) {
            return item.playerId === id;
          });
          myCurrentTournamentId = myRequests.map(function (req) {
            (0, _fetchAllTournaments["default"])().then(function (data) {
              var tournament = data.findUnique(function (item) {
                return item.id === req.tournamentId && (item.status === "active" || item.status === "upcoming" || item.status === "live");
              });
              return tournament;
            });
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = fetchCurrentTournamentforPlayer;
exports["default"] = _default;