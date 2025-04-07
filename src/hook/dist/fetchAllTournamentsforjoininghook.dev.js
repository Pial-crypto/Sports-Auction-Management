"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAllTournamentsforjoininghook = void 0;

var _react = require("react");

var _fetchAllTournaments = _interopRequireDefault(require("@/function/fetchAllTournaments"));

var _formateDatewithTime = _interopRequireDefault(require("@/function/formateDatewithTime"));

var _mockData = require("@/constants/JoinTournament/mockData");

var _handleJoinTournament = require("@/function/handleJoinTournament");

var _positionMap = require("@/constants/JoinTournament/positionMap");

var _getAllreq = _interopRequireDefault(require("@/function/getAllreq"));

var _storage = _interopRequireDefault(require("@/class/storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fetchAllTournamentsforjoininghook = function fetchAllTournamentsforjoininghook(setTournaments, setFilteredTournaments, setIsLoading, filterStatus) {
  (0, _react.useEffect)(function () {
    var fetchData = function fetchData() {
      var response;
      return regeneratorRuntime.async(function fetchData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              setIsLoading(true);
              _context.next = 4;
              return regeneratorRuntime.awrap((0, _fetchAllTournaments["default"])());

            case 4:
              response = _context.sent;

              if (response && Array.isArray(response)) {
                (0, _getAllreq["default"])().then(function (data) {
                  console.log(data, "data from fetch all requests");
                  var allReq = data.allPlayerReq;
                  console.log(response, "I am the response");
                  var formattedData = response.map(function (tournament) {
                    var hasRequested = allReq.find(function (req) {
                      return req.tournamentId === tournament.id && req.playerId === _storage["default"].get("user").id;
                    });
                    var isRejected = allReq.find(function (req) {
                      return req.tournamentId === tournament.id && req.rejected === true && req.playerId === _storage["default"].get("user").id;
                    });
                    var isApproved = allReq.find(function (req) {
                      return req.tournamentId === tournament.id && req.approved === true && req.playerId === _storage["default"].get("user").id;
                    });
                    console.log(isApproved, "isApproved");
                    console.log(isRejected, "isRejected");
                    console.log(hasRequested, "hasRequested");
                    return _objectSpread({}, tournament, {
                      startDate: (0, _formateDatewithTime["default"])(tournament.tournamentDate),
                      totalTeams: tournament.numberOfTeams,
                      prizeMoney: tournament.prizeMoney,
                      entryFee: tournament.registrationFee,
                      hasRequested: hasRequested ? true : false,
                      isRejected: isRejected ? true : false,
                      isApproved: isApproved ? true : false,
                      sport: tournament.gameType.toLowerCase(),
                      status: (0, _handleJoinTournament.getStatus)(tournament),
                      image: tournament.tournamenIcon == 'https://example.com/icon.png' || tournament.tournamenIcon == null ? "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea" : tournament.tournamenIcon,
                      playerRequirements: _objectSpread({}, tournament.playerRequirements, {
                        positions: _positionMap.positionsMap[tournament.gameType.toLowerCase()] || []
                      })
                    });
                  });
                  setTournaments(function (prev) {
                    return [].concat(_toConsumableArray(formattedData), _toConsumableArray(_mockData.mockTournaments));
                  });
                  setFilteredTournaments([].concat(_toConsumableArray(formattedData), _toConsumableArray(_mockData.mockTournaments)).filter(function (t) {
                    return t.status === filterStatus;
                  }));
                });
              }

              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.error('Error fetching tournaments:', _context.t0);
              setFilteredTournaments(_mockData.mockTournaments.filter(function (t) {
                return t.status === filterStatus;
              }));

            case 12:
              _context.prev = 12;
              setIsLoading(false);
              return _context.finish(12);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 8, 12, 15]]);
    };

    fetchData();
  }, [filterStatus]);
};

exports.fetchAllTournamentsforjoininghook = fetchAllTournamentsforjoininghook;