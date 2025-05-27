"use client";

import React from 'react';
import {
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import {
  SportsCricket,
  Schedule,
  EmojiEvents,
} from '@mui/icons-material';
import { COLORS } from '@/style/Matches';

export const MatchTab = ({ handleTabChange, tabValue }) => {
  return (
    <Box sx={{
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 2,
      p: 1,
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: COLORS.secondary.main,
            height: 3,
            borderRadius: '3px 3px 0 0',
          },
          '& .MuiTab-root': {
            minHeight: 60,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            color: COLORS.primary.main,
            opacity: 0.7,
            transition: 'all 0.3s ease',
            '&:hover': {
              color: COLORS.secondary.main,
              opacity: 0.9,
            },
            '&.Mui-selected': {
              color: COLORS.secondary.main,
              opacity: 1,
            },
            '& .MuiSvgIcon-root': {
              fontSize: '1.5rem',
              marginRight: 1,
              transition: 'transform 0.3s ease',
            },
            '&:hover .MuiSvgIcon-root': {
              transform: 'scale(1.1)',
            },
          },
        }}
      >
        <Tab 
          label="Live Matches" 
          icon={<SportsCricket sx={{ color: COLORS.success.main }} />} 
          iconPosition="start"
        />
        <Tab 
          label="Upcoming" 
          icon={<Schedule sx={{ color: COLORS.warning.main }} />} 
          iconPosition="start"
        />
        <Tab 
          label="Completed" 
          icon={<EmojiEvents sx={{ color: COLORS.secondary.main }} />} 
          iconPosition="start"
        />
      </Tabs>
    </Box>
  );
};