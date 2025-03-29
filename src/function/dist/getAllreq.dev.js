"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.fetchAllReq = void 0;

var fetchAllReq = function fetchAllReq() {
  var response, data;
  return regeneratorRuntime.async(function fetchAllReq$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('/api/getAllReq', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;
          console.log(data, "data from fetch all req");

          if (!response.ok) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", data);

        case 12:
          console.error('Error fetching all req:', data.error || 'Failed to fetch req');
          alert('Error fetching req:', data.error || 'Failed to fetch req');

        case 14:
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          alert('Error fetching req:', _context.t0);
          console.error('Error fetching req:', _context.t0);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

exports.fetchAllReq = fetchAllReq;
var _default = fetchAllReq;
exports["default"] = _default;