"use client";
import React, { useState, useEffect, use } from 'react';
import {
  Box,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import BidHistory from './BidHistory';
import { DUMMY_PLAYERS } from './mockData';
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
import { addNewAuction } from '@/function/addNewAuction';
import saveBidding from '@/function/saveBidding';
import getAllBidding from '@/function/getAllBidding';
import { fetchCurrentTeamForManagerHook } from '@/hook/fetchCurrentTeamForManagerHook';
import { useFetchApprovedTeamOfTournament } from '@/hook/fetchAllTeamReqHookOfTournament';
import { isToday } from '@/function/isToday';
import { fetchAuctionState } from '@/function/fetchAuctionState';
import { fetchAuctionStateHook } from '@/hook/fetchAuctionStateHook';


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







  // Function to end bidding
  const endBidding = () => {

    if (bidHistory.length > 0) {

     
      // Award player to highest bidder
      const winner = bidHistory[0];
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex] = {
        ...updatedPlayers[currentPlayerIndex],
        status: 'sold',
        finalBid: winner.amount,
        soldTo: winner.team
      };


      socket.emit('current_queue',updatedPlayers)
      setPlayers(updatedPlayers);
      console.log("I am the winner",winner)
      if(userRole=='organizer'){
       
        const currentPlayer= players[currentPlayerIndex]
        const auctionData = {
          playerId: currentPlayer.playerId,
          tournamentId: currentPlayer.tournamentId,
         managerId: winner.managerId,      // optional, default: "N/A"
         createdAt: new Date(),        // optional, default: now()
          teamId: winner.id,            // optional, default: "N/A"
          teamName: winner.team,         // optional, default: "N/A"
         soldStatus:true,   // optional, default: "Unsold"
         amount: winner.amount, // optional, default: 0
        };
    
        addNewAuction(auctionData)
      }
     
      
      setSnackbar({
        open: true,
        message: `Bidding ended! ${winner.team} won with a bid of $${winner.amount}`,
        severity: 'success'
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Bidding ended with no bids. Player remained unsold.',
        severity: 'info'
      });
    }

    
  
  };
 

  useEffect(() => {

    if (!tournament || !user || players.length==0) return;
    socket = io("http://localhost:3001");
    socket.emit("join_tournament", tournament.id);
    const playersObj={
      players: players,
      tournamentId: tournament.id,
    }
    socket.emit("players", playersObj);
    console.log("This is the players in the auction main component",players)
  

  socket.on("receiveTimeLeft", (serverTimeLeft) => {
  setTimeLeft(serverTimeLeft);
});

    socket.on("receive_message", (msg) => {

   
    
      if(msg.tournament.id == tournament?.id ) { 
      const index=msg.message;
      setCurrentPlayerIndex(index);
       setCurrentBid(players[index]?.basePrice || 5000);
      setBidHistory([]);
      setSelectPlayerDialog(false);

          
    setSnackbar({
      open: true,
      message: `${players[index]?.name} is up for bidding! Starting price: $${players[index]?.basePrice || 5000}`,
      severity: 'info'
    });
      }
    });

    socket.on("receiveIsBidEnd", (End) => {
      if(tournament.id===End.tournament.id){
      if (End.isEnd) {
        endBidding();
      }
    }
    });

    socket.on("receiveNewBid", (bidData) => {
      if(bidData.tournament.id===tournament.id){
        console.log("Received new bid:", bidData);
      const newBid = {
        team: bidData.bidData.team,
        amount: bidData.bidData.amount,
        time: new Date().toLocaleTimeString()
      };
      setBidHistory(prevHistory => [newBid, ...prevHistory]);
      setCurrentBid(bidData.bidData.amount);

          setBidDialog(false);
    setBidAmount('');

    }
    });

    return () => socket.disconnect();
  }, [tournament,players]);




  // Timer effect
  useEffect(() => {
    if ( timeLeft > 0) {
   ///nothing to do here
    } else if (timeLeft <= 0 ) {
    //  console.log("Before ending the bid")
      endBidding();
    }
  }, [timeLeft, isBiddingActive]);
  
  const sendMessage = (message) => {
    socket.emit("send_message", {message, tournament:tournament,senderId:user.id});
  };



  // Fetch tournament data
  if (userRole === "player" || userRole === "manager") {

    useFetchLatestApprovedTournamentHook(undefined, userRole, setTournament, undefined);
    
  }
  
  if (userRole === "organizer") {
    fetchCurrentTournamentHook(setTournament, undefined);
  }
  
  fetchPlayerQueueForAuctionHook(tournament,setPlayers,callPlayerHook)
 

  const handleSelectPlayer = (index) => {

    sendMessage(index);

  };

  const sendBidInfo = () => {
    console.log("Before sending bit info",myTeam)
    const bidValue = Number(bidAmount);
    if (bidValue <= currentBid) {
      setSnackbar({
        open: true,
        message: 'Bid amount must be higher than current bid',
        severity: 'error'
      });
      return;
    }
 
    console.log("This is my team",myTeam)
  
    const bidData = {
      amount: bidValue,
      team: myTeam.teamName,
      managerId:myTeam.managerId,
      teamId:myTeam.teamId,


      //user.teamName || 'Team ' + user.name || 'Unknown Team',
      time: new Date().toLocaleTimeString(),

      
    };

console.log("This is my team" ,myTeam,"This is the bid data",bidData)

    saveBidding({teamId:myTeam.id,teamName:myTeam.teamName,amount:bidValue,playerId:players[currentPlayerIndex].playerId,tournamentId:tournament.id})
    .then((response) => {
     // alert("Bidding saved successfully:", response);
      //console.log("Bidding saved successfully:", response);
    })

    socket.emit("sendNewBid", {bidData:bidData,tournament:tournament});

  };

  const handleEndBidding = () => {

   

    if (userRole === "organizer" && isBiddingActive) {
      console.log("inside organizer bidder");
      socket.emit("sendIsBidEnd", {isEnd:true,tournament:tournament});
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
        handleBid={sendBidInfo}
        currentBid={currentBid}
      />

      <PlayerSelectionDialog 
        open={selectPlayerDialog}
        onClose={() => setSelectPlayerDialog(false)}
        players={players}
        handleSelectPlayer={handleSelectPlayer}
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