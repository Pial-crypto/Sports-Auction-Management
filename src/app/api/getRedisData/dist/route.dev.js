"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET = GET;

var _server = require("next/server");

var _redis = _interopRequireDefault(require("@/socket-server/redis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// app/api/auction/state/[tournamentId]/route.js
// 🛑 নিশ্চিত হও এই ফাইল আছে
function GET(req) {
  var tournamentId, data, parsedState;
  return regeneratorRuntime.async(function GET$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          tournamentId = req.tournamentId.tournamentId;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_redis["default"].hGet("auction:".concat(tournamentId), "state"));

        case 4:
          data = _context.sent;
          parsedState = data ? JSON.parse(data) : {};
          return _context.abrupt("return", _server.NextResponse.json(parsedState, {
            status: 200
          }));

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          console.error("❌ Error fetching auction state:", _context.t0.message);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Failed to fetch auction state"
          }, {
            status: 500
          }));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
}