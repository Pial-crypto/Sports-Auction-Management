import { useEffect, useState } from "react";
import fetchAllTeamReq from "@/function/getAllTeamReq";

export const useFetchApprovedTeamOfTournament = (tournament,setTeamList) => {
 

  useEffect(() => {
    const allTeamReq = async () => {
      try {
        const response = await fetchAllTeamReq();
        const allTeamReqList = response.allTeamReq || [];

        console.log(allTeamReqList, "Here is all of the team requests");
       

        if (tournament ) {
          console.log("Tournament id", tournament.id);

          const myTournamentAvailableTeam = allTeamReqList.filter(
            (item) => item.tournamentId == tournament.id && item.approved 
          );
            console.log("My Tournament Available Team", myTournamentAvailableTeam);
 setTeamList(myTournamentAvailableTeam || []);
        
          
        }
      } catch (error) {
        console.error("Failed to fetch team requests:", error);
      }
    };

    allTeamReq();
  }, [tournament]);

};
