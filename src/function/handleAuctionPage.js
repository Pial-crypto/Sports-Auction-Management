
import { addNewAuction } from "./addNewAuction";
import saveBidding from "./saveBidding";

export const endBidding = ({
  bidHistory,
  players,
  currentPlayerIndex,
  setPlayers,
  setSnackbar,
  userRole,socket
}) => {

  if (bidHistory.length > 0) {
    const winner = bidHistory[0];

    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex] = {
      ...updatedPlayers[currentPlayerIndex],
      status: 'sold',
      finalBid: winner.amount,
      soldTo: winner.team
    };

    // Emit updated player queue
   socket && socket.emit('current_queue', updatedPlayers);
    setPlayers(updatedPlayers);

    console.log("🏆 I am the winner:", winner);

    if (userRole === 'organizer') {
      const currentPlayer = players[currentPlayerIndex];
      const auctionData = {
        playerId: currentPlayer.playerId|| "N/A",
        tournamentId: currentPlayer.tournamentId,
        managerId: winner.managerId || "N/A",
        createdAt: new Date(),
        teamId: winner.id || "N/A",
        teamName: winner.team || "N/A",
        soldStatus: true,
        amount: winner.amount || 0,
      };

      addNewAuction(auctionData);
    }

    setSnackbar({
      open: true,
      message: `🎉 Bidding ended! ${winner.team} won with a bid of $${winner.amount}`,
      severity: 'success'
    });

  } else if (currentPlayerIndex !== null && bidHistory && bidHistory.length === 0) {
    setSnackbar({
      open: true,
      message: '⚠️ Bidding ended with no bids. Player remained unsold.',
      severity: 'info'
    });
  }
};


 export const sendMessage = (message,tournament,user,socket) => {
  socket &&  socket.emit("send_message", {message, tournament:tournament,senderId:user.id});
  };

  export const handleSelectPlayer = (index,tournament,user,socket) => {

    sendMessage(index,tournament,user,socket);

  };




export const sendBidInfo = ({
  bidAmount,
  currentBid,
  myTeam,
  setSnackbar,
  players,
  currentPlayerIndex,
  tournament,
  socket
}) => {
  console.log("Before sending bid info", myTeam);

  const bidValue = Number(bidAmount);

  if (bidValue <= currentBid) {
    setSnackbar({
      open: true,
      message: '⚠️ Bid amount must be higher than current bid',
      severity: 'error'
    });
    return;
  }

  console.log("This is my team", myTeam);

  const bidData = {
    amount: bidValue,
    team: myTeam.teamName,
    managerId: myTeam.managerId,
    teamId: myTeam.teamId,
    time: new Date().toLocaleTimeString(),
  };

  console.log("Bid Info ➤", bidData);

  saveBidding({
    teamId: myTeam.id,
    teamName: myTeam.teamName,
    amount: bidValue,
    playerId: players[currentPlayerIndex].playerId,
    tournamentId: tournament.id
  }).then((response) => {
    console.log("✅ Bidding saved successfully:", response);
  }).catch((err) => {
    console.error("❌ Failed to save bid:", err);
  });

  socket.emit("sendNewBid", {
    bidData: bidData,
    tournament: tournament
  });
};
