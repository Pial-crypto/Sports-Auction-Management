import { useEffect } from "react";
import fetchCurrentTournament from "@/function/fetchCurrentTournament";

export const fetchCurrentTournamentHook = (setTournament) => {
    useEffect(() => {
        fetchCurrentTournament().then((data) => {
       
      console.log("This is the data",data)
      setTournament(data)
    });
  }, []);
}