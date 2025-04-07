import fetchCurrentTournamentforPlayer from "@/function/fetchCurrentTournamentforPlayer"

export const fetchCurrentTournamentForPlayerHook=(setTournament)=>{
fetchCurrentTournamentforPlayer().then((data)=>{
    console.log(data,"data from fetch current tournament for player")
    setTournament(data)
})
}