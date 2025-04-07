import fetchAllTournaments from "./fetchAllTournaments"
import { fetchAllReq } from "./getAllreq"
import storage from "@/class/storage"

const fetchCurrentTournamentforPlayer=async()=>{
    const data=await fetchAllReq()
    const id=storage.get("user").id
    const myRequests=data.find((item)=>item.playerId===id)
    const myCurrentTournamentId=myRequests.map((req)=>{
fetchAllTournaments().then((data)=>{
    const tournament=data.findUnique((item)=>item.id===req.tournamentId && (item.status==="active" || item.status==="upcoming" || item.status==="live"))
    return tournament
})
    })
}
export default fetchCurrentTournamentforPlayer