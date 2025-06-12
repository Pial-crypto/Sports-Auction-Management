import React from 'react';
import { Box, Typography, alpha, Avatar, Paper } from '@mui/material';
import { CheckCircle, Groups } from '@mui/icons-material';
import { COLORS } from './AuctionConstants';
import { motion } from 'framer-motion';

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const SoldPlayers = ({ players }) => {
  const soldPlayers = players.filter(p => p.status === 'sold');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={3}
        sx={{
          bgcolor: 'white',
          borderRadius: 3,
          p: 3,
          mb: 3
        }}
      >
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
          borderRadius: 2,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: alpha(COLORS.success, 0.1),
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: alpha(COLORS.success, 0.2),
            borderRadius: '4px',
            '&:hover': {
              background: alpha(COLORS.success, 0.3),
            },
          },
        }}>
          {soldPlayers.length > 0 ? (
            soldPlayers.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 1,
                    bgcolor: alpha(COLORS.success, 0.05),
                    border: `1px solid ${alpha(COLORS.success, 0.3)}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  {player.image ? (
                    <motion.img 
                      src={player.image} 
                      alt={player.name}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      style={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: `1px solid ${alpha(COLORS.success, 0.3)}`
                      }} 
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: alpha(COLORS.success, 0.1),
                        color: COLORS.success,
                        border: `1px solid ${alpha(COLORS.success, 0.3)}`,
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {getInitials(player.name)}
                    </Avatar>
                  )}
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
                </Paper>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ 
                p: 3, 
                textAlign: 'center', 
                color: COLORS.text.secondary,
                border: `2px dashed ${alpha(COLORS.success, 0.2)}`,
                borderRadius: 2,
              }}>
                <Groups sx={{ fontSize: '2rem', mb: 1, opacity: 0.5 }} />
                <Typography variant="body2">No players sold yet</Typography>
              </Box>
            </motion.div>
          )}
        </Box>
      </Paper>
    </motion.div>
  );
};

export default SoldPlayers;