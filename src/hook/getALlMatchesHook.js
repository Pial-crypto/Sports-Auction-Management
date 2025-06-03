const { getAllMatches } = require("@/function/handleMatchesPage")
const { useEffect } = require("react")

export const getAllMatchesHook=(setMatches)=>{
useEffect(()=>{
    getAllMatches().then((matches)=>{
  //console.log("match",match)
  setMatches(matches)
})
},[])
}