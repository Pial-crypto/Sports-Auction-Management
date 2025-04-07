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
          console.log(data, "Inside addApprovaltoTable");
          _context.next = 7;
          return regeneratorRuntime.awrap(_prisma["default"].approval.create({
            data: {
              playerId: data.playerId,
              tournamentId: data.tournamentId,
              createdAt: data.createdAt
            }
          }));

        case 7:
          return _context.abrupt("return", _server.NextResponse.json({
            success: true
          }));

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error('Error approving request:', _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: 'Failed to approve request'
          }, {
            status: 500
          }));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}