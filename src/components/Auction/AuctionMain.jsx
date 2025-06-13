"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import BidHistory from './BidHistory';
import storage from '@/class/storage';
import { fetchPlayerQueueForAuctionHook } from '@/hook/fetchPlayerQueueForAuctionHook';
import useFetchLatestApprovedTournamentHook from '@/hook/fetchLatestApprovedTournamentHook';
import { fetchCurrentTournamentHook } from '@/hook/fetchCurrentTournament';
import AuctionPhaseProgress from './AuctionPhaseProgress';
import AvailablePlayerQueue from './AvailablePlayerQueue';
import SoldPlayers from './SoldPlayers';
import CurrentAuctionSection from './CurrentAuctionSection';
import CurrentBidSection from './CurrentBidSection';
import BidDialog from './BidDialog';
import PlayerSelectionDialog from './PlayerSelectionDialog';
import { io } from 'socket.io-client';
import BidChart from './BidChart';
import { fetchCurrentTeamForManagerHook } from '@/hook/fetchCurrentTeamForManagerHook';
import { useFetchApprovedTeamOfTournament } from '@/hook/fetchAllTeamReqHookOfTournament';
import { fetchAuctionStateHook } from '@/hook/fetchAuctionStateHook';
import useSocketHook from '@/hook/socketHook';
import { timeLeftHook } from '@/hook/timeLeftHook';
import { endBidding, handleSelectPlayer, sendBidInfo } from '@/function/handleAuctionPage';



// Socket instance
let socket;

const AuctionMain = () => {
  const user = storage.get("user");
  const userRole = user?.role;
  //let myTeam;
  // Basic auction state
  const[myTeam,setMyTeam]=useState(null)
  const [currentBid, setCurrentBid] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [bidDialog, setBidDialog] = useState(false);
  const [selectPlayerDialog, setSelectPlayerDialog] = useState(false);
  const [tournament, setTournament] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isBiddingActive, setIsBiddingActive] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);
  const [callPlayerHook,setCallPlayerHook]=useState(true)
  const [teamList,setTeamList]=useState([])
  


  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

 

if(userRole === 'organizer' ){
useFetchApprovedTeamOfTournament(tournament,setTeamList)

}

if(userRole === 'manager'){
 fetchCurrentTeamForManagerHook(tournament,setMyTeam)
}




fetchAuctionStateHook(tournament,setCurrentPlayerIndex,setBidHistory)










  useEffect(() => {
    socket = io("http://localhost:3001")
  }  ,[tournament,players])

  useSocketHook({
  tournament,
  user,
  players,
  setCurrentPlayerIndex,
  setCurrentBid,
  setBidHistory,
  setSelectPlayerDialog,
  setSnackbar,
  setTimeLeft,
  endBidding,
  setBidDialog,
  setBidAmount,
  socket
  
});
 




timeLeftHook(timeLeft,isBiddingActive,  bidHistory,
  players,
  currentPlayerIndex,
  setPlayers,
  setSnackbar,
  userRole,socket);


  
 
console.log(players,"This is the players in the auction main component",players)


  // Fetch tournament data
  if (userRole === "player" || userRole === "manager") {

    useFetchLatestApprovedTournamentHook(undefined, userRole, setTournament, undefined);
    
  }
  
  if (userRole === "organizer") {
    fetchCurrentTournamentHook(setTournament, undefined);
  }
  
  fetchPlayerQueueForAuctionHook(tournament,setPlayers,callPlayerHook)
 

 

//   const sendBidInfo = () => {
//     console.log("Before sending bit info",myTeam)
//     const bidValue = Number(bidAmount);
//     if (bidValue <= currentBid) {
//       setSnackbar({
//         open: true,
//         message: 'Bid amount must be higher than current bid',
//         severity: 'error'
//       });
//       return;
//     }
 
//     console.log("This is my team",myTeam)
  
//     const bidData = {
//       amount: bidValue,
//       team: myTeam.teamName,
//       managerId:myTeam.managerId,
//       teamId:myTeam.teamId,


//       //user.teamName || 'Team ' + user.name || 'Unknown Team',
//       time: new Date().toLocaleTimeString(),

      
//     };

// console.log("This is my team" ,myTeam,"This is the bid data",bidData)

//     saveBidding({teamId:myTeam.id,teamName:myTeam.teamName,amount:bidValue,playerId:players[currentPlayerIndex].playerId,tournamentId:tournament.id})
//     .then((response) => {
//      // alert("Bidding saved successfully:", response);
//       //console.log("Bidding saved successfully:", response);
//     })

//     socket.emit("sendNewBid", {bidData:bidData,tournament:tournament});

//   };

  const handleEndBidding = () => {

   

    if (userRole === "organizer" && isBiddingActive) {
      console.log("inside organizer bidder");
      socket && socket.emit("sendIsBidEnd", {isEnd:true,tournament:tournament});
    }
  };



  return (
    <Box sx={{ 
      p: 4, 
      background: '#F8FAFC',
      minHeight: '100vh'
    }}>
      <AuctionPhaseProgress 
   activePhase={players.every(player => player.status === 'sold') ? 2 : 1}

        isBiddingActive={timeLeft<=0 ? false : true}
        timeLeft={timeLeft}
        players={players}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <AvailablePlayerQueue 
            players={players}
            currentPlayerIndex={currentPlayerIndex}
          />
          <SoldPlayers players={players} />
        </Grid>

        <Grid item xs={12} md={6}>
          <CurrentAuctionSection 
            isBiddingActive={timeLeft<=0 ? false : true}
            timeLeft={timeLeft}
            currentPlayerIndex={currentPlayerIndex}
            players={players}
            userRole={userRole}
            handleBidDialog={() => setBidDialog(true)}
            handleSelectPlayerDialog={() => setSelectPlayerDialog(true)}
            handleEndBidding={handleEndBidding}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CurrentBidSection 
                currentBid={currentBid}
                bidHistory={bidHistory}
                currentPlayerIndex={currentPlayerIndex}
              />
              <BidChart bidHistory={bidHistory} />
            </Grid>
            <Grid item xs={12}>
              <BidHistory history={bidHistory} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <BidDialog 
        open={bidDialog}
        onClose={() => setBidDialog(false)}
        bidAmount={bidAmount}
        setBidAmount={setBidAmount}
        handleBid={()=>sendBidInfo({
  bidAmount,
  currentBid,
  myTeam,
  setSnackbar,
  players,
  currentPlayerIndex,
  tournament,
  socket
})
}
        currentBid={currentBid}
      />

      <PlayerSelectionDialog 
        open={selectPlayerDialog}
        onClose={() => setSelectPlayerDialog(false)}
        players={players}
        handleSelectPlayer={(index)=>handleSelectPlayer(index,tournament,user,socket)}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AuctionMain;