import React from 'react';
import { Box, Typography, alpha, Avatar, Paper } from '@mui/material';
import { Groups, PersonOutline } from '@mui/icons-material';
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

const AvailablePlayerQueue = ({ players, currentPlayerIndex }) => {
  const availablePlayers = players.filter(p => p.status !== 'sold');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={3}
        sx={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          p: 3,
          mb: 3,
          border: '1px solid rgba(255,255,255,0.18)',
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 3, 
            fontWeight: 'bold', 
            display: 'flex', 
            alignItems: 'center',
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 20px rgba(33,150,243,0.3)',
          }}
        >
          <Groups sx={{ 
            mr: 1,
            fontSize: '2rem',
            filter: 'drop-shadow(0 0 8px rgba(33,150,243,0.5))'
          }} /> 
          Player Queue
        </Typography>

        <Box sx={{ 
          maxHeight: 400, 
          overflow: 'auto',
          borderRadius: 2,
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
          {availablePlayers.length > 0 ? (
            availablePlayers.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    background: currentPlayerIndex !== null && players[currentPlayerIndex].id === player.id 
                      ? 'linear-gradient(135deg, rgba(33,150,243,0.15) 0%, rgba(33,203,243,0.15) 100%)'
                      : 'rgba(255,255,255,0.95)',
                    border: currentPlayerIndex !== null && players[currentPlayerIndex].id === player.id 
                      ? '1px solid rgba(33,150,243,0.3)'
                      : '1px solid rgba(0,0,0,0.1)',
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
                        width: 50, 
                        height: 50, 
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid rgba(33,150,243,0.3)',
                        boxShadow: '0 0 15px rgba(33,150,243,0.2)'
                      }} 
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        bgcolor: `${COLORS.primary}15`,
                        color: COLORS.primary,
                        border: '2px solid rgba(33,150,243,0.3)',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, rgba(33,150,243,0.2) 0%, rgba(33,203,243,0.2) 100%)',
                        boxShadow: '0 0 15px rgba(33,150,243,0.1)',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          transition: 'transform 0.2s ease-in-out',
                        }
                      }}
                    >
                      {getInitials(player.name)}
                    </Avatar>
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600,
                        color: COLORS.text.primary,
                      }}
                    >
                      {player.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: alpha(COLORS.text.secondary, 0.8),
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      Base Price: 
                      <span style={{ 
                        color: COLORS.primary,
                        fontWeight: 600 
                      }}>
                        ${player.basePrice || 0}
                      </span>
                    </Typography>
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
              <Box 
                sx={{ 
                  p: 4, 
                  textAlign: 'center', 
                  color: alpha(COLORS.text.secondary, 0.7),
                  border: '2px dashed rgba(0,0,0,0.1)',
                  borderRadius: 2,
                }}
              >
                <Groups sx={{ fontSize: '3rem', mb: 1, opacity: 0.5 }} />
                <Typography variant="body1">No players in queue</Typography>
              </Box>
            </motion.div>
          )}
        </Box>
      </Paper>
    </motion.div>
  );
};

export default AvailablePlayerQueue;