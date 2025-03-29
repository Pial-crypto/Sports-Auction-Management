"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET = GET;

var _prisma = _interopRequireDefault(require("@/lib/prisma"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _server = require("next/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function GET(_req) {
  var allPlayerReq;
  return regeneratorRuntime.async(function GET$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_prisma["default"].playerRequest.findMany());

        case 3:
          allPlayerReq = _context.sent;

          if (allPlayerReq) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "No req found"
          }, {
            status: 400
          }));

        case 6:
          return _context.abrupt("return", _server.NextResponse.json({
            message: "All req fetched successfully",
            allPlayerReq: allPlayerReq
          }, {
            status: 200
          }));

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Something went wrong"
          }, {
            status: 500
          }));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}