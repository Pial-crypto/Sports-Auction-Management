import { getThisTeamAndTournamentPracticeSessions } from "@/function/handleTeamSchedule";
import { useEffect } from "react";
export const fetchPracticeSessionsForTeamTheTournamentAndTeamHook = async (tournament, myTeam,setPracticeSessions) => {
useEffect(() => {

    getThisTeamAndTournamentPracticeSessions(tournament, myTeam)
  .then((practiceSessions) => {
    setPracticeSessions(practiceSessions);
  })
  .catch((error) => {
    console.error("Error fetching practice sessions:", error);
  });
},[tournament, myTeam]);


};
