import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import { Groups } from '@mui/icons-material';
import { COLORS } from './AuctionConstants';

const AvailablePlayerQueue = ({ players, currentPlayerIndex }) => {
  const availablePlayers = players.filter(p => p.status !== 'sold');

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
        <Groups sx={{ mr: 1 }} /> Player Queue
      </Typography>
      <Box sx={{ 
        maxHeight: 300, 
        overflow: 'auto',
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: 1,
        p: 2
      }}>
        {availablePlayers.length > 0 ? (
          availablePlayers.map((player) => (
            <Box
              key={player.id}
              sx={{
                p: 2,
                mb: 1,
                borderRadius: 1,
                bgcolor: currentPlayerIndex !== null && players[currentPlayerIndex].id === player.id 
                  ? alpha(COLORS.primary, 0.1) 
                  : 'transparent',
                border: `1px solid ${COLORS.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <img 
                src={player.image} 
                alt={player.name} 
                style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} 
              />
              <Box>
                <Typography variant="subtitle2">{player.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Base Price: ${player.basePrice || 0}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Box sx={{ p: 3, textAlign: 'center', color: COLORS.text.secondary }}>
            <Typography variant="body2">No players in queue</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AvailablePlayerQueue; 