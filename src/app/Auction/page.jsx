"use client";
import storage from '@/class/storage';
import NoAuctionAvailable from '@/components/Auction/NoAuctionAvailable';
import TournamentNotStarted from '@/components/Common/tournamentNotStarted';
import fetchbasePrice from '@/function/fetchbasePrice';
import { isToday } from '@/function/isToday';
import { fetchCurrentTournamentHook } from '@/hook/fetchCurrentTournament';
import useFetchLatestApprovedTournamentHook from '@/hook/fetchLatestApprovedTournamentHook';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Use dynamic import to prevent hydration errors with localStorage access
const AuctionMain = dynamic(() => import('@/components/Auction/AuctionMain'), { 
  ssr: false 
});

const AuctionPage = () => {
  const [tournament, setTournament] = useState(null);
const user=storage.get('user');
const {role}=user;
  if(role=='organizer'){
    fetchCurrentTournamentHook(setTournament);
  }

  if(role=='player' || role=='manager'){
      useFetchLatestApprovedTournamentHook(undefined,role,setTournament)
  }
fetchbasePrice()
if (isToday(tournament?.auctionDate)) {

  //console.log("Auction is today!");
} else {
  //return <NoAuctionAvailable tournament={tournament}></NoAuctionAvailable>
 // console.log("Auction is not today.");
}


  //console.log(tournament, "tournament");
  if(!tournament) {
    return <TournamentNotStarted tournament={tournament} />;
  }
  return <AuctionMain />;
};

export default AuctionPage;