"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET = GET;

var _server = require("next/server");

var _prisma = _interopRequireDefault(require("@/lib/prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ✅ Correct Import
function GET() {
  var announcements;
  return regeneratorRuntime.async(function GET$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_prisma["default"].announcement.findMany({
            orderBy: {
              timestamp: 'desc'
            }
          }));

        case 3:
          announcements = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            message: 'Announcements fetched successfully',
            announcements: announcements
          }, {
            status: 200
          }));

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error('Failed to fetch announcements:', _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            message: 'Failed to fetch announcements',
            announcements: []
          }, {
            status: 500
          }));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}