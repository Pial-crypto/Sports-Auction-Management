"use client"

import React from 'react';
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
  GroupWork,
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

// Styled components
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

const ManagerProfile = () => {
  const teamData = [
    { month: 'Jan', wins: 5, losses: 2 },
    { month: 'Feb', wins: 7, losses: 1 },
    { month: 'Mar', wins: 4, losses: 3 },
    { month: 'Apr', wins: 8, losses: 0 },
    { month: 'May', wins: 6, losses: 2 },
    { month: 'Jun', wins: 9, losses: 1 },
  ];

  const pieData = [
    { name: 'Wins', value: 39, color: '#06b6d4' },
    { name: 'Losses', value: 9, color: '#f59e0b' },
  ];

  const statsData = [
    { name: 'Strategy', value: 90 },
    { name: 'Teamwork', value: 85 },
    { name: 'Leadership', value: 95 },
    { name: 'Adaptability', value: 88 },
  ];

  return (
    <Box sx={{ p: 4, background: '#0f172a', minHeight: '100vh' }}>
      <DarkCard>
        <Grid container spacing={4}>
          {/* Header */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              <Typography variant="h4">
                TEAM MANAGER PROFILE
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
                src="/manager-image.jpg"
                sx={{
                  width: 180,
                  height: 180,
                  border: '4px solid #06b6d4',
                  margin: 'auto',
                }}
              />
              <Typography variant="h2" sx={{ color: '#06b6d4', mt: 2 }}>
                4.9
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
                <AreaChart data={teamData}>
                  <defs>
                    <linearGradient id="colorWins" x1="0" y1="0" x2="0" y2="1">
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
                    dataKey="wins"
                    stroke="#06b6d4"
                    fillOpacity={1}
                    fill="url(#colorWins)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>

            {/* Line Chart */}
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={teamData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="losses"
                    stroke="#f59e0b"
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
                  <Typography variant="h6" sx={{ mt: 1 }}>WINS</Typography>
                  <Typography variant="h4" color="primary">39</Typography>
                </StatBox>
              </Grid>
              <Grid item xs={6}>
                <StatBox>
                  <GroupWork sx={{ fontSize: 40, color: '#06b6d4' }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>LOSSES</Typography>
                  <Typography variant="h4" color="primary">9</Typography>
                </StatBox>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DarkCard>
    </Box>
  );
};

export default ManagerProfile; 