"use client";
import React from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  PersonAdd,
  Groups,
  Gavel,
  CheckCircle,
  EmojiEvents,
} from '@mui/icons-material';
import { AUCTION_PHASES, COLORS, PHASE_DETAILS } from './AuctionConstants';


const getIconComponent = (iconName) => {
  switch (iconName) {
    case 'PersonAdd': return <PersonAdd />;
    case 'Groups': return <Groups />;
    case 'Gavel': return <Gavel />;
    case 'CheckCircle': return <CheckCircle />;
    case 'EmojiEvents': return <EmojiEvents />;
    default: return null;
  }
};

const AuctionPhaseProgress = ({ isBiddingActive, timeLeft,players }) => {
  if(players.length === 0){
    PHASE_DETAILS['Complete'].color=COLORS.success;
    PHASE_DETAILS['Bidding'].color=COLORS.secondary
  }
  return (
    <Box sx={{ mb: 4 }}>
      <Stepper activeStep={isBiddingActive ? 2 : 1}>
        {AUCTION_PHASES.map((phase) => (
          
          <Step key={phase}>
            <StepLabel
              StepIconProps={{
                sx: {
                  color: PHASE_DETAILS[phase].color,
                }
              }}
              icon={getIconComponent(PHASE_DETAILS[phase].icon)}
            >
              <Typography sx={{ color: PHASE_DETAILS[phase].color }}>
                {PHASE_DETAILS[phase].title}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {PHASE_DETAILS[phase].description}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {/* Phase Progress */}
      <LinearProgress 
        variant="determinate" 
        value={isBiddingActive ? (1 - timeLeft/60) * 100 : 0}
        sx={{
          mt: 2,
          height: 6,
          borderRadius: 3,
          bgcolor: alpha(PHASE_DETAILS[isBiddingActive ? 'Bidding' : 'Registration'].color, 0.1),
          '& .MuiLinearProgress-bar': {
            bgcolor: PHASE_DETAILS[isBiddingActive ? 'Bidding' : 'Registration'].color,
          }
        }}
      />
    </Box>
  );
};

export default AuctionPhaseProgress; 