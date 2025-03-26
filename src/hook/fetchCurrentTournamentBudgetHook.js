const { default: fetchCurrentTournament } = require("@/function/fetchCurrentTournament")

const fetchCurrentTournamentBudgetHook = () => {
fetchCurrentTournament().then((data)=>{
    console.log("This is the budget data",data.budget)
})
}

export default fetchCurrentTournamentBudgetHook;