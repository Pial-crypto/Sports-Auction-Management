import storage from "@/class/storage";
import fetchAllTeamReq from "@/function/getAllTeamReq";
import { useEffect, useState } from "react";
export const fetchCurrentTeamForManagerHook = async (tournament,setMyTeam) => {

    const user=storage.get("user");
 const allTeamReq=async()=>{
    const allTeamReqResponse=await fetchAllTeamReq();
    const allTeamReqList=allTeamReqResponse.allTeamReq;

   // console.log(allTeamReqList,"Here is all of the team requests")
    if(tournament){
   //   console.log("Tournament id",tournament.id,"Userid",user.id)
      
    const myownTeam=allTeamReqList.find((item)=>item.managerId==user.id && item.tournamentId==tournament.id && item.approved)

   // console.log("My own team",myownTeam)
    setMyTeam(myownTeam)
    //console.log("This is my team",myTeam)
  }
}
useEffect(()=>{
allTeamReq()
},[tournament])
}