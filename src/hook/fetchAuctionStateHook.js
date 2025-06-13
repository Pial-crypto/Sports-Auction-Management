import { useEffect, useState } from 'react';
import { fetchAuctionState } from '@/function/fetchAuctionState';

export const fetchAuctionStateHook = (tournament,setCurrentPlayerIndex,setBidHistory)=>{
    useEffect(() => {
fetchAuctionState(tournament?.id).then((data) => {
  if (data) {
    console.log("Fetching auction state for tournament:", data);
    setCurrentPlayerIndex(data.currentPlayerIndex || null);
    setBidHistory(data.bidHistory || []);
    
    console.log("✅ Auction state fetched:", data);
  } else {
    console.log("⚠️ No state found");
  }
});
}, [tournament]);
}