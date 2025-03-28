"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAllTournamentsHook = void 0;

var _fetchAllTournaments = _interopRequireDefault(require("@/function/fetchAllTournaments"));

var _formateDatewithTime = _interopRequireDefault(require("@/function/formateDatewithTime"));

var _mockData = require("@/constants/JoinTournament/mockData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fetchAllTournamentsHook = function fetchAllTournamentsHook(setIsLoading, setTournaments, setFilteredTournaments, positionsMap, getStatus, filterStatus) {
  return regeneratorRuntime.async(function fetchAllTournamentsHook$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          useEffect(function () {
            var fetchData = function fetchData() {
              var response, formattedData;
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
                        formattedData = response.map(function (tournament) {
                          return _objectSpread({}, tournament, {
                            startDate: (0, _formateDatewithTime["default"])(tournament.tournamentDate),
                            totalTeams: tournament.numberOfTeams,
                            prizeMoney: tournament.prizeMoney,
                            entryFee: tournament.registrationFee,
                            hasRequested: false,
                            sport: tournament.gameType.toLowerCase(),
                            status: getStatus(tournament),
                            image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea",
                            playerRequirements: _objectSpread({}, tournament.playerRequirements, {
                              positions: positionsMap[tournament.gameType.toLowerCase()] || []
                            })
                          });
                        });
                        setTournaments(function (prev) {
                          return [].concat(_toConsumableArray(formattedData), _toConsumableArray(prev));
                        });
                        setFilteredTournaments([].concat(_toConsumableArray(formattedData), _toConsumableArray(_mockData.mockTournaments)).filter(function (t) {
                          return t.status === filterStatus;
                        }));
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

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.fetchAllTournamentsHook = fetchAllTournamentsHook;