import { useEffect } from "react";

import fetchAllTeamReq from "@/function/getAllTeamReq";

export const fetchAllTeamsForTheTournamentHook = (tournament,setTournamentTeams)=>{
      useEffect(() => {

      fetchAllTeamReq().then(teamData => 
        {
          console.log(teamData, "teamData from ");
      if(tournament){
      const thisTournamentTeam= teamData.allTeamReq.filter(team => team.tournamentId === tournament.id && team.approved  );
      console.log(thisTournamentTeam, "thisTournamentTeam");
      setTournamentTeams(thisTournamentTeam);
      }
    });
},[tournament]);
}