"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchReqHook = void 0;

var _getAllreq = _interopRequireDefault(require("@/function/getAllreq"));

var _fetchCurrentTournament = _interopRequireDefault(require("@/function/fetchCurrentTournament"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fetchReqHook = function fetchReqHook() {
  (0, _fetchCurrentTournament["default"])().then(function (currentTournament) {
    console.log(currentTournament, "currentTournament");
    (0, _getAllreq["default"])().then(function (data) {
      console.log(data);
      var allReq = data.allPlayerReq;
      var myTournamentReq = allReq.filter(function (req) {
        return req.tournamentId === currentTournament.id;
      });
      console.log(myTournamentReq, "myTournamentReq");
    })["catch"](function (error) {
      console.log(error);
    });
  })["catch"](function (error) {
    console.log(error);
  });
};

exports.fetchReqHook = fetchReqHook;