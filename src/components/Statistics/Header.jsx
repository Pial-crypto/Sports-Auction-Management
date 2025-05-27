import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  CardContent,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';


export const Header=()=>{
        return( <Typography 
        variant="h3" 
        gutterBottom 
        sx={{
          fontWeight: 800,
          mb: 4,
          background: 'linear-gradient(45deg, #fff, #64b5f6)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Tournament Insights
      </Typography>
        )
}