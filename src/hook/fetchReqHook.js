import fetchAllReq from "@/function/getAllreq"
import fetchCurrentTournament from "@/function/fetchCurrentTournament"
export const fetchReqHook = () => {

    fetchCurrentTournament().then((currentTournament) => {
        console.log(currentTournament, "currentTournament")
        fetchAllReq().then((data) => {
            console.log(data)
            const allReq = data.allPlayerReq;
        
            const myTournamentReq = allReq.filter((req) => req.tournamentId === currentTournament.id);
            console.log(myTournamentReq, "myTournamentReq")
        
        }).catch((error) => {
            console.log(error)
        })
    }).catch((error) => {
        console.log(error)
    })


}