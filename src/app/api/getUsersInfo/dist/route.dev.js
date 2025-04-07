"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _prisma = _interopRequireDefault(require("@/lib/prisma"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _server = require("next/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function POST(req) {
  var body, email, user;
  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("Login request is going on");
          _context.next = 4;
          return regeneratorRuntime.awrap(req.json());

        case 4:
          body = _context.sent;
          email = body.email; // Find the user by email

          _context.next = 8;
          return regeneratorRuntime.awrap(_prisma["default"].user.findUnique({
            where: {
              email: email
            }
          }));

        case 8:
          user = _context.sent;
          console.log(user, "user"); // If user doesn't exist

          if (user) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "Invalid credentials"
          }, {
            status: 400
          }));

        case 12:
          return _context.abrupt("return", _server.NextResponse.json(user, {
            status: 200
          }));

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Something went wrong"
          }, {
            status: 500
          }));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
}