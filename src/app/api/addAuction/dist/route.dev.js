"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _server = require("next/server");

var _prisma = _interopRequireDefault(require("@/lib/prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function POST(request) {
  var data;
  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(request.json());

        case 3:
          data = _context.sent;
          console.log("Received data:", data);
          console.log(data, "Here is the auction data");
          _context.next = 8;
          return regeneratorRuntime.awrap(_prisma["default"].auction.create({
            data: {
              playerId: data.playerId || "N/A",
              tournamentId: data.tournamentId,
              managerId: data.managerId || "N/A",
              createdAt: data.createdAt || new Date(),
              teamId: data.teamId || "N/A",
              teamName: data.teamName || "N/A",
              soldStatus: data.soldStatus || false,
              amount: parseInt(data.amount) || 0
            }
          }));

        case 8:
          return _context.abrupt("return", _server.NextResponse.json({
            success: true
          }));

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error('Error approving request:', _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: 'Failed to approve request'
          }, {
            status: 500
          }));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}