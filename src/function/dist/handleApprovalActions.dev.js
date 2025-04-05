"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleRejectiontoPlayerReq = exports.handleApprovePlayer = void 0;

var handleApprovePlayer = function handleApprovePlayer(request) {
  var response;
  return regeneratorRuntime.async(function handleApprovePlayer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // API call to approve request
          console.log(request, "request");
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch('/api/giveApprovaltoPlayer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: request.id
            })
          }));

        case 4:
          response = _context.sent;

          if (!response.ok) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", true);

        case 9:
          return _context.abrupt("return", false);

        case 10:
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", false);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.handleApprovePlayer = handleApprovePlayer;

var handleRejectiontoPlayerReq = function handleRejectiontoPlayerReq(request) {
  var response;
  return regeneratorRuntime.async(function handleRejectiontoPlayerReq$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch('/api/rejectiontoPlayerReq', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: request.id
            })
          }));

        case 3:
          response = _context2.sent;

          if (!response.ok) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", true);

        case 8:
          return _context2.abrupt("return", false);

        case 9:
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", false);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.handleRejectiontoPlayerReq = handleRejectiontoPlayerReq;