"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPlayerQueueForAuctionHook = void 0;

var _react = require("react");

var _fetchPlayerQueueForAuction = require("@/function/fetchPlayerQueueForAuction");

var _getAllAuction = _interopRequireDefault(require("@/function/getAllAuction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Custom hook to fetch and filter players for auction queue
 * @param {Object} tournament - Tournament object
 * @param {Function} setPlayer - Setter function to update the filtered player list
 * @param {Boolean} callHook - Condition to trigger the hook
 */
var fetchPlayerQueueForAuctionHook = function fetchPlayerQueueForAuctionHook(tournament, setPlayer, callHook) {
  (0, _react.useEffect)(function () {
    if (!callHook || !tournament) return;

    var fetchData = function fetchData() {
      var _ref, _ref2, playerQueue, auctionData, filteredPlayerQueueForThisTournament, soldPlayerMap, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, auction, finalFilteredPlayers;

      return regeneratorRuntime.async(function fetchData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(Promise.all([(0, _fetchPlayerQueueForAuction.fetchPlayerQueueForAuction)(), (0, _getAllAuction["default"])()]));

            case 3:
              _ref = _context.sent;
              _ref2 = _slicedToArray(_ref, 2);
              playerQueue = _ref2[0];
              auctionData = _ref2[1];
              // Step 2: Filter only approved players for this tournament
              filteredPlayerQueueForThisTournament = playerQueue.filter(function (item) {
                return item.tournamentId === tournament.id && item.approved;
              }); // Step 3: Create a Set of sold players and a Map for quick lookup of auction data

              soldPlayerMap = new Map();
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 12;

              for (_iterator = auctionData[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                auction = _step.value;

                if (auction.tournamentId === tournament.id && auction.soldStatus === true) {
                  soldPlayerMap.set(auction.playerId, {
                    status: "sold",
                    finalBid: auction.amount,
                    soldTo: auction.teamName
                  });
                }
              } // Step 4: Split the player queue into sold and unsold


              _context.next = 20;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](12);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 20:
              _context.prev = 20;
              _context.prev = 21;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 23:
              _context.prev = 23;

              if (!_didIteratorError) {
                _context.next = 26;
                break;
              }

              throw _iteratorError;

            case 26:
              return _context.finish(23);

            case 27:
              return _context.finish(20);

            case 28:
              finalFilteredPlayers = filteredPlayerQueueForThisTournament.map(function (player) {
                var soldInfo = soldPlayerMap.get(player.playerId);

                if (soldInfo) {
                  return _objectSpread({}, player, {}, soldInfo);
                }

                return player; // regular player without sold info
              }); // Step 5: Set the final player list

              setPlayer(finalFilteredPlayers);
              _context.next = 35;
              break;

            case 32:
              _context.prev = 32;
              _context.t1 = _context["catch"](0);
              console.error("Error fetching player queue or auction data:", _context.t1);

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 32], [12, 16, 20, 28], [21,, 23, 27]]);
    };

    fetchData();
  }, [tournament, callHook, setPlayer]);
};

exports.fetchPlayerQueueForAuctionHook = fetchPlayerQueueForAuctionHook;