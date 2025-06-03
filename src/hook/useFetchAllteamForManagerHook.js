import storage from "@/class/storage";
import { useEffect } from "react";
import { data } from "react-router-dom";

const { default: fetchAllTeamReq } = require("@/function/getAllTeamReq")

export const useFetchAllTeamForManagerHook = (setMyTeamList) => {
    useEffect(()=>{
 fetchAllTeamReq().then((data)=>{
    console.log("Data in the hook",data)
   setMyTeamList( data.allTeamReq.filter((team)=>team.managerId===storage.get('user').id))
 })
    },[])

};
