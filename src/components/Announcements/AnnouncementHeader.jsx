import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const AnnouncementHeader = ({ onCreateClick,editPermission }) => {
  console.log(editPermission,"editPermission")
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      mb: 3,
      background: 'rgba(255, 255, 255, 0.8)',
      padding: '20px',
      borderRadius: '12px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <Typography 
        variant="h4" 
        sx={{
          fontWeight: 800,
          fontSize: '2.5rem',
          background: 'linear-gradient(45deg, #1e40af, #3b82f6)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          letterSpacing: '-0.02em',
        }}
      >
        Announcements
      </Typography>
      {editPermission && <Button
        variant="contained"
        startIcon={<Add />}
        onClick={onCreateClick}
        disabled={!editPermission}
        sx={{
          borderRadius: '12px',
          background: 'linear-gradient(45deg, #2563eb, #3b82f6)',
          boxShadow: '0 4px 15px rgba(37, 99, 235, 0.2)',
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
          '&:hover': {
            background: 'linear-gradient(45deg, #1d4ed8, #2563eb)',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(37, 99, 235, 0.3)',
          },
        }}
      >
        New Announcement
      </Button>}
    </Box>
  );
};

export default AnnouncementHeader; 