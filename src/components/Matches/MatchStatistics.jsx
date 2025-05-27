import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Avatar,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  SportsCricket,
  EmojiEvents,
  TrendingUp,
  Assessment,
} from '@mui/icons-material';
import { COLORS } from '@/style/Matches';
import { getAvgScore, getDrawRate, getHighestScore } from '@/function/handleMatchesPage';



export const MatchStatistics = ({matches,tournament}) =>{




  const stats = [
  { 
    label: 'Total Matches', 
    value: matches.length, 
    icon: <SportsCricket />, 
    color: COLORS.secondary.main,
    gradient: `linear-gradient(135deg, ${COLORS.secondary.light}, ${COLORS.secondary.main})`
  },
  { 
    label: 'Draw Rate', 
    value: getDrawRate(matches) + '%', 
    icon: <TrendingUp />, 
    color: COLORS.success.main,
    gradient: `linear-gradient(135deg, ${COLORS.success.light}, ${COLORS.success.main})`
  },
  { 
    label:  tournament?.gameType.toLowerCase()=='cricket' ? 'Avg. Score': 'Avg. Goals',
    value: getAvgScore (matches,tournament),
    icon: <Assessment />, 
    color: COLORS.warning.main,
    gradient: `linear-gradient(135deg, ${COLORS.warning.light}, ${COLORS.warning.main})`
  },
  { 
    label: 'Highest Score', 
    value: getHighestScore(matches,tournament), 
    icon: <EmojiEvents />, 
    color: COLORS.error.main,
    gradient: `linear-gradient(135deg, ${COLORS.error.light}, ${COLORS.error.main})`
  },
];
  
  return(




  
  <Grid container spacing={3} sx={{ mb: 4 }}>
    {stats.map((stat, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            transition: 'all 0.3s ease',
            border: `1px solid ${alpha(stat.color, 0.1)}`,
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: `0 8px 25px ${alpha(stat.color, 0.15)}`,
              background: 'rgba(255, 255, 255, 0.95)',
            }
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              background: stat.gradient,
              boxShadow: `0 4px 10px ${alpha(stat.color, 0.3)}`,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.05)' },
                '100%': { transform: 'scale(1)' },
              }
            }}
          >
            {stat.icon}
          </Avatar>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                background: stat.gradient,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 0.5
              }}
            >
              {stat.value}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: COLORS.primary.main,
                fontWeight: 500,
                opacity: 0.8,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        </Box>
      </Grid>
    ))}
  </Grid>
);


}