import React from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

const COLORS = {
  accent: '#8B5CF6',
  border: '#E2E8F0',
  text: {
    title: '#312E81',
    primary: '#1E293B',
    secondary: '#64748B',
  }
};

const BidHistory = ({ history }) => (
  <Box sx={{ 
    p: 3, 
    bgcolor: 'white', 
    borderRadius: 2,
    boxShadow: 1
  }}>
    <Typography variant="h6" sx={{ color: COLORS.text.title, fontWeight: 600, mb: 3 }}>
      Bid History
    </Typography>

    {
      history==0?(
<div>
    Bid has not been started yet now
</div>
      ):(
        <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
        {history.map((bid, index) => (
          <Box 
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              mb: 1,
              borderRadius: 1,
              bgcolor: index === 0 ? alpha(COLORS.accent, 0.1) : 'transparent',
              border: `1px solid ${index === 0 ? alpha(COLORS.accent, 0.2) : COLORS.border}`,
            }}
          >
            <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
              {bid.team}
            </Typography>
            <Typography sx={{ 
              color: COLORS.accent, 
              fontWeight: 600,
              fontSize: '1.1rem'
            }}>
              ${bid.amount}
            </Typography>
            <Typography sx={{ color: COLORS.text.secondary }}>
              {bid.time}
            </Typography>
          </Box>
        ))}
      </Box>
      )
    }
   
  </Box>
);

export default BidHistory; 