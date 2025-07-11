"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET = GET;

var _prisma = _interopRequireDefault(require("@/lib/prisma"));

var _server = require("next/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function GET(_req) {
  var allbaseprice;
  return regeneratorRuntime.async(function GET$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_prisma["default"].player.findMany());

        case 3:
          allbaseprice = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            message: "base price fetched successfully",
            allbaseprice: allbaseprice
          }, {
            status: 200
          }));

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Something went wrong"
          }, {
            status: 500
          }));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}