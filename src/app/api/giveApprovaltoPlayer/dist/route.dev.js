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
  var body, id, request;
  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("giveApprovaltoPlayer");
          _context.next = 4;
          return regeneratorRuntime.awrap(req.json());

        case 4:
          body = _context.sent;
          id = body.id;
          console.log(id, "id"); // Find the user by email

          _context.next = 9;
          return regeneratorRuntime.awrap(_prisma["default"].playerRequest.update({
            where: {
              id: id
            },
            data: {
              approved: true,
              rejected: false
            }
          }));

        case 9:
          request = _context.sent;
          console.log(request, "request"); // If user doesn't exist

          if (request) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "No player found"
          }, {
            status: 400
          }));

        case 13:
          return _context.abrupt("return", _server.NextResponse.json({
            message: "Player approved successfully",
            request: request
          }, {
            status: 200
          }));

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: _context.t0
          }, {
            status: 500
          }));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
}