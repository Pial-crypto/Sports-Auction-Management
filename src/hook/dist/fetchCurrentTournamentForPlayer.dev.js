"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchCurrentTournamentForPlayerHook = void 0;

var _fetchCurrentTournamentforPlayer = _interopRequireDefault(require("@/function/fetchCurrentTournamentforPlayer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fetchCurrentTournamentForPlayerHook = function fetchCurrentTournamentForPlayerHook(setTournament) {
  (0, _fetchCurrentTournamentforPlayer["default"])().then(function (data) {
    console.log(data, "data from fetch current tournament for player");
    setTournament(data);
  });
};

exports.fetchCurrentTournamentForPlayerHook = fetchCurrentTournamentForPlayerHook;