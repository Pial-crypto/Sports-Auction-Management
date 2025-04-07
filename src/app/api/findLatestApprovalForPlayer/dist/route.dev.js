"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _server = require("next/server");

var _prisma = _interopRequireDefault(require("@/lib/prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ✅ Correct Import
function POST(req) {
  var data, playerId, latestApproval;
  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(req.json());

        case 3:
          data = _context.sent;
          playerId = data.playerId;
          console.log("playerId", playerId);
          _context.next = 8;
          return regeneratorRuntime.awrap(_prisma["default"].approval.findFirst({
            where: {
              playerId: playerId
            },
            orderBy: {
              createdAt: 'desc'
            }
          }));

        case 8:
          latestApproval = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            message: latestApproval ? 'Latest approval fetched successfully' : 'No latest approval found',
            latestApproval: latestApproval
          }, {
            status: latestApproval ? 200 : 400
          }));

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error('Failed to fetch latest approval:', _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            message: 'Failed to fetch latest approval',
            latestApproval: []
          }, {
            status: 500
          }));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}