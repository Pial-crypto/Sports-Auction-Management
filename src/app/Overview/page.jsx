"use client";

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Avatar,
  LinearProgress,
  Tooltip,
  Fade,
  Zoom,
  AvatarGroup,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  TrendingUp,
  EmojiEvents,
  Groups,
  Schedule,
  LocationOn,
  Star,
  SportsCricket,
  MonetizationOn,
  Assessment,
  CalendarToday,
  Person,
  Timer,
  Visibility,
  ArrowUpward,
  ArrowDownward,
  LightMode,
  DarkMode,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

// Define the color theme
const COLORS = {
  primary: '#4361EE',    // Modern Indigo
  secondary: '#3F37C9',  // Deep Purple
  success: '#4CAF50',    // Material Green
  warning: '#FB8C00',    // Material Orange
  error: '#E53935',      // Material Red
  info: '#00BCD4',       // Material Cyan
  background: '#F8FAFC',  // Light Cool Gray
  paper: '#FFFFFF',      // White
  text: '#1E293B',       // Slate Dark
  textSecondary: '#64748B', // Slate Medium
  border: '#E2E8F0'      // Slate Light
};

// Styled Components
const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: COLORS.background,
  minHeight: '100vh',
  color: COLORS.text,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: COLORS.paper,
  borderRadius: theme.spacing(2),
  border: `1px solid ${COLORS.border}`,
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
}));

const StatBox = styled(Box)(({ theme, color }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  background: alpha(color, 0.1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    background: alpha(color, 0.15),
  },
}));

const ProgressBar = styled(LinearProgress)(({ theme, color }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: alpha(color, 0.1),
  '& .MuiLinearProgress-bar': {
    backgroundColor: color,
    borderRadius: 4,
  },
}));

// Mock Data
const tournamentData = {
  name: "Premier Cricket League 2024",
  status: "In Progress",
  progress: 45,
  totalTeams: 8,
  matchesPlayed: 24,
  upcomingMatches: 8,
  totalPrizeMoney: "₹500,000",
  currentPhase: "Quarter Finals",
  topTeams: [
    { name: "Royal Strikers", points: 14, trend: "up" },
    { name: "Thunder Kings", points: 12, trend: "up" },
    { name: "Eagle Warriors", points: 10, trend: "down" },
    { name: "Lion Hearts", points: 8, trend: "down" },
  ],
  recentMatches: [
    {
      id: 1,
      team1: "Royal Strikers",
      team2: "Thunder Kings",
      score1: "186/4",
      score2: "142/8",
      result: "Royal Strikers won by 44 runs",
      date: "2024-01-20",
    },
    // Add more matches...
  ],
  upcomingFixtures: [
    {
      id: 1,
      team1: "Eagle Warriors",
      team2: "Lion Hearts",
      date: "2024-01-22",
      time: "14:30",
      venue: "Central Stadium",
    },
    // Add more fixtures...
  ],
};

// Add Tournament Progress Chart data
const progressChartData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Matches Completed',
      data: [4, 12, 20, 24],
      borderColor: COLORS.secondary,
      backgroundColor: alpha(COLORS.secondary, 0.2),
      fill: true,
      tension: 0.4,
      pointBackgroundColor: COLORS.secondary,
      pointBorderColor: COLORS.secondary,
      pointRadius: 6,
      pointHoverRadius: 8,
    }
  ],
};

// Update TeamPerformanceChart
const TeamPerformanceChart = () => (
  <StyledCard>
    <CardContent>
      <Typography variant="h6" sx={{ color: COLORS.text, mb: 3 }}>
        Team Performance Overview
      </Typography>
      <Box sx={{ height: 300, position: 'relative' }}>
        <Doughnut
          data={{
            labels: ['Wins', 'Losses', 'Draws'],
            datasets: [{
              data: [8, 3, 1],
              backgroundColor: [
                COLORS.success,
                COLORS.error,
                COLORS.warning
              ],
              borderWidth: 0,
            }]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { color: COLORS.text }
              }
            },
            cutout: '70%'
          }}
        />
      </Box>
    </CardContent>
  </StyledCard>
);

// Update TournamentStatsGrid to receive isDarkMode as prop
const TournamentStatsGrid = ({ isDarkMode }) => (
  <Grid container spacing={3}>
    {[
      { 
        icon: <SportsCricket sx={{ fontSize: 40 }} />,
        label: "Total Matches",
        value: "32",
        color: COLORS.primary,
        trend: "+2 this week"
      },
      {
        icon: <Groups sx={{ fontSize: 40 }} />,
        label: "Active Teams",
        value: "16",
        color: COLORS.success,
        trend: "All teams active"
      },
      {
        icon: <EmojiEvents sx={{ fontSize: 40 }} />,
        label: "Tournament Phase",
        value: "Quarter Finals",
        color: COLORS.warning,
        trend: "On Schedule"
      },
      {
        icon: <Assessment sx={{ fontSize: 40 }} />,
        label: "Average Score",
        value: "165",
        color: COLORS.secondary,
        trend: "+12 vs last week"
      }
    ].map((stat, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <StyledCard>
          <CardContent>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              p: 2,
              background: alpha(stat.color, 0.1),
              borderRadius: 2
            }}>
              <Avatar sx={{ 
                bgcolor: alpha(stat.color, 0.1),
                color: stat.color,
                width: 56,
                height: 56,
                border: `2px solid ${alpha(stat.color, 0.2)}`,
              }}>
                {stat.icon}
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ color: stat.color, fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
                  {stat.label}
                </Typography>
                <Typography variant="caption" sx={{ color: stat.color }}>
                  {stat.trend}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </StyledCard>
      </Grid>
    ))}
  </Grid>
);

