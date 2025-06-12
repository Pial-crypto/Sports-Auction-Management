"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _prisma = _interopRequireDefault(require("@/lib/prisma"));

var _server = require("next/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function POST(req) {
  var body, teamId, playerId, teamName, amount, tournamentId, newBidding;
  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(req.json());

        case 3:
          body = _context.sent;
          teamId = body.teamId, playerId = body.playerId, teamName = body.teamName, amount = body.amount, tournamentId = body.tournamentId;
          console.log("Received data:", body); // Validate required fields

          if (!(!teamId || !playerId || !teamName || !amount || !tournamentId)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "Missing required fields"
          }, {
            status: 400
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(_prisma["default"].bidding.create({
            data: {
              teamId: teamId,
              playerId: playerId,
              teamName: teamName,
              amount: amount,
              tournamentId: tournamentId
            }
          }));

        case 10:
          newBidding = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            message: "Bidding added successfully",
            bidding: newBidding
          }, {
            status: 201
          }));

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error("Error adding bidding:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Something went wrong"
          }, {
            status: 500
          }));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
}