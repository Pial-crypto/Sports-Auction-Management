import { useEffect, useState } from 'react';
import { fetchAuctionState } from '@/function/fetchAuctionState';

export const fetchAuctionStateHook = (tournament,setCurrentPlayerIndex,setBidHistory)=>{
    useEffect(() => {
fetchAuctionState(tournament?.id).then((data) => {
  if (data) {
    setCurrentPlayerIndex(data.currentPlayerIndex || 0);
    setBidHistory(data.bidHistory || []);
    
    console.log("✅ Auction state fetched:", data);
  } else {
    console.log("⚠️ No state found");
  }
});
}, [tournament]);
}