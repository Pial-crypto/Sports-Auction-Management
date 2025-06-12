import React from 'react';
import { 
  Box, Typography, Dialog, DialogTitle, DialogContent, 
  DialogActions, Button, alpha, Avatar, Paper 
} from '@mui/material';
import { COLORS } from './AuctionConstants';
import { PersonAdd, SportsCricket } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Close } from '@mui/icons-material';


const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const PlayerSelectionDialog = ({ open, onClose, players, handleSelectPlayer }) => {
  const availablePlayers = players.filter(p => p.status !== 'sold');

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 1,
          background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
          color: 'white',
          px: 3,
          py: 2
        }}
      >
        <PersonAdd sx={{ fontSize: 28 }} />
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: '1.25rem'
            }}
          >
            Select Player for Auction
          </Typography>
        </Box>
      </DialogTitle>

      {availablePlayers.length > 0 ? (
        <DialogContent sx={{ px: 3, py: 2,marginTop: 5 }}>
          <AnimatePresence>
            <Box sx={{ 
              maxHeight: 400, 
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: alpha(COLORS.primary, 0.1),
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: alpha(COLORS.primary, 0.3),
                borderRadius: '4px',
                '&:hover': {
                  background: alpha(COLORS.primary, 0.5),
                },
              },
            }}>
              {availablePlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={2}
                    onClick={() => handleSelectPlayer(players.findIndex(p => p.id === player.id))}
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      cursor: 'pointer',
                      border: '1px solid rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 20px rgba(33,150,243,0.15)',
                        bgcolor: alpha(COLORS.primary, 0.05),
                      }
                    }}
                  >
                    {player.image ? (
                      <motion.img 
                        src={player.image} 
                        alt={player.name}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        style={{ 
                          width: 60, 
                          height: 60, 
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: `2px solid ${alpha(COLORS.primary, 0.3)}`,
                          boxShadow: '0 0 15px rgba(33,150,243,0.2)'
                        }} 
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: alpha(COLORS.primary, 0.1),
                          color: COLORS.primary,
                          border: `2px solid ${alpha(COLORS.primary, 0.3)}`,
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                        }}
                      >
                        {getInitials(player.name)}
                      </Avatar>
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600,
                          color: COLORS.text.primary,
                          mb: 0.5
                        }}
                      >
                        {player.name}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 3,
                        alignItems: 'center' 
                      }}>
                        <Typography 
                          variant="body2" 
                          sx={{
                            color: COLORS.primary,
                            fontWeight: 500,
                            px: 1.5,
                            py: 0.5,
                            bgcolor: alpha(COLORS.primary, 0.1),
                            borderRadius: '12px',
                          }}
                        >
                          ${player.basePrice}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{
                            color: 'success.main',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                          }}
                        >
                          {player.status || 'Available'}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </AnimatePresence>
        </DialogContent>
      ) : (
        <Box sx={{ 
          p: 4, 
          textAlign: 'center', 
          color: 'error.main'
        }}>
          <SportsCricket sx={{ fontSize: 48, mb: 2, opacity: 0.7 }} />
          <Typography variant="h6">No Players Available</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            All players have been sold in the auction
          </Typography>
        </Box>
      )}

      <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          color="primary"
          startIcon={<Close />}
          sx={{
            borderRadius: 2,
            px: 3,
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlayerSelectionDialog;