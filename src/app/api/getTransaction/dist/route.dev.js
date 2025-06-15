"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET = GET;

var _prisma = _interopRequireDefault(require("@/lib/prisma"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _server = require("next/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function GET(req) {
  var transactionList;
  return regeneratorRuntime.async(function GET$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("Get transaction request is going on"); // Find the user by email

          _context.next = 4;
          return regeneratorRuntime.awrap(_prisma["default"].transaction.findMany({
            orderBy: {
              date: "desc"
            }
          }));

        case 4:
          transactionList = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json(transactionList, {
            status: 200
          }));

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Something went wrong"
          }, {
            status: 500
          }));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}