"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fetchAllTournaments = _interopRequireDefault(require("./fetchAllTournaments"));

var _storage = _interopRequireDefault(require("@/class/storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fetchCurrentTournament = function fetchCurrentTournament() {
  var data, user, id;
  return regeneratorRuntime.async(function fetchCurrentTournament$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _fetchAllTournaments["default"])());

        case 2:
          data = _context.sent;
          user = _storage["default"].get("user");
          id = user.id;
          console.log(id, "id");
          return _context.abrupt("return", data.find(function (item) {
            var status = item.status.toLowerCase();
            return (status === "active" || status === "upcoming" || status === "live") && item.createdBy === id;
          }));

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = fetchCurrentTournament;
exports["default"] = _default;