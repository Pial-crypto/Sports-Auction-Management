import { useEffect } from "react";
import fetchCurrentTournament from "@/function/fetchCurrentTournament";
import fetchAllRules from "@/function/fetchAllRules";
export const fetchCurrentTournamentRulesHook = (tournament,setRules) => {
    useEffect(() => {
        fetchAllRules().then((data) => {
       
      //console.log("This is the data",data)
      if(tournament){
      const tournamentRules = data.filter(rule => rule.tournamentId === tournament.id)
      console.log(tournamentRules,"this is the tournament rules")
      setRules((prevRules) => [...prevRules, ...tournamentRules])
      }
      
      });
      }, [tournament]);
}