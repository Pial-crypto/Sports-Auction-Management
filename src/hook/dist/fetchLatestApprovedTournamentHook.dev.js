"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _storage = _interopRequireDefault(require("@/class/storage"));

var _fetchAllTournaments = _interopRequireDefault(require("@/function/fetchAllTournaments"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useFetchLatestApprovedTournamentHook = function useFetchLatestApprovedTournamentHook(setActiveStatus, setTournament) {
  (0, _react.useEffect)(function () {
    var user = _storage["default"].get("user");

    var asyncFunction = function asyncFunction() {
      var approvalResponse, approvalData, latestApproval;
      return regeneratorRuntime.async(function asyncFunction$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(fetch('/api/findLatestApprovalForPlayer', {
                method: 'POST',
                body: JSON.stringify({
                  playerId: user.id
                })
              }));

            case 2:
              approvalResponse = _context.sent;

              if (!approvalResponse.ok) {
                _context.next = 9;
                break;
              }

              _context.next = 6;
              return regeneratorRuntime.awrap(approvalResponse.json());

            case 6:
              approvalData = _context.sent;
              //console.log("approvalData",approvalData)
              latestApproval = approvalData.latestApproval;

              if (latestApproval) {
                if (setActiveStatus) {
                  setActiveStatus(true);

                  _storage["default"].set("user", _objectSpread({}, user, {
                    activeStatus: true
                  }));
                }

                if (setTournament) {
                  (0, _fetchAllTournaments["default"])().then(function (tournaments) {
                    var tournament = tournaments.find(function (tournament) {
                      return tournament.id === latestApproval.tournamentId;
                    });
                    setTournament(tournament);
                  });
                }
              }

            case 9:
            case "end":
              return _context.stop();
          }
        }
      });
    };

    asyncFunction();
  }, []);
};

var _default = useFetchLatestApprovedTournamentHook;
exports["default"] = _default;