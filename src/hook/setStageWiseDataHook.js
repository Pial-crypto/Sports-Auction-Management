import { getStageWiseTournamentPerformance } from "@/function/handleUserDashboard";
const { useEffect } = require("react");
export const setStageWiseDataHook=(setStageWiseData,myTeam,matches)=>{
getStageWiseTournamentPerformance(myTeam,matches).then(data=>{
    useEffect(()=>{
        setStageWiseData(data)
    },[])
})

}