"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Typography,
} from '@mui/material';
import { Gavel, PersonAdd, Assessment, EmojiEvents, InfoIcon, Star } from '@mui/icons-material';
import AuctionTimer from './AuctionTimer';
import PlayerCard from './PlayerCard';
import BidHistory from './BidHistory';
import PlayerQueue from './PlayerQueue';
import { DUMMY_PLAYERS } from './mockData';

const ROLES = {
  PLAYER: 'player',
  TEAM_MANAGER: 'team_manager',
  TOURNAMENT_MANAGER: 'tournament_manager'
};

const COLORS = {
  background: '#F8FAFC',
  primary: '#4F46E5',
};

const AuctionDashboard = () => {
  const [userRole, setUserRole] = useState(ROLES.TEAM_MANAGER);
  const [currentBid, setCurrentBid] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [bidDialog, setBidDialog] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isBiddingActive, setIsBiddingActive] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [players, setPlayers] = useState(DUMMY_PLAYERS);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Timer effect
  useEffect(() => {
    if (isBiddingActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isBiddingActive) {
      // End bidding when time runs out
      endBidding();
    }
  }, [timeLeft, isBiddingActive]);

  const startBidding = (playerIndex) => {
    setCurrentPlayerIndex(playerIndex);
    setTimeLeft(300); // Reset to 5 minutes
    setIsBiddingActive(true);
    setCurrentBid(players[playerIndex].basePrice);
    setBidHistory([]);
    setBidDialog(false);
  };

  const endBidding = () => {
    setIsBiddingActive(false);
    if (bidHistory.length > 0) {
      const winner = bidHistory[0];
      setSnackbar({
        open: true,
        message: `Bidding ended! ${winner.team} won with a bid of $${winner.amount}`,
        severity: 'success'
      });
      
      // Update player status
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex] = {
        ...updatedPlayers[currentPlayerIndex],
        status: 'sold',
        soldTo: winner.team,
        finalBid: winner.amount
      };
      setPlayers(updatedPlayers);
    }
  };

  const handleBid = () => {
    if (userRole !== ROLES.TEAM_MANAGER) {
      setSnackbar({
        open: true,
        message: 'Only Team Managers can place bids',
        severity: 'error'
      });
      return;
    }

    const bidValue = Number(bidAmount);
    if (bidValue <= currentBid) {
      setSnackbar({
        open: true,
        message: 'Bid amount must be higher than current bid',
        severity: 'error'
      });
      return;
    }

    setCurrentBid(bidValue);
    setBidHistory([
      { team: 'Your Team', amount: bidValue, time: new Date().toLocaleTimeString() },
      ...bidHistory
    ]);
    setBidDialog(false);
    setSnackbar({
      open: true,
      message: 'Bid placed successfully!',
      severity: 'success'
    });
  };

  return (
    <Box sx={{ 
      p: 4, 
      background: COLORS.background,
      minHeight: '100vh'
    }}>
      <Grid container spacing={3}>
        {/* Left Section - Player Queue */}
        <Grid item xs={12} md={3}>
          <PlayerQueue 
            players={players}
            currentPlayerIndex={currentPlayerIndex}
            onPlayerSelect={userRole === ROLES.TOURNAMENT_MANAGER ? startBidding : undefined}
          />
        </Grid>

        {/* Center Section - Current Player */}
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            p: 3, 
            bgcolor: 'white', 
            borderRadius: 2,
            boxShadow: 1
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              {isBiddingActive && <AuctionTimer timeLeft={timeLeft} maxTime={300} />}
              {userRole === ROLES.TEAM_MANAGER && isBiddingActive && (
                <Button
                  variant="contained"
                  startIcon={<Gavel />}
                  onClick={() => setBidDialog(true)}
                >
                  Place Bid
                </Button>
              )}
              {userRole === ROLES.TOURNAMENT_MANAGER && !isBiddingActive && (
                <Button
                  variant="contained"
                  startIcon={<PersonAdd />}
                  onClick={() => setBidDialog(true)}
                >
                  Select Player
                </Button>
              )}
            </Box>
            
            {currentPlayerIndex !== null && (
              <PlayerCard player={players[currentPlayerIndex]} />
            )}
          </Box>
        </Grid>

        {/* Right Section - Bidding Info */}
        <Grid item xs={12} md={3}>
          <Grid container spacing={2}>
            {isBiddingActive && (
              <Grid item xs={12}>
                <Box sx={{ 
                  p: 3, 
                  bgcolor: 'white', 
                  borderRadius: 2,
                  boxShadow: 1
                }}>
                  <Typography variant="h6" gutterBottom>Current Bid</Typography>
                  <Typography variant="h2" sx={{ color: COLORS.primary }}>
                    ${currentBid}
                  </Typography>
                  {bidHistory[0] && (
                    <Typography color="text.secondary">
                      Highest Bidder: {bidHistory[0].team}
                    </Typography>
                  )}
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <BidHistory history={bidHistory} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Bid Dialog */}
      <Dialog open={bidDialog} onClose={() => setBidDialog(false)}>
        <DialogTitle>
          {userRole === ROLES.TOURNAMENT_MANAGER ? 'Select Next Player' : 'Place Your Bid'}
        </DialogTitle>
        <DialogContent>
          {userRole === ROLES.TOURNAMENT_MANAGER ? (
            <PlayerQueue 
              players={players.filter(p => !p.status || p.status === 'pending')}
              currentPlayerIndex={currentPlayerIndex}
              onPlayerSelect={startBidding}
            />
          ) : (
            <TextField
              autoFocus
              margin="dense"
              label="Bid Amount"
              type="number"
              fullWidth
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBidDialog(false)}>Cancel</Button>
          {userRole === ROLES.TEAM_MANAGER && (
            <Button onClick={handleBid} variant="contained">
              Confirm Bid
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
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

export default AuctionDashboard; 