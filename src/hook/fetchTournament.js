import storage from "@/class/storage";
import fetchAllTournaments from "@/function/fetchAllTournaments";
const { useEffect, use } = require("react");
const fetchAllTournamentsHook=(setTournamentList,sportType,tournamentList)=>{
 useEffect(()=>{
    fetchAllTournaments().then((data)=>{
      if(sportType){
      const filteringTour=data.filter(
         (tournament) => tournament.gameType.toLowerCase() === sportType.toLowerCase()
       );
        setTournamentList([...tournamentList,...filteringTour])
    }


if(!sportType){
    const user=storage.get('user')
    console.log(user,"I am the user")
    const userId=user.id;
    console.log(userId,"user id")
    const filteringTour=data.filter(
        (tournament) => tournament.createdBy === userId
      );
   
       setTournamentList(filteringTour)
}
  
     })
    
  },[])
}

export default fetchAllTournamentsHook
