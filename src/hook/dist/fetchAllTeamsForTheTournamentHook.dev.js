"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAllTeamsForTheTournamentHook = void 0;

var _react = require("react");

var _getAllTeamReq = _interopRequireDefault(require("@/function/getAllTeamReq"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fetchAllTeamsForTheTournamentHook = function fetchAllTeamsForTheTournamentHook(tournament, setTournamentTeams) {
  (0, _react.useEffect)(function () {
    (0, _getAllTeamReq["default"])().then(function (teamData) {
      console.log(teamData, "teamData from ");

      if (tournament) {
        var thisTournamentTeam = teamData.allTeamReq.filter(function (team) {
          return team.tournamentId === tournament.id && team.approved;
        });
        console.log(thisTournamentTeam, "thisTournamentTeam");
        setTournamentTeams(thisTournamentTeam);
      }
    });
  }, [tournament]);
};

exports.fetchAllTeamsForTheTournamentHook = fetchAllTeamsForTheTournamentHook;