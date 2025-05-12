import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { alpha } from '@mui/material/styles';

const COLORS = {
  primary: '#4F46E5',
  border: '#E2E8F0',
  text: {
    secondary: '#64748B',
  }
};

const PlayerQueue = ({ players, currentPlayerIndex, onPlayerSelect }) => (
  <Box sx={{ 
    p: 3, 
    bgcolor: 'white', 
    borderRadius: 2,
    boxShadow: 1
  }}>
    <Typography variant="h6" sx={{ mb: 2 }}>Player Queue</Typography>
    <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
      {players.map((player, index) => (
        <Box
          key={player.id}
          onClick={() => onPlayerSelect && onPlayerSelect(index)}
          sx={{
            p: 2,
            mb: 1,
            borderRadius: 1,
            bgcolor: currentPlayerIndex === index ? alpha(COLORS.primary, 0.1) : 'transparent',
            border: `1px solid ${COLORS.border}`,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            cursor: onPlayerSelect ? 'pointer' : 'default',
            transition: 'all 0.2s ease',
            '&:hover': onPlayerSelect ? {
              bgcolor: alpha(COLORS.primary, 0.05),
              transform: 'translateX(5px)'
            } : {}
          }}
        >
          <Avatar src={player.image} />
          <Box>
            <Typography variant="subtitle1">{player.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              Base Price: ${player.basePrice}
            </Typography>
          </Box>
          {player.status && (
            <Typography 
              variant="caption" 
              sx={{ 
                ml: 'auto',
                color: player.status === 'sold' ? 'success.main' : 'text.secondary',
                fontWeight: 500
              }}
            >
              {player.status.toUpperCase()}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  </Box>
);

export default PlayerQueue; 