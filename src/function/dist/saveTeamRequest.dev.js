"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveTeamRequest = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var saveTeamRequest = function saveTeamRequest(teamData) {
  var response, data;
  return regeneratorRuntime.async(function saveTeamRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/saveNewTeamJoiningReq", {
            method: "POST",
            body: JSON.stringify(_objectSpread({}, teamData, {
              approved: false
            })),
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 3:
          response = _context.sent;

          if (!response.ok) {
            _context.next = 10;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          console.log(data, "I am the data");
          return _context.abrupt("return", data);

        case 10:
          if (response.ok) {
            _context.next = 13;
            break;
          }

          console.log("I am the error");
          throw new Error("HTTP error! Status: ".concat(response.status));

        case 13:
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.error("Error saving player request:", _context.t0);
          return _context.abrupt("return", {
            success: false,
            message: _context.t0.message
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.saveTeamRequest = saveTeamRequest;