import React from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, alpha } from '@mui/material';
import { COLORS } from './AuctionConstants';
import { red } from '@mui/material/colors';

const PlayerSelectionDialog = ({ open, onClose, players, handleSelectPlayer }) => {
  const availablePlayers = players.filter(p => p.status !== 'sold');

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Select Player for Auction</DialogTitle>
      {availablePlayers.length!=0?(
      <DialogContent>
        <Box sx={{ maxHeight: 400, overflow: 'auto', mt: 2 }}>
          {availablePlayers.map((player) => (
            <Box
              key={player.id}
              onClick={() => handleSelectPlayer(players.findIndex(p => p.id === player.id))}
              sx={{
                p: 2,
                mb: 1,
                borderRadius: 1,
                bgcolor: 'transparent',
                border: `1px solid ${COLORS.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: alpha(COLORS.primary, 0.05),
                }
              }}
            >
              <img 
                src={player.image} 
                alt={player.name} 
                style={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} 
              />
              <Box>
                <Typography variant="h6">{player.name}</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Base Price: ${player.basePrice}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {player.status || 'Available'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </DialogContent>):
      (
      
        <Box sx={{ p: 3, textAlign: 'center', color: red[500] }}>
        <Typography variant="body2">No players in queue</Typography>
      </Box>
       
      )
}
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlayerSelectionDialog; 