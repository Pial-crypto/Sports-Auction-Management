import { useEffect } from "react";
import getAllAuction from "@/function/getAllAuction";

export const fetchPlayerForSpecificTeamHook = (
 
  teamName,
  teamId,
  tournament,
  setAuctionTeam

) => {

   // console.log("teamName",teamName,"teamId," ,teamId,tournament,setAuctionTeam)
    
  useEffect(() => {
    

    //console.log(setAuctionTeam,"set aucitonTeam")
    if (!tournament  ) return;

    const fetchData = async () => {
      try {
        const auctionData = await getAllAuction();
        console.log("Auction data",auctionData)


        const teamAuctions = auctionData.filter(
          (item) => (item.teamId === teamId || item.teamName===teamName) && item.tournamentId === tournament.id && item.soldStatus==true
        );

        //console.log(teamAuctions,"TeamAuction")

       

        setAuctionTeam(teamAuctions);
       
      } catch (error) {
        console.error("Error fetching auction data:", error);
      }
    };

    fetchData();
  }, [tournament, setAuctionTeam]);
};
