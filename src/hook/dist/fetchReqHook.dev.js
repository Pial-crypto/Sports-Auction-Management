"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchReqHook = void 0;

var _getAllreq = _interopRequireDefault(require("@/function/getAllreq"));

var _fetchCurrentTournament = _interopRequireDefault(require("@/function/fetchCurrentTournament"));

var _react = require("react");

var _formateDatewithTime = _interopRequireDefault(require("@/function/formateDatewithTime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var fetchReqHook = function fetchReqHook(setRequests) {
  (0, _react.useEffect)(function () {
    (0, _fetchCurrentTournament["default"])().then(function (currentTournament) {
      (0, _getAllreq["default"])().then(function (data) {
        console.log(data);
        var allPlayerReq = data.allPlayerReq; // Map the player requests correctly

        var formattedPlayerReqs = allPlayerReq.filter(function (req) {
          return req.tournamentId === currentTournament.id;
        }).map(function (req) {
          return {
            id: req.id,
            type: 'Player Registration',
            playerName: req.name,
            prevTeam: req.previousTeam,
            position: req.role,
            age: req.age,
            status: req.rejected ? 'rejected' : req.approved ? 'approved' : 'pending',
            experience: req.experience,
            submittedAt: (0, _formateDatewithTime["default"])(req.createdAt),
            additionalInfo: req.achievements,
            tournamentId: req.tournamentId,
            rejectionReason: req.rejectionReason
          };
        }); // Update state by combining existing requests with new ones

        setRequests(function (prevRequests) {
          // Filter out any existing player requests to avoid duplicates
          var teamRequests = prevRequests.filter(function (req) {
            return req.type === 'Team Registration';
          });
          return [].concat(_toConsumableArray(teamRequests), _toConsumableArray(formattedPlayerReqs));
        });
      })["catch"](function (error) {
        console.log(error);
      });
    })["catch"](function (error) {
      console.log(error);
    });
  }, []);
};

exports.fetchReqHook = fetchReqHook;