import { useEffect } from "react";
import { fetchPlayerQueueForAuction } from "@/function/fetchPlayerQueueForAuction";

export const fetchPlayerQueueForAuctionHook = (tournament,setPlayer,callHook) => {
  //console.log("inside fetchQueueplayer  hudahud ",tournament,"bal falai")
    useEffect(() => {
     // console.log("inside fetchQueueplayer  hudahud\n ")
      //console.log(tournament,"inside fetching queue")

      if(callHook){
      if(tournament!=null || tournament!=undefined){
        fetchPlayerQueueForAuction().then((data) => {
        //console.log(data,'hey i am inside fetching queue')

  
           const filteredPlayerQueueForThisTournament=data.filter((item)=>{
             return item.tournamentId==tournament.id && item.approved
           })

           console.log("filter player listed for queue",filteredPlayerQueueForThisTournament)

         setPlayer(filteredPlayerQueueForThisTournament)
   
     
 
    });
  }
}

  }, [tournament]);
}