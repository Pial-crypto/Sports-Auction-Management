import { useEffect } from "react";

//export let socket; // Exporting socket

const useSocketHook = ({
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
}) => {
  useEffect(() => {
    if (!tournament || !user || players.length === 0) return;

   // socket = io("http://localhost:3001"); // initialize
    socket.emit("join_tournament", tournament.id);

    const playersObj = {
      players: players,
      tournamentId: tournament.id,
    };
  socket &&  socket.emit("players", playersObj);

    console.log("This is the players in the auction main component", players);

    socket.on("receiveTimeLeft", (serverTimeLeft) => {
      setTimeLeft(serverTimeLeft);
    });

    socket.on("receive_message", (msg) => {
      if (msg.tournament.id === tournament?.id) {
        const index = msg.message;
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
      if (tournament.id === End.tournament.id && End.isEnd) {
        endBidding();
      }
    });

    socket.on("receiveNewBid", (bidData) => {
      if (bidData.tournament.id === tournament.id) {
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

    return () => {
      socket.disconnect();
    };
  }, [tournament, players]);
};

export default useSocketHook;