const Overview = () => {
  return (
    <MainContainer>
      <Typography 
        variant="h3" 
        sx={{
          fontWeight: 800,
          mb: 4,
          background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.secondary})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          letterSpacing: '-0.02em',
        }}
      >
        Tournament Overview
      </Typography>

      <Grid container spacing={3}>
        {[
          { 
            icon: <SportsCricket sx={{ fontSize: 40 }} />,
            label: "Total Matches",
            value: "32",
            color: COLORS.primary,
            trend: "+2 this week"
          },
          {
            icon: <Groups sx={{ fontSize: 40 }} />,
            label: "Active Teams",
            value: "16",
            color: COLORS.success,
            trend: "All teams active"
          },
          {
            icon: <EmojiEvents sx={{ fontSize: 40 }} />,
            label: "Tournament Phase",
            value: "Quarter Finals",
            color: COLORS.warning,
            trend: "On Schedule"
          },
          {
            icon: <Assessment sx={{ fontSize: 40 }} />,
            label: "Average Score",
            value: "165",
            color: COLORS.secondary,
            trend: "+12 vs last week"
          }
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StyledCard>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  p: 2,
                  background: alpha(stat.color, 0.1),
                  borderRadius: 2
                }}>
                  <Avatar sx={{ 
                    bgcolor: alpha(stat.color, 0.1),
                    color: stat.color,
                    width: 56,
                    height: 56,
                    border: `2px solid ${alpha(stat.color, 0.2)}`,
                  }}>
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ color: stat.color, fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
                      {stat.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: stat.color }}>
                      {stat.trend}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" sx={{ color: COLORS.text, mb: 3 }}>
                Tournament Progress
              </Typography>
              <Box sx={{ height: 300, position: 'relative' }}>
                <Line
                  data={progressChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: { 
                          color: COLORS.text,
                          font: { size: 12, weight: 500 },
                          padding: 20,
                        }
                      }
                    },
                    scales: {
                      y: {
                        grid: {
                          color: alpha(COLORS.text, 0.06),
                          drawBorder: false,
                        },
                        ticks: {
                          color: COLORS.textSecondary,
                          font: { size: 11 }
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        },
                        ticks: {
                          color: COLORS.textSecondary,
                          font: { size: 11 }
                        }
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <TeamPerformanceChart />
        </Grid>
      </Grid>

      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Tournament Overview
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            icon={<Timer />} 
            label={tournamentData.status} 
            color="primary"
            sx={{ borderRadius: 2 }}
          />
          <Typography variant="subtitle1" color="text.secondary">
            Phase: {tournamentData.currentPhase}
          </Typography>
        </Box>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            icon: <Groups sx={{ fontSize: 40 }} />,
            title: "Total Teams",
            value: tournamentData.totalTeams,
            color: "#2196F3"
          },
          {
            icon: <SportsCricket sx={{ fontSize: 40 }} />,
            title: "Matches Played",
            value: tournamentData.matchesPlayed,
            color: "#4CAF50"
          },
          {
            icon: <Schedule sx={{ fontSize: 40 }} />,
            title: "Upcoming Matches",
            value: tournamentData.upcomingMatches,
            color: "#FFC107"
          },
          {
            icon: <MonetizationOn sx={{ fontSize: 40 }} />,
            title: "Prize Pool",
            value: tournamentData.totalPrizeMoney,
            color: "#9C27B0"
          }
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Zoom in={true} timeout={500 + (index * 100)}>
              <StyledCard>
                <CardContent>
                  <StatBox color={stat.color}>
                    {stat.icon}
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {stat.title}
                      </Typography>
                      <Typography variant="h5" fontWeight="bold">
                        {stat.value}
                      </Typography>
                    </Box>
                  </StatBox>
                </CardContent>
              </StyledCard>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      {/* Tournament Progress */}
      <Grid container spacing={3}>
        {/* Tournament Progress Card */}
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tournament Progress
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Overall Progress
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {tournamentData.progress}%
                  </Typography>
                </Box>
                <ProgressBar 
                  variant="determinate" 
                  value={tournamentData.progress} 
                  color="#2196F3"
                />
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Top Performing Teams
                </Typography>
                {tournamentData.topTeams.map((team, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      p: 1,
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.02)',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body1">
                        {index + 1}. {team.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" fontWeight="bold">
                        {team.points} pts
                      </Typography>
                      {team.trend === 'up' ? (
                        <ArrowUpward sx={{ color: '#4CAF50' }} />
                      ) : (
                        <ArrowDownward sx={{ color: '#F44336' }} />
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Recent Activity Card */}
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Box sx={{ mt: 2 }}>
                {tournamentData.recentMatches.map((match, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      mb: 1,
                      bgcolor: alpha('#2196F3', 0.05),
                      '&:hover': {
                        bgcolor: alpha('#2196F3', 0.1),
                      }
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {match.date}
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {match.team1} vs {match.team2}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {match.result}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Upcoming Fixtures */}
        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Fixtures
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {tournamentData.upcomingFixtures.map((fixture, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: alpha('#FFC107', 0.05),
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        '&:hover': {
                          bgcolor: alpha('#FFC107', 0.1),
                        }
                      }}
                    >
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          {fixture.team1} vs {fixture.team2}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {fixture.date}
                          </Typography>
                          <Timer sx={{ fontSize: 16, color: 'text.secondary', ml: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {fixture.time}
                          </Typography>
                        </Box>
                      </Box>
                      <Tooltip title="View Details">
                        <IconButton size="small" sx={{ bgcolor: 'white' }}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default Overview;