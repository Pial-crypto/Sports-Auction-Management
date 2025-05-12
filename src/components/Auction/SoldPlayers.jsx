import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { COLORS } from './AuctionConstants';

const SoldPlayers = ({ players }) => {
  const soldPlayers = players.filter(p => p.status === 'sold');

  return (
    <Box>
      <Typography variant="h6" sx={{ 
        mb: 2, 
        fontWeight: 'bold', 
        display: 'flex', 
        alignItems: 'center',
        color: COLORS.success
      }}>
        <CheckCircle sx={{ mr: 1 }} /> Sold Players
      </Typography>
      <Box sx={{ 
        maxHeight: 300, 
        overflow: 'auto',
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: 1,
        p: 2
      }}>
        {soldPlayers.length > 0 ? (
          soldPlayers.map((player) => (
            <Box
              key={player.id}
              sx={{
                p: 2,
                mb: 1,
                borderRadius: 1,
                bgcolor: alpha(COLORS.success, 0.05),
                border: `1px solid ${alpha(COLORS.success, 0.3)}`,
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
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2">{player.name}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    Sold for: ${player.finalBid}
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    bgcolor: COLORS.primary,
                    color: 'white',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.65rem'
                  }}>
                    {player.soldTo}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Box sx={{ p: 3, textAlign: 'center', color: COLORS.text.secondary }}>
            <Typography variant="body2">No players sold yet</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SoldPlayers; 