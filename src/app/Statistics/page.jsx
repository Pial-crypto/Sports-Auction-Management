"use client";

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Avatar,
  Zoom,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Timeline,
  TrendingUp,
  People,
  EmojiEvents,
  SportsCricket,
  Schedule,
} from '@mui/icons-material';
import dynamic from 'next/dynamic';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Recharts dynamic imports
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const ComposedChart = dynamic(() => import('recharts').then(mod => mod.ComposedChart), { ssr: false });
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  ChartLegend
);

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: 16,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  color: 'white',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
    background: 'rgba(255, 255, 255, 0.08)',
  },
}));

const StatBox = styled(Box)(({ theme, color }) => ({
  background: alpha(color, 0.1),
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    background: alpha(color, 0.15),
  }
}));

// Add these styled components
const GradientCard = styled(StyledCard)(({ color1, color2 }) => ({
  background: `linear-gradient(135deg, ${alpha(color1, 0.1)} 0%, ${alpha(color2, 0.1)} 100%)`,
  border: `1px solid ${alpha(color1, 0.2)}`,
  '&:hover': {
    background: `linear-gradient(135deg, ${alpha(color1, 0.15)} 0%, ${alpha(color2, 0.15)} 100%)`,
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 24px ${alpha(color1, 0.2)}`,
  }
}));

// Add more mock data for better visualization
const performanceData = [
  { day: 'Week 1', performance: 65, teams: 16, matches: 8 },
  { day: 'Week 2', performance: 75, teams: 16, matches: 16 },
  { day: 'Week 3', performance: 85, teams: 8, matches: 20 },
  { day: 'Week 4', performance: 72, teams: 4, matches: 22 },
  { day: 'Week 5', performance: 90, teams: 2, matches: 23 },
  { day: 'Final Week', performance: 95, teams: 2, matches: 24 },
];

const tournamentStats = {
  totalTeams: 16,
  matchesPlayed: 24,
  upcomingMatches: 8,
  totalPlayers: 176,
  averageScore: 156,
  highestScore: 198,
  totalSixes: 89,
  totalFours: 246,
  bestBowling: "6/23",
  bestBatting: "112*",
  totalWickets: 187,
  averageRunRate: 8.4,
};

// Styled Components
const DashboardCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
}));

const StatCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.08)',
    transform: 'translateY(-2px)',
  }
}));

// Enhanced mock data
const teamPerformance = [
  { category: 'Batting', value: 85 },
  { category: 'Bowling', value: 92 },
  { category: 'Fielding', value: 88 },
  { category: 'Consistency', value: 90 },
  { category: 'Form', value: 95 },
];

const matchResults = [
  { match: 'M1', runs: 185, wickets: 8, result: 'W' },
  { match: 'M2', runs: 165, wickets: 6, result: 'W' },
  { match: 'M3', runs: 190, wickets: 7, result: 'L' },
  { match: 'M4', runs: 210, wickets: 9, result: 'W' },
  { match: 'M5', runs: 175, wickets: 8, result: 'W' },
];

// Add new mock data
const matchScores = [
  { match: 'M1', teamA: 185, teamB: 180 },
  { match: 'M2', teamA: 165, teamB: 155 },
  { match: 'M3', teamA: 190, teamB: 195 },
  { match: 'M4', teamA: 210, teamB: 200 },
  { match: 'M5', teamA: 175, teamB: 172 },
];

const tournamentTrends = [
  { week: 'Week 1', avgScore: 165, highScore: 185, totalSixes: 15 },
  { week: 'Week 2', avgScore: 170, highScore: 190, totalSixes: 18 },
  { week: 'Week 3', avgScore: 175, highScore: 195, totalSixes: 20 },
  { week: 'Week 4', avgScore: 180, highScore: 210, totalSixes: 22 },
  { week: 'Week 5', avgScore: 185, highScore: 210, totalSixes: 25 },
];

// Update the mock data
const tournamentMatches = [
  { name: 'Match 1', score: 185, wickets: 8 },
  { name: 'Match 2', score: 165, wickets: 6 },
  { name: 'Match 3', score: 190, wickets: 7 },
  { name: 'Match 4', score: 210, wickets: 9 },
  { name: 'Match 5', score: 175, wickets: 8 },
  { name: 'Match 6', score: 195, wickets: 7 },
  { name: 'Match 7', score: 180, wickets: 8 },
  { name: 'Match 8', score: 205, wickets: 6 },
];

const Statistics = () => {
  return (
    <Box sx={{ 
      p: 3, 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <Typography 
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

      {/* Quick Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            icon: <People sx={{ fontSize: 40 }} />,
            label: 'Participating Teams',
            value: tournamentStats.totalTeams,
            color: '#3b82f6',
            subText: 'Active Teams in Tournament'
          },
          {
            icon: <SportsCricket sx={{ fontSize: 40 }} />,
            label: 'Total Matches',
            value: `${tournamentStats.matchesPlayed}/${tournamentStats.matchesPlayed + tournamentStats.upcomingMatches}`,
            color: '#10b981',
            subText: 'Matches Completed'
          },
          {
            icon: <TrendingUp sx={{ fontSize: 40 }} />,
            label: 'Highest Score',
            value: tournamentStats.highestScore,
            color: '#f59e0b',
            subText: 'Tournament Best'
          },
          {
            icon: <EmojiEvents sx={{ fontSize: 40 }} />,
            label: 'Tournament Stage',
            value: 'Quarter Finals',
            color: '#6366f1',
            subText: 'Current Phase'
          }
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Zoom in={true} timeout={500 + (index * 100)}>
              <StyledCard sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(stat.color, 0.3)}`,
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(stat.color, 0.2),
                      color: stat.color,
                      width: 56,
                      height: 56
                    }}>
                      {stat.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h4" sx={{ color: stat.color, fontWeight: 'bold' }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        {stat.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: alpha(stat.color, 0.7) }}>
                        {stat.subText}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </StyledCard>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      {/* Tournament Trends Chart */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#94a3b8' }}>
                Tournament Match Analysis
              </Typography>
              <Box sx={{ width: '100%', height: 400, position: 'relative' }}>
                <Bar
                  data={{
                    labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5', 'Match 6', 'Match 7', 'Match 8'],
                    datasets: [
                      {
                        label: 'Team Score',
                        data: [185, 165, 190, 210, 175, 195, 180, 205],
                        backgroundColor: '#3b82f6',
                        borderRadius: 6,
                      },
                      {
                        label: 'Wickets',
                        data: [8, 6, 7, 9, 8, 7, 8, 6],
                        backgroundColor: '#10b981',
                        borderRadius: 6,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                        },
                        ticks: {
                          color: '#fff',
                        },
                      },
                      x: {
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                        },
                        ticks: {
                          color: '#fff',
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        labels: {
                          color: '#fff',
                        },
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Recent Match Scores */}
        <Grid item xs={12} lg={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#94a3b8' }}>
                Recent Match Scores
              </Typography>
              <Box sx={{ width: '100%', height: 400, position: 'relative' }}>
                <Bar
                  data={{
                    labels: ['M1', 'M2', 'M3', 'M4', 'M5'],
                    datasets: [
                      {
                        label: 'Team A',
                        data: [185, 165, 190, 210, 175],
                        backgroundColor: '#3b82f6',
                        borderRadius: 6,
                      },
                      {
                        label: 'Team B',
                        data: [180, 155, 195, 200, 172],
                        backgroundColor: '#10b981',
                        borderRadius: 6,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    scales: {
                      x: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                        },
                        ticks: {
                          color: '#fff',
                        },
                      },
                      y: {
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                        },
                        ticks: {
                          color: '#fff',
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        labels: {
                          color: '#fff',
                        },
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Tournament Progress */}
        <Grid item xs={12}>
          <StyledCard sx={{ 
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)'
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#94a3b8', mb: 3 }}>
                Tournament Progress
              </Typography>
              <Grid container spacing={3}>
                {[
                  { label: 'Matches Completed', value: tournamentStats.matchesPlayed, total: 32, color: '#10b981' },
                  { label: 'Average Score', value: tournamentStats.averageScore, total: 200, color: '#3b82f6' },
                  { label: 'Total Sixes', value: tournamentStats.totalSixes, total: 100, color: '#f59e0b' },
                  { label: 'Total Wickets', value: tournamentStats.totalWickets, total: 200, color: '#6366f1' }
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography color="rgba(255,255,255,0.7)">{item.label}</Typography>
                        <Typography color={item.color} fontWeight="bold">
                          {item.value}/{item.total}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(item.value / item.total) * 100}
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          bgcolor: alpha(item.color, 0.1),
                          '& .MuiLinearProgress-bar': {
                            bgcolor: item.color,
                            borderRadius: 4,
                          }
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistics;