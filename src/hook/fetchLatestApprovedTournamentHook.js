import storage from "@/class/storage"
import fetchAllTournaments from "@/function/fetchAllTournaments"
import { useEffect } from "react"

const useFetchLatestApprovedTournamentHook=(setActiveStatus,setTournament)=>{
  useEffect(()=>{
    const user=storage.get("user")
    const asyncFunction=async()=>{
      const approvalResponse=await fetch('/api/findLatestApprovalForPlayer',{
        method:'POST',
        body:JSON.stringify({playerId:user.id})
      })
      if(approvalResponse.ok){
          const approvalData=await approvalResponse.json()
          //console.log("approvalData",approvalData)
        const {latestApproval}=approvalData

        if(latestApproval){
            if(setActiveStatus){
          setActiveStatus(true)
          storage.set("user",{...user,activeStatus:true})
            }
          if(setTournament){
          fetchAllTournaments().then(tournaments=>{
            const tournament=tournaments.find(tournament=>tournament.id===latestApproval.tournamentId)
            setTournament(tournament)
          })
        }
        }
      }
    }
    asyncFunction()
  },[])
 }





export default useFetchLatestApprovedTournamentHook