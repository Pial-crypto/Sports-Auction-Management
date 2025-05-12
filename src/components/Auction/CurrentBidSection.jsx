import React from 'react';
import { Box, Typography } from '@mui/material';
import { COLORS } from './AuctionConstants';

const CurrentBidSection = ({ currentBid, bidHistory, currentPlayerIndex }) => {
  return (
    <Box sx={{ 
      p: 3, 
      bgcolor: 'white', 
      borderRadius: 2,
      boxShadow: 1
    }}>
      <Typography variant="h6" gutterBottom>Current Bid</Typography>
      <Typography variant="h2" sx={{ color: COLORS.primary }}>
        ${currentPlayerIndex !== null ? currentBid : 0}
      </Typography>
      <Typography color="text.secondary">
        Highest Bidder: {bidHistory.length > 0 ? bidHistory[0].team : 'None'}
      </Typography>
    </Box>
  );
};

export default CurrentBidSection; 