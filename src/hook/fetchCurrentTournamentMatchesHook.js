import { getAllMatches } from "@/function/handleMatchesPage"
import { useEffect } from "react"

export const fetchCurrentTournamentMatchesHook = (tournament,setMatches)=> {     
useEffect(()=>{
    getAllMatches().then((data) => {
    if (data ) {
     console.log("Fetched matches inside hook:", data);
     if(tournament){
     const thisTournamentMatches = data.filter(match => match.tournamentId === tournament.id);
     console.log("Filtered matches for current tournament:", thisTournamentMatches);
    setMatches((prev)=>{
       return [...prev,...thisTournamentMatches]
    })
     }
    } else {
      console.error("No matches found or invalid data format");
      return [];
    }
  }).catch((error) => {
    console.error("Error fetching matches:", error);
    return [];
  } );
},[tournament])
}
