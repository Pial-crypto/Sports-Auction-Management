"use client";
import React, { useState, useEffect } from 'react';
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import AuctionPhaseProgress from './AuctionPhaseProgress';
import AvailablePlayerQueue from './AvailablePlayerQueue';
import SoldPlayers from './SoldPlayers';
import CurrentAuctionSection from './CurrentAuctionSection';
import CurrentBidSection from './CurrentBidSection';
import BidDialog from './BidDialog';
import PlayerSelectionDialog from './PlayerSelectionDialog';
import { io } from 'socket.io-client';
import BidChart from './BidChart';
import fetchAllTeamReq from '@/function/getAllTeamReq';

// Socket instance
let socket;

const AuctionMain = () => {
  const user = storage.get("user");
  const userRole = user?.role;
  let myTeam;
  // Basic auction state
  const [currentBid, setCurrentBid] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [bidDialog, setBidDialog] = useState(false);
  const [selectPlayerDialog, setSelectPlayerDialog] = useState(false);
  const [tournament, setTournament] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isBiddingActive, setIsBiddingActive] = useState(false);
  const [players, setPlayers] = useState(DUMMY_PLAYERS);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);
  const [callPlayerHook,setCallPlayerHook]=useState(true)
  // Snackbar for notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const allTeamReq=async()=>{
    const allTeamReqResponse=await fetchAllTeamReq();
    const allTeamReqList=allTeamReqResponse.allTeamReq;

    //console.log(allTeamReqList,"Here is all of the team requests")
    if(tournament)
     myTeam=allTeamReqList.find((item)=>item.managerId==user.id && item.tournamentId==tournament.id && item.approved)
    //console.log("This is my team",myTeam)
  }

  allTeamReq()
  
   

  // Function to end bidding
  const endBidding = () => {

  //  if (!isBiddingActive) return;
  
    

   // console.log(bidHistory,"inside end bidding why i am being cleared")
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

      //console.log("before emitting updated players",updatedPlayers)
     
      socket.emit('current_queue',updatedPlayers)
      setPlayers(updatedPlayers);
      
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

    setIsBiddingActive(false);
  };
 

  useEffect(() => {
    socket = io("http://localhost:3001");
    //socket.emit('current_queue',players);

    socket.on("initial_state", (state) => {
      
      if (state.msg === 0 || state.msg !== null) {
        setCallPlayerHook(false)
        setCurrentPlayerIndex(state.msg);
        if (state.timeLeft >= 0) setTimeLeft(state.timeLeft);
        setIsBiddingActive(true);
        setCurrentBid(players[state.msg]?.basePrice || 5000);
        setSelectPlayerDialog(false);
        //console.log("After reloading the current queue",state.currentQueue)
        setPlayers(state.currentQueue)
      //  console.log("There is the initial state",)
        

        if (state.bidHistory?.length > 0) {
          if(state.timeLeft >= 0){
          setBidHistory(state.bidHistory);
          setCurrentBid(state.bidHistory[0].amount)
          }
           
              
          
        }
      }
      else{
        setCallPlayerHook(true)
      }
      
        // Fetch player queue
  // fetchPlayerQueueForAuctionHook(tournament, setPlayers,);
      
      if (state.End) {
        endBidding();
        state.End!=state.End
      }
    });

    socket.on("receive_message", (index) => {
      setCurrentPlayerIndex(index);
      setTimeLeft(60);
      setIsBiddingActive(true);
      setCurrentBid(players[index]?.basePrice || 5000);
      setBidHistory([]);
      setSelectPlayerDialog(false);
    });

    socket.on("receiveIsBidEnd", (End) => {
      if (End) {
        endBidding();
      }
    });

    socket.on("receiveNewBid", (bidData) => {
      const newBid = {
        team: bidData.team,
        amount: bidData.amount,
        time: new Date().toLocaleTimeString()
      };
      setBidHistory(prevHistory => [newBid, ...prevHistory]);
      setCurrentBid(bidData.amount);
    });

    return () => socket.disconnect();
  }, []);


  // Update server with current bid history when it changes
  useEffect(() => {
    if (isBiddingActive && bidHistory.length > 0) {
      socket.emit('bid_history', bidHistory);
    }
  }, [bidHistory, isBiddingActive]);

  // Update server with time left
  useEffect(() => {
    if (isBiddingActive) {
      socket.emit('time_left', timeLeft);
    }
  }, [timeLeft, isBiddingActive]);

  // Timer effect
  useEffect(() => {
    if (isBiddingActive && timeLeft > 0) {
      socket.emit('current_queue',players)
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isBiddingActive) {
    //  console.log("Before ending the bid")
      endBidding();
    }
  }, [timeLeft, isBiddingActive]);
  
  const sendMessage = (message) => {
    socket.emit("send_message", message);
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
    setCurrentPlayerIndex(index);
    setTimeLeft(60);
    setIsBiddingActive(true);
    setCurrentBid(players[index]?.basePrice || 5000);
    setBidHistory([]);
    setSelectPlayerDialog(false);
    
    sendMessage(index);
    
    setSnackbar({
      open: true,
      message: `${players[index]?.name} is up for bidding! Starting price: $${players[index]?.basePrice || 5000}`,
      severity: 'info'
    });
  };

  const sendBidInfo = () => {
    const bidValue = Number(bidAmount);
    if (bidValue <= currentBid) {
      setSnackbar({
        open: true,
        message: 'Bid amount must be higher than current bid',
        severity: 'error'
      });
      return;
    }

    const bidData = {
      amount: bidValue,
      team: myTeam.teamName,
      //user.teamName || 'Team ' + user.name || 'Unknown Team',
      time: new Date().toLocaleTimeString()
    };

    socket.emit("sendNewBid", bidData);
    setBidDialog(false);
    setBidAmount('');
  };

  const handleEndBidding = () => {
    console.log("Before going to endBidding", bidHistory);
    
     socket.emit("bid_history", bidHistory);
    if (userRole === "organizer" && isBiddingActive) {
      console.log("inside organizer bidder");
      socket.emit("sendIsBidEnd", true);
    }
  };

  if (!userRole) {
    return <Box sx={{ p: 4 }}>Loading auction...</Box>;
  }

  return (
    <Box sx={{ 
      p: 4, 
      background: '#F8FAFC',
      minHeight: '100vh'
    }}>
      <AuctionPhaseProgress 
        isBiddingActive={isBiddingActive}
        timeLeft={timeLeft}
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
            isBiddingActive={isBiddingActive}
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