"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET = GET;

var _prisma = _interopRequireDefault(require("@/lib/prisma"));

var _server = require("next/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function GET(req) {
  var _ref, searchParams, tournamentId, statusRecord;

  return regeneratorRuntime.async(function GET$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("Auction status GET request is being processed"); // Extract query params from URL

          _ref = new URL(req.url), searchParams = _ref.searchParams;
          tournamentId = searchParams.get("tournamentId"); // Validate input

          if (tournamentId) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "tournamentId is required"
          }, {
            status: 400
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(_prisma["default"].tournamentAuctionStatus.findUnique({
            where: {
              tournamentId: tournamentId
            }
          }));

        case 8:
          statusRecord = _context.sent;

          if (statusRecord) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "No status found for this tournament"
          }, {
            status: 404
          }));

        case 11:
          return _context.abrupt("return", _server.NextResponse.json({
            success: true,
            auctionStatus: statusRecord.auctionStatus
          }, {
            status: 200
          }));

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error("Error in auction status GET:", _context.t0);
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