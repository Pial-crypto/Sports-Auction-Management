"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET = GET;

var _prisma = _interopRequireDefault(require("@/lib/prisma"));

var _server = require("next/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function GET(_req) {
  var allUsers;
  return regeneratorRuntime.async(function GET$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_prisma["default"].user.findMany());

        case 3:
          allUsers = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            message: "Users fetched successfully",
            users: allUsers
          }, {
            status: 200
          }));

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("Error fetching users:", _context.t0);
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
  }, null, null, [[0, 7]]);
}