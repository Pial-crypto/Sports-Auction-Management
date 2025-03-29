"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterRequests = exports.handleReject = exports.handleApprove = exports.handleRejectRequest = exports.handleApproveRequest = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var handleApproveRequest = function handleApproveRequest(request, setRequests) {
  var response;
  return regeneratorRuntime.async(function handleApproveRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('/api/approveRequest', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: request.id,
              type: request.type,
              tournamentId: request.tournamentId,
              playerId: request.playerId
            })
          }));

        case 3:
          response = _context.sent;

          if (response.ok) {
            // Update local state
            setRequests(function (prev) {
              return prev.map(function (req) {
                return req.id === request.id ? _objectSpread({}, req, {
                  status: 'approved'
                }) : req;
              });
            });
            alert('Request approved successfully');
          } else {
            alert('Failed to approve request');
          }

          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error('Error approving request:', _context.t0);
          alert('Error approving request');

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.handleApproveRequest = handleApproveRequest;

var handleRejectRequest = function handleRejectRequest(request, setRequests) {
  var response;
  return regeneratorRuntime.async(function handleRejectRequest$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch('/api/rejectRequest', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: request.id,
              type: request.type,
              tournamentId: request.tournamentId,
              playerId: request.playerId
            })
          }));

        case 3:
          response = _context2.sent;

          if (response.ok) {
            // Update local state
            setRequests(function (prev) {
              return prev.map(function (req) {
                return req.id === request.id ? _objectSpread({}, req, {
                  status: 'rejected'
                }) : req;
              });
            });
            alert('Request rejected successfully');
          } else {
            alert('Failed to reject request');
          }

          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error('Error rejecting request:', _context2.t0);
          alert('Error rejecting request');

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.handleRejectRequest = handleRejectRequest;

var handleApprove = function handleApprove(request, setRequests) {
  setRequests(function (prev) {
    return prev.map(function (req) {
      return req.id === request.id ? _objectSpread({}, req, {
        status: 'approved'
      }) : req;
    });
  });
};

exports.handleApprove = handleApprove;

var handleReject = function handleReject(request, setRequests) {
  setRequests(function (prev) {
    return prev.map(function (req) {
      return req.id === request.id ? _objectSpread({}, req, {
        status: 'rejected'
      }) : req;
    });
  });
};

exports.handleReject = handleReject;

var filterRequests = function filterRequests(requests, filter) {
  if (filter === 'all') return requests;
  return requests.filter(function (request) {
    return request.status === filter;
  });
};

exports.filterRequests = filterRequests;