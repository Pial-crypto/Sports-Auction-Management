import { getAllPlayerPerformance } from "@/function/fetchAllPlayerPerformance"
import { useEffect } from "react";

export const fetchPlayerPerformancesHook=(setPlayerPerformance,tournament)=>{
useEffect(()=>{
getAllPlayerPerformance().then((performances) => {
  // console.log("Hey");
  // console.log(performances, "all the performances hook");

  if(tournament) setPlayerPerformance(performances.filter((performance)=>performance.tournamentId=tournament.id))
    else setPlayerPerformance(performances)
});



},[tournament])



}

