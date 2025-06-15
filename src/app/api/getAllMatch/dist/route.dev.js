"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET = GET;

var _prisma = _interopRequireDefault(require("@/lib/prisma"));

var _server = require("next/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function GET(_req) {
  var allMatch;
  return regeneratorRuntime.async(function GET$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("Received request to fetch all matches"); // Fetch all matches

          _context.next = 4;
          return regeneratorRuntime.awrap(_prisma["default"].match.findMany({
            orderBy: {
              createdAt: "desc" // Order by creation date, most recent first

            }
          }));

        case 4:
          allMatch = _context.sent;
          console.log('allmatch', allMatch); // If no matches found
          // if (!allMatch || allMatch.length === 0) {
          //   return NextResponse.json(
          //     { error: "No matches found" },
          //     { status: 404 }
          //   );
          // }
          // Return a success response

          return _context.abrupt("return", _server.NextResponse.json({
            message: "All matches fetched successfully",
            data: allMatch
          }, {
            status: 200
          }));

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Something went wrong"
          }, {
            status: 500
          }));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}