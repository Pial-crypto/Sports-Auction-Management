"use client";

import React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import {
  AddCircle,
} from '@mui/icons-material';
import { COLORS } from '@/style/Matches';

export const Header = ({ handleCreateMatch }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        p: 2,
        borderRadius: 2,
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Typography 
        variant="h3" 
        sx={{
          fontWeight: 800,
          background: `linear-gradient(45deg, ${COLORS.primary.main}, ${COLORS.secondary.main})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          letterSpacing: '-0.5px',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -4,
            left: 0,
            width: '60px',
            height: '4px',
            background: `linear-gradient(90deg, ${COLORS.secondary.main}, transparent)`,
            borderRadius: '2px',
          }
        }}
      >
        Tournament Matches
      </Typography>

      <Button
        variant="contained"
        startIcon={
          <AddCircle 
            sx={{ 
              animation: 'pulse 1.5s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.1)' },
                '100%': { transform: 'scale(1)' },
              }
            }} 
          />
        }
        onClick={handleCreateMatch}
        sx={{
          borderRadius: 2,
          padding: '10px 24px',
          background: `linear-gradient(45deg, ${COLORS.secondary.main}, ${COLORS.secondary.light})`,
          boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
          border: `1px solid ${COLORS.secondary.light}`,
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(52, 152, 219, 0.4)',
            background: `linear-gradient(45deg, ${COLORS.secondary.light}, ${COLORS.secondary.main})`,
          },
        }}
      >
        Create New Match
      </Button>
    </Box>
  );
};