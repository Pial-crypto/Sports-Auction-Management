import React from 'react';
import { Box, Button, Typography, alpha } from '@mui/material';
import { Gavel, PersonAdd, Stop } from '@mui/icons-material';
import AuctionTimer from './AuctionTimer';
import PlayerCard from './PlayerCard';
import { COLORS } from './AuctionConstants';

const CurrentAuctionSection = ({ 
  isBiddingActive, 
  timeLeft, 
  currentPlayerIndex, 
  players, 
  userRole, 
  handleBidDialog,
  handleSelectPlayerDialog,
  handleEndBidding
}) => {
  return (
    <Box sx={{ 
      p: 3, 
      bgcolor: 'white', 
      borderRadius: 2,
      boxShadow: 1
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        {isBiddingActive ? (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <AuctionTimer timeLeft={timeLeft} maxTime={60} />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {timeLeft}s remaining
              </Typography>
            </Box>
            <Box>
              {userRole === "manager" && (
                <Button
                  variant="contained"
                  startIcon={<Gavel />}
                  onClick={handleBidDialog}
                  sx={{ mr: 1 }}
                >
                  Place Bid
                </Button>
              )}
              {/* {userRole === "organizer" && (
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<Stop />}
                  onClick={handleEndBidding}
                >
                  End Bidding
                </Button>
              )} */}
            </Box>
          </>
        ) : (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {userRole === "organizer" && (
              <Button
                variant="contained"
                size="large"
                color="secondary"
                startIcon={<PersonAdd sx={{ fontSize: 24 }} />}
                onClick={handleSelectPlayerDialog}
                sx={{ 
                  px: 6, 
                  py: 2,
                  fontSize: '1.2rem',
                  background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
                  boxShadow: '0 8px 16px -3px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    background: `linear-gradient(135deg, ${COLORS.primary} 30%, ${COLORS.accent} 100%)`,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 20px -3px rgba(0, 0, 0, 0.2)',
                  }
                }}
              >
                CALL PLAYER FOR AUCTION
              </Button>
            )}
          </Box>
        )}
      </Box>
      
      {currentPlayerIndex !== null && <PlayerCard player={players[currentPlayerIndex]} />}
      
      {/* No player selected message */}
      {currentPlayerIndex === null && (
        <Box sx={{ 
          p: 5, 
          textAlign: 'center', 
          color: COLORS.text.secondary,
          border: `1px dashed ${COLORS.border}`,
          borderRadius: 2,
          bgcolor: alpha(COLORS.primary, 0.02)
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: COLORS.text.primary }}>
            No Player Selected
          </Typography>
          <Typography variant="body1">
            {userRole === "organizer" 
              ? "Click the 'CALL PLAYER FOR AUCTION' button to select a player." 
              : "Waiting for tournament organizer to select a player."}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CurrentAuctionSection; 