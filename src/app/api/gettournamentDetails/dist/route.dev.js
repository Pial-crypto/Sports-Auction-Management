"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET = GET;

var _prisma = _interopRequireDefault(require("@/lib/prisma"));

var _server = require("next/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function GET(req) {
  var currentDate, tournaments;
  return regeneratorRuntime.async(function GET$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("Tournament info request is going on"); // বর্তমান তারিখ

          currentDate = new Date();
          _context.next = 5;
          return regeneratorRuntime.awrap(_prisma["default"].tournament.findMany({
            orderBy: {
              createdAt: 'desc'
            }
          }));

        case 5:
          tournaments = _context.sent;
          console.log(tournaments, "tournament"); // if (!tournaments || tournaments.length == 0) {
          //   return NextResponse.json(
          //     { error: "No tournament exists" },
          //     { status: 400 }
          //   );
          // }
          // // ডাটাবেস আপডেট করার জন্য
          // await prisma.tournament.updateMany({
          //   where: {
          //     tournamentDate: {
          //       gt: currentDate, // যদি tournamentDate বর্তমান তারিখের থেকে বড় হয়
          //     },
          //     status: {
          //       not: "COMPLETED", // যদি status "COMPLETED" না হয়
          //     },
          //   },
          //   data: {
          //     status: "LIVE", // status আপডেট হবে
          //   },
          // });
          // আপডেটের পর টুর্নামেন্ট তালিকা আবার রিটার্ন করা
          // const updatedTournaments = await prisma.tournament.findMany(); // পুরো টেবিলের ডেটা নেবো

          return _context.abrupt("return", _server.NextResponse.json(tournaments, {
            status: 200
          }));

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Something went wrong"
          }, {
            status: 500
          }));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}