"use client"

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Rating,
  Avatar,
  Tooltip,
  CircularProgress,
  Chip,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  SportsSoccer,
  Timeline,
  TrendingUp,
  Speed,
  FitnessCenter,
  Psychology,
  Groups,
  EmojiEvents,
  Analytics,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// স্টাইলড কম্পোনেন্টস
const GlassCard = styled(motion.div)(({ theme }) => ({
  background: alpha('#1e293b', 0.9),
  borderRadius: 24,
  padding: theme.spacing(3),
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
}));

const PlayerCard = styled(GlassCard)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
});

const StatBadge = styled(Box)(({ value }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  width: 45,
  height: 45,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `conic-gradient(#3b82f6 ${value}%, transparent ${value}%)`,
  color: 'white',
  fontWeight: 'bold',
}));

const AIRecommendations = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const players = [
    {
      id: 1,
      name: 'Kade Bastion',
      position: 'Forward',
      rating: 4.5,
      aiScore: 150,
      stats: {
        pace: 88,
        shooting: 92,
        passing: 85,
        dribbling: 89,
        defending: 45,
        physical: 78,
      },
      form: 'Excellent',
      matchFit: 95,
      teamChemistry: 88,
      recentPerformance: [8.5, 9.0, 8.7, 9.2],
      marketValue: '£60M',
      aiConfidence: 96,
    },
    // Add more players...
  ];

  const aiMetrics = [
    { icon: <Speed />, label: 'Performance Speed', value: 92 },
    { icon: <FitnessCenter />, label: 'Physical Condition', value: 88 },
    { icon: <Psychology />, label: 'Mental Strength', value: 85 },
    { icon: <Groups />, label: 'Team Chemistry', value: 90 },
  ];

  return (
    <Box sx={{ p: 4, background: '#0f172a', minHeight: '100vh' }}>
      {/* Header with AI Status */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4 
      }}>
        <Box>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
            AI-Based Recommendations
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#94a3b8' }}>
            Advanced player analysis powered by machine learning
          </Typography>
        </Box>
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <Chip
            icon={<Analytics />}
            label="AI Active"
            color="primary"
            sx={{ bgcolor: alpha('#3b82f6', 0.2) }}
          />
          <CircularProgress size={24} />
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* AI Insights Panel */}
        <Grid item xs={12} md={4}>
          <GlassCard
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
              AI Performance Metrics
            </Typography>
            
            {aiMetrics.map((metric, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 3,
                  gap: 2,
                }}
              >
                <Box sx={{
                  p: 1,
                  borderRadius: '50%',
                  bgcolor: alpha('#3b82f6', 0.2),
                }}>
                  {metric.icon}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    {metric.label}
                  </Typography>
                  <Box sx={{
                    mt: 1,
                    height: 4,
                    bgcolor: alpha('#3b82f6', 0.2),
                    borderRadius: 2,
                  }}>
                    <Box
                      sx={{
                        width: `${metric.value}%`,
                        height: '100%',
                        bgcolor: '#3b82f6',
                        borderRadius: 2,
                        transition: 'width 1s ease-in-out',
                      }}
                    />
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  {metric.value}%
                </Typography>
              </Box>
            ))}
          </GlassCard>
        </Grid>

        {/* Player Recommendations */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {players.map((player) => (
              <Grid item xs={12} md={6} key={player.id}>
                <PlayerCard
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <StatBadge value={player.aiConfidence}>
                    {player.aiConfidence}
                  </StatBadge>
                  
                  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Avatar
                      src={`/players/${player.id}.jpg`}
                      sx={{ width: 80, height: 80 }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ color: 'white' }}>
                        {player.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                        {player.position}
                      </Typography>
                      <Rating value={player.rating} readOnly size="small" />
                    </Box>
                  </Box>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {Object.entries(player.stats).map(([stat, value]) => (
                      <Grid item xs={4} key={stat}>
                        <Tooltip title={stat.toUpperCase()}>
                          <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress
                              variant="determinate"
                              value={value}
                              size={40}
                              thickness={4}
                              sx={{
                                color: '#3b82f6',
                                '& .MuiCircularProgress-circle': {
                                  strokeLinecap: 'round',
                                },
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{ color: '#94a3b8', display: 'block' }}
                            >
                              {stat}
                            </Typography>
                          </Box>
                        </Tooltip>
                      </Grid>
                    ))}
                  </Grid>

                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Analytics />}
                      sx={{
                        background: 'linear-gradient(45deg, #3b82f6 30%, #60a5fa 90%)',
                        borderRadius: 2,
                      }}
                    >
                      View Full Analysis
                    </Button>
                  </Box>
                </PlayerCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AIRecommendations;