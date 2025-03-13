"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  Avatar,
  Tooltip,
  Fade,
  Zoom,
  CircularProgress,
  LinearProgress,
  Paper,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Timeline,
  EmojiEvents,
  SportsCricket,
  TrendingUp,
  Group,
  Assessment,
  Stars,
  Insights,
  Speed,
  ShowChart,
  BarChart,
  DonutLarge,
} from '@mui/icons-material';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

// Styled Components
const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  minHeight: '100vh',
  color: 'white',
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: 16,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)',
    background: 'rgba(255, 255, 255, 0.15)',
  },
}));

const StatCard = styled(GlassCard)(({ theme, color }) => ({
  background: `linear-gradient(135deg, ${alpha(color, 0.2)} 0%, ${alpha(color, 0.3)} 100%)`,
  border: `1px solid ${alpha(color, 0.3)}`,
}));

const ProgressCircle = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

// Mock Data
const teamStats = {
  overview: {
    matchesPlayed: 45,
    matchesWon: 32,
    matchesLost: 10,
    matchesDrawn: 3,
    winRate: 71,
    currentStreak: 5,
    ranking: 2,
    totalPoints: 156,
  },
  performance: {
    battingAvg: 285,
    bowlingAvg: 6.8,
    fieldingEfficiency: 92,
    powerPlayScore: 52,
    deathOversEconomy: 8.2,
  },
  recentForm: ['W', 'W', 'L', 'W', 'W', 'W'],
  playerAchievements: [
    { name: 'John Doe', achievement: 'Most Runs', value: '542 runs' },
    { name: 'Mike Smith', achievement: 'Most Wickets', value: '18 wickets' },
    { name: 'Steve Johnson', achievement: 'Best Catch Rate', value: '95%' },
  ],
};

const TeamStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1500);
  }, []);

  // Chart Data
  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Team Performance',
        data: [65, 75, 70, 80, 85, 90],
        fill: true,
        borderColor: '#4fc3f7',
        backgroundColor: alpha('#4fc3f7', 0.2),
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      y: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  };

  return (
    <MainContainer>
      <Fade in={!loading} timeout={1000}>
        <Box>
          {/* Header Section */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h3" 
              fontWeight="bold"
              sx={{
                background: 'linear-gradient(45deg, #fff, #64b5f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 2,
              }}
            >
              Team Statistics
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Overall Performance & Analytics
            </Typography>
          </Box>

          {/* Quick Stats */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              { 
                title: 'Win Rate',
                value: `${teamStats.overview.winRate}%`,
                icon: <TrendingUp />,
                color: '#2196f3',
              },
              {
                title: 'Current Streak',
                value: `${teamStats.overview.currentStreak} Wins`,
                icon: <ShowChart />,
                color: '#4caf50',
              },
              {
                title: 'Ranking',
                value: `#${teamStats.overview.ranking}`,
                icon: <Stars />,
                color: '#ff9800',
              },
              {
                title: 'Total Points',
                value: teamStats.overview.totalPoints,
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
                        value={teamStats.overview.winRate} 
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

          {/* Performance Charts */}
          <Grid container spacing={3}>
            {/* Performance Trend */}
            <Grid item xs={12} md={8}>
              <GlassCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Performance Trend
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <Line data={performanceData} options={chartOptions} />
                  </Box>
                </CardContent>
              </GlassCard>
            </Grid>

            {/* Recent Form */}
            <Grid item xs={12} md={4}>
              <GlassCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recent Form
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {teamStats.recentForm.map((result, index) => (
                      <Avatar
                        key={index}
                        sx={{
                          bgcolor: result === 'W' ? '#4caf50' : '#f44336',
                          width: 40,
                          height: 40,
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                        }}
                      >
                        {result}
                      </Avatar>
                    ))}
                  </Box>
                </CardContent>
              </GlassCard>
            </Grid>

            {/* Performance Metrics */}
            <Grid item xs={12}>
              <GlassCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Performance Metrics
                  </Typography>
                  <Grid container spacing={3}>
                    {Object.entries(teamStats.performance).map(([key, value], index) => (
                      <Grid item xs={12} sm={6} md={2.4} key={key}>
                        <Box 
                          sx={{ 
                            textAlign: 'center',
                            p: 2,
                            borderRadius: 2,
                            bgcolor: alpha('#fff', 0.1),
                          }}
                        >
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </Typography>
                          <Typography variant="h4" fontWeight="bold">
                            {value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </GlassCard>
            </Grid>

            {/* Player Achievements */}
            <Grid item xs={12}>
              <GlassCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Player Achievements
                  </Typography>
                  <Grid container spacing={3}>
                    {teamStats.playerAchievements.map((achievement, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box 
                          sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            p: 2,
                            borderRadius: 2,
                            bgcolor: alpha('#fff', 0.1),
                          }}
                        >
                          <Avatar 
                            sx={{ 
                              mr: 2,
                              bgcolor: `hsl(${index * 120}, 70%, 50%)`,
                            }}
                          >
                            {achievement.name[0]}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1">
                              {achievement.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                              {achievement.achievement}: <strong>{achievement.value}</strong>
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </GlassCard>
            </Grid>
          </Grid>
        </Box>
      </Fade>

      {/* Loading State */}
      {loading && (
        <Box 
          sx={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0,0,0,0.8)',
            zIndex: 9999,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} sx={{ color: '#fff' }} />
            <Typography sx={{ mt: 2, color: '#fff' }}>
              Loading Statistics...
            </Typography>
          </Box>
        </Box>
      )}
    </MainContainer>
  );
};

export default TeamStatistics;