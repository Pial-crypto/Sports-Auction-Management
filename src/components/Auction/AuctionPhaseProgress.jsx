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

const AuctionPhaseProgress = ({ isBiddingActive, timeLeft, players, activePhase }) => {
  // Get current phase color based on index
  const getPhaseColor = (phaseIndex) => {
    if (phaseIndex < activePhase) {
      return COLORS.success; // completed phases in green
    } else if (phaseIndex === activePhase) {
      return COLORS.primary; // active phase in blue
    }
    return COLORS.secondary; // upcoming phases in gray
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Stepper activeStep={activePhase}>
        {AUCTION_PHASES.map((phase, index) => (
          <Step key={phase}>
            <StepLabel
              StepIconProps={{
                sx: {
                  color: getPhaseColor(index)
                }
              }}
              icon={getIconComponent(PHASE_DETAILS[phase].icon)}
            >
              <Typography sx={{ 
                color: getPhaseColor(index),
                fontWeight: activePhase === index ? 600 : 400 
              }}>
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
          bgcolor: alpha(COLORS.success, 0.1),
          '& .MuiLinearProgress-bar': {
            bgcolor: COLORS.success
          }
        }}
      />
    </Box>
  );
};

export default AuctionPhaseProgress;