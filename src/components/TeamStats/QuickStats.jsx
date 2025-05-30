

import React, {  } from 'react';
import { StatCard } from '@/style/TeamStat';
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Avatar,
  Zoom,
  LinearProgress,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  TrendingUp,
  Stars,
  ShowChart,
  DonutLarge,
} from '@mui/icons-material';
import { GlassCard } from '@/style/TeamStat';

export const QuickStats=({teamStats,totalPointsAvailable,ptsArray,matches,ranking,loading})=>(
    <Grid container spacing={3} sx={{ mb: 4 }}>
  {[
    { 
      title: 'Win Rate',
      value: `${teamStats.overview.winRate}%`,
      progress: teamStats.overview.winRate, // Percentage already
      icon: <TrendingUp />,
      color: '#2196f3',
    },
    {
      title: 'Current Streak',
      value: `${teamStats.overview.currentStreak} Wins`,
      // Progress relative to total matches played
      progress: (teamStats.overview.currentStreak * 100) / matches.length,
      icon: <ShowChart />,
      color: '#4caf50',
    },
    {
      title: 'Ranking',
      value: `#${teamStats.overview.ranking}`,
      // Inverse progress - lower rank is better (assuming 10 teams total)
      progress: (ranking*100/ptsArray.length),
      icon: <Stars />,
      color: '#ff9800',
    },
    {
      title: 'Total Points',
      value: teamStats.overview.totalPoints,
      // Progress relative to highest points in the tournament
      progress: (teamStats.overview.totalPoints * 100) / totalPointsAvailable,
      icon: <DonutLarge />,
      color: '#e91e63',
    },
  ].map((stat, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Zoom in={!loading} timeout={500 + (index * 100)}>
        <StatCard color={stat.color}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: alpha(stat.color, 0.2), mr: 2 }}>
                {stat.icon}
              </Avatar>
              <Typography variant="h6">{stat.title}</Typography>
            </Box>
            <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
              {stat.value}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={stat.progress} // Using individual progress values
              sx={{ 
                height: 6, 
                borderRadius: 3,
                bgcolor: alpha('#fff', 0.1),
                '& .MuiLinearProgress-bar': {
                  bgcolor: stat.color,
                },
              }} 
            />
          </CardContent>
        </StatCard>
      </Zoom>
    </Grid>
  ))}
</Grid>
)