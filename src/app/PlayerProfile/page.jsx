"use client"

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Grid,
  IconButton,
  LinearProgress,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Help,
  ArrowForward,
  SportsSoccer,
  EmojiEvents,
} from '@mui/icons-material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from 'recharts';

// স্টাইলড কম্পোনেন্টস
const DarkCard = styled(Box)(({ theme }) => ({
  background: '#1a2233',
  borderRadius: 24,
  padding: theme.spacing(3),
  color: 'white',
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
}));

const StatBox = styled(Box)(({ theme }) => ({
  background: alpha(theme.palette.primary.main, 0.1),
  borderRadius: 16,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const PlayerProfile = () => {
  // মক ডাটা
  const performanceData = [
    { month: 'Jan', goals: 5, assists: 3, rating: 8.5 },
    { month: 'Feb', goals: 7, assists: 4, rating: 8.8 },
    { month: 'Mar', goals: 4, assists: 6, rating: 8.2 },
    { month: 'Apr', goals: 8, assists: 5, rating: 9.0 },
    { month: 'May', goals: 6, assists: 7, rating: 8.7 },
    { month: 'Jun', goals: 9, assists: 4, rating: 9.2 },
  ];

  const pieData = [
    { name: 'Goals', value: 30, color: '#06b6d4' },
    { name: 'Assists', value: 25, color: '#f59e0b' },
    { name: 'Passes', value: 45, color: '#10b981' },
  ];

  const statsData = [
    { name: 'Speed', value: 85 },
    { name: 'Power', value: 78 },
    { name: 'Stamina', value: 92 },
    { name: 'Defense', value: 88 },
  ];

  return (
    <Box sx={{ p: 4, background: '#0f172a', minHeight: '100vh' }}>
      <DarkCard>
        <Grid container spacing={4}>
          {/* Header */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              <Typography variant="h4">
                PLAYER PROFILES AND STATISTICS
              </Typography>
              <Box>
                <IconButton sx={{ color: '#06b6d4' }}><Help /></IconButton>
                <IconButton sx={{ color: '#06b6d4' }}><ArrowForward /></IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Main Profile */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Avatar
                src="/player-image.jpg"
                sx={{
                  width: 180,
                  height: 180,
                  border: '4px solid #06b6d4',
                  margin: 'auto',
                }}
              />
              <Typography variant="h2" sx={{ color: '#06b6d4', mt: 2 }}>
                2.29
              </Typography>
            </Box>

            {/* Stats Bars */}
            {statsData.map((stat) => (
              <Box key={stat.name} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>{stat.name}</Typography>
                  <Typography>{stat.value}%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={stat.value}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: alpha('#fff', 0.1),
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#06b6d4',
                    },
                  }}
                />
              </Box>
            ))}

            {/* Pie Chart */}
            <Box sx={{ height: 200, mt: 4 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Performance Graphs */}
          <Grid item xs={12} md={8}>
            {/* Area Chart */}
            <Box sx={{ height: 300, mb: 4 }}>
              <ResponsiveContainer>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorGoals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="goals"
                    stroke="#06b6d4"
                    fillOpacity={1}
                    fill="url(#colorGoals)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>

            {/* Line Chart */}
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#f59e0b"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="assists"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            {/* Stats Grid */}
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={6}>
                <StatBox>
                  <SportsSoccer sx={{ fontSize: 40, color: '#06b6d4' }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>GOALS</Typography>
                  <Typography variant="h4" color="primary">29</Typography>
                </StatBox>
              </Grid>
              <Grid item xs={6}>
                <StatBox>
                  <EmojiEvents sx={{ fontSize: 40, color: '#06b6d4' }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>ASSISTS</Typography>
                  <Typography variant="h4" color="primary">12</Typography>
                </StatBox>
              </Grid>
            </Grid>
          </Grid>

          {/* Bottom Stats */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {['SCORED', 'MISSED', 'RATING', 'RANK'].map((stat, index) => (
                <Grid item xs={3} key={stat}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="primary">
                      {[19, 15, 22, 26][index]}
                    </Typography>
                    <Typography variant="body2">{stat}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DarkCard>
    </Box>
  );
};

export default PlayerProfile;