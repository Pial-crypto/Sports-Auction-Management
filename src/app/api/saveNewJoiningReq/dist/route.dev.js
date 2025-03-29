"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _server = require("next/server");

var _prisma = _interopRequireDefault(require("@/lib/prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Ensure correct import
function POST(request) {
  var reqInfo, newReqInfo;
  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(request.json());

        case 3:
          reqInfo = _context.sent;
          // Parse the incoming request
          console.log(reqInfo, "newReqInfo");
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(_prisma["default"].playerRequest.create({
            data: {
              age: reqInfo.age,
              name: reqInfo.name,
              role: reqInfo.role,
              experience: reqInfo.experience,
              previousTeam: reqInfo.previousTeam,
              achievements: reqInfo.achievements,
              playerId: reqInfo.playerId,
              tournamentId: reqInfo.tournamentId,
              approved: false
            }
          }));

        case 8:
          newReqInfo = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            message: " Reqinfo created successfully",
            reqInfo: newReqInfo
          }, {
            status: 201
          }));

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](5);
          return _context.abrupt("return", _server.NextResponse.json({
            bal: "bal"
          }, {
            status: 500
          }));

        case 15:
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t1 = _context["catch"](0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: _context.t1
          }, {
            status: 500
          }));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17], [5, 12]]);
}