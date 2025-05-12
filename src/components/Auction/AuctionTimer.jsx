import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const COLORS = {
  error: '#EF4444',
  accent: '#8B5CF6',
  text: {
    primary: '#1E293B',
  }
};

const AuctionTimer = ({ timeLeft, maxTime }) => (
  <Box sx={{ 
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center'
  }}>
    <CircularProgress
      variant="determinate"
      value={(timeLeft / maxTime) * 100}
      size={120}
      thickness={4}
      sx={{
        color: timeLeft < 60 ? COLORS.error : COLORS.accent,
        '& .MuiCircularProgress-circle': {
          strokeLinecap: 'round',
        },
      }}
    />
    <Box sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Typography
        variant="h3"
        sx={{
          color: timeLeft < 60 ? COLORS.error : COLORS.text.primary,
          fontWeight: 700,
        }}
      >
        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </Typography>
    </Box>
  </Box>
);

export default AuctionTimer; 