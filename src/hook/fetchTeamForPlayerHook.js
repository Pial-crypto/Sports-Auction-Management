import getAllAuction from "@/function/getAllAuction";
import { useEffect } from "react";
import storage from "@/class/storage";

export const fetchCurrentTeamForPlayerHook=(setMyTeam)=>{
  useEffect(()=>{
  getAllAuction().then((data) => {
    console.log(data);
    const myAuction = data.find(
      (auction) => auction.playerId === storage.get('user').id && auction.soldStatus
    );

    if (myAuction) {
      setMyTeam({
        teamName: myAuction.teamName,
        id: myAuction.teamId
      });
    } else {
      console.warn("No auction found for player");
    }
  });
  },[])
}