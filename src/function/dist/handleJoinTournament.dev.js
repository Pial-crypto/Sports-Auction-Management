"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSubmitRequest = exports.handleJoinRequest = exports.getStatus = void 0;

var _storage = _interopRequireDefault(require("@/class/storage"));

var _savePlayerRequest = require("./savePlayerRequest");

var _getAllreq = _interopRequireDefault(require("./getAllreq"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Check tournament status
var getStatus = function getStatus(tournament) {
  if (!tournament.registrationDeadline || isNaN(new Date(tournament.registrationDeadline))) {
    return "active";
  }

  var deadline = new Date(tournament.registrationDeadline).toISOString();
  var now = new Date().toISOString();
  return deadline > now ? "active" : "completed";
}; // Handle join request click


exports.getStatus = getStatus;

var handleJoinRequest = function handleJoinRequest(tournamentId, tournaments, setSelectedTournament, setOpenDialog) {
  var tournament = tournaments.find(function (t) {
    return t.id === tournamentId;
  });
  setSelectedTournament(tournament);
  setOpenDialog(true);
}; // Handle request submission


exports.handleJoinRequest = handleJoinRequest;

var handleSubmitRequest = function handleSubmitRequest(playerData, selectedTournament, setTournaments, setFilteredTournaments, setOpenDialog, setSelectedTournament, setError) {
  var request, data, updateTournamentState;
  return regeneratorRuntime.async(function handleSubmitRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          request = _objectSpread({}, playerData, {
            tournamentId: selectedTournament.id,
            playerId: _storage["default"].get("user").id
          });
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _savePlayerRequest.savePlayerRequest)(request));

        case 4:
          data = _context.sent;

          // Update tournaments state
          if (data) {
            alert("Request submitted successfully");

            updateTournamentState = function updateTournamentState(tournaments) {
              return tournaments.map(function (tournament) {
                return tournament.id === selectedTournament.id ? _objectSpread({}, tournament, {
                  hasRequested: true
                }) : tournament;
              });
            };

            setTournaments(function (prev) {
              return updateTournamentState(prev);
            });
            setFilteredTournaments(function (prev) {
              return updateTournamentState(prev);
            });
            setOpenDialog(false);
            setSelectedTournament(null);
          } else {
            setError("Request submission failed");
          }

          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error('Failed to submit request:', _context.t0);
          setError('Failed to submit request. Please try again.');

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.handleSubmitRequest = handleSubmitRequest;