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
  const [timeLeft, setTimeLeft] = useState(60);
  const [isBiddingActive, setIsBiddingActive] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);
  const [callPlayerHook,setCallPlayerHook]=useState(true)
  const [teamList,setTeamList]=useState([])

  //const [tournamentIdFromServer,settournamentIdFromServer]=useState(null)
  // Snackbar for notifications
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
 console.log(players,"These are the players in the auction")


useEffect(() => {
  tournament && getAllBidding().then((data) => {
    if(data){
      console.log("This is the data from getAllBidding",data)
    const currentAvailableBidding = data
      .filter(item => item.tournamentId === tournament.id)
      .map(item => ({
        ...item,
        team: item.teamName,
        time: new Date(item.createdAt).toLocaleTimeString(),
      }));

    setBidHistory(currentAvailableBidding);
    }
  });


},[tournament])



  console.log("This is the tournament",bidHistory,"This is the tournament from the auction main component")







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
     //const currentPlayer=players[currentPlayerIndex]
      //console.log(players[currentPlayerIndex],"The current player")
      socket.emit('current_queue',updatedPlayers)
      setPlayers(updatedPlayers);
      console.log("I am the winner",winner)
      if(userRole=='organizer'){
        //console.log(myTeam,"My team is here")
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

    setIsBiddingActive(false);
  
  };
 

  useEffect(() => {

    if (!tournament || !user || players.length==0) return;
    socket = io("http://localhost:3001");
    socket.emit("join_tournament", tournament.id);
    //socket.emit('current_queue',players);

  //   socket.on("initial_state", (state) => {
      
  //     if (state.msg === 0 || state.msg !== null) {
  //       setCallPlayerHook(false)
  //       setCurrentPlayerIndex(state.msg);
  //       if (state.timeLeft >= 0) setTimeLeft(state.timeLeft);
  //       setIsBiddingActive(true);
  //       setCurrentBid(players[state.msg]?.basePrice || 5000);
  //       setSelectPlayerDialog(false);
  //       //console.log("After reloading the current queue",state.currentQueue)
  //       setPlayers(state.currentQueue)
  //     //  console.log("There is the initial state",)
        

  //       if (state.bidHistory?.length > 0) {
  //         if(state.timeLeft >= 0){
  //         setBidHistory(state.bidHistory);
  //         setCurrentBid(state.bidHistory[0].amount)
  //         }
           
              
          
  //       }
  //     }
  //     else{
  //       setCallPlayerHook(true)
  //     }
      
  //       // Fetch player queue
  // // fetchPlayerQueueForAuctionHook(tournament, setPlayers,);
      
  //     if (state.End) {
  //       endBidding();
  //       state.End!=state.End
  //     }
  //   });

  socket.on("receiveTimeLeft", (serverTimeLeft) => {
  setTimeLeft(serverTimeLeft);
});

    socket.on("receive_message", (msg) => {

       console.log("Received message:", msg);
      console.log("tournamentId from server",msg.tournamentId)
      console.log("tournamentId from state",tournament?.id)
      console.log("senderId from serverrrr",msg.senderId)
      console.log("senderId from state",user.id)
    
      if(msg.tournament.id == tournament?.id ) { 
      const index=msg.message;
      setCurrentPlayerIndex(index);
      // setTimeLeft(60);
      socket.on("receiveTimeLeft", (serverTimeLeft) => {
        setTimeLeft(serverTimeLeft);
      });
      setIsBiddingActive(true);
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
      // socket.emit('current_queue',players)
      // const timer = setInterval(() => {
      //   setTimeLeft(prev => prev - 1);
      // }, 1000);
      // return () => clearInterval(timer);
    } else if (timeLeft === 0 && isBiddingActive) {
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
    //console.log("This is the tournament",tournament)

  }
  
  if (userRole === "organizer") {
    fetchCurrentTournamentHook(setTournament, undefined);
  }
  
  fetchPlayerQueueForAuctionHook(tournament,setPlayers,callPlayerHook)
 

  const handleSelectPlayer = (index) => {
    // setCurrentPlayerIndex(index);
    // setTimeLeft(60);
    // setIsBiddingActive(true);
    // setCurrentBid(players[index]?.basePrice || 5000);
    // setBidHistory([]);
    // setSelectPlayerDialog(false);
    //socket.emit("sendTimeLeft",60);
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

   

    //console.log("Before going to endBidding", bidHistory);
    
     //socket.emit("bid_history", bidHistory);
    if (userRole === "organizer" && isBiddingActive) {
      console.log("inside organizer bidder");
      socket.emit("sendIsBidEnd", {isEnd:true,tournament:tournament});
    }
  };

  // if (!tournament) {
  //   return <Box sx={{ p: 4 }}>Unfortunately you are not accepted in any tournament...</Box>;
  // }

  return (
    <Box sx={{ 
      p: 4, 
      background: '#F8FAFC',
      minHeight: '100vh'
    }}>
      <AuctionPhaseProgress 
        isBiddingActive={isBiddingActive}
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