import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

export const LoadingState = ({ message }) => (
  <Grid item xs={12}>
    <Box sx={{ 
      p: 4, 
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '12px',
    }}>
      <Typography>{message}</Typography>
    </Box>
  </Grid>
);

export const ErrorState = ({ message }) => (
  <Grid item xs={12}>
    <Box sx={{ 
      p: 4, 
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '12px',
      color: 'error.main',
    }}>
      <Typography>{message}</Typography>
    </Box>
  </Grid>
); 