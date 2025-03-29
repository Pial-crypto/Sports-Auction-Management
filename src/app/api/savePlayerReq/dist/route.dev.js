"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _server = require("next/server");

var _prisma = _interopRequireDefault(require("@/lib/prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
            data: _objectSpread({}, reqInfo)
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
          return _context.abrupt("return", _server.NextResponse.json(_context.t0, {
            status: 500
          }));

        case 15:
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t1 = _context["catch"](0);
          return _context.abrupt("return", _server.NextResponse.json(_context.t1, {
            status: 500
          }));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17], [5, 12]]);
}