import { endBidding } from "@/function/handleAuctionPage";
import { useEffect } from "react";

export const timeLeftHook=(timeLeft,isBiddingActive,bidHistory,players,currentPlayerIndex,setPlayers,setSnackbar, userRole,socket)=>{
      // Timer effect
  useEffect(() => {
    if ( timeLeft > 0) {
   ///nothing to do here
    } else if (timeLeft <= 0 ) {
    //  console.log("Before ending the bid")
      endBidding({
  bidHistory,
  players,
  currentPlayerIndex,
  setPlayers,
  setSnackbar,
  userRole,socket
});
    }
  }, [timeLeft, isBiddingActive]);
}