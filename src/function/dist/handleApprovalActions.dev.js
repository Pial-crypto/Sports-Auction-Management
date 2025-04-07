"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleRejectiontoPlayerReq = exports.handleApprovePlayer = void 0;

var handleApprovePlayer = function handleApprovePlayer(request) {
  var response, addApprovaltoTableResponse;
  return regeneratorRuntime.async(function handleApprovePlayer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('/api/giveApprovaltoPlayer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: request.id
            })
          }));

        case 3:
          response = _context.sent;

          if (!response.ok) {
            _context.next = 15;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(fetch('/api/addApprovaltoTable', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              playerId: request.playerId,
              tournamentId: request.tournamentId
            })
          }));

        case 7:
          addApprovaltoTableResponse = _context.sent;

          if (!addApprovaltoTableResponse.ok) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", true);

        case 12:
          return _context.abrupt("return", false);

        case 13:
          _context.next = 16;
          break;

        case 15:
          return _context.abrupt("return", false);

        case 16:
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", false);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
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