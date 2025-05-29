"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import { styled, alpha, keyframes } from '@mui/material/styles';
import {
  Groups,
  SportsCricket,
  CalendarToday,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';
import fetchAllTeamReq from '@/function/getAllTeamReq';
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
import { useEffect } from 'react';
import { fetchCurrentTournamentHook } from '@/hook/fetchCurrentTournament';
// import { Header } from '@/components/OverView/Header';
//import {COLORS} from '@/style/OverView';
import { fetchCurrentTournamentMatchesHook } from '@/hook/fetchCurrentTournamentMatchesHook';
ChartJS.register(
  ArcElement,
  ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);
export const COLORS = {
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


const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(67, 97, 238, 0.3); }
  70% { box-shadow: 0 0 0 10px rgba(67, 97, 238, 0); }
  100% { box-shadow: 0 0 0 0 rgba(67, 97, 238, 0); }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${COLORS.paper} 0%, ${alpha(COLORS.primary, 0.05)} 100%)`,
  borderRadius: theme.spacing(3),
  border: '1px solid rgba(255,255,255,0.2)',
  backdropFilter: 'blur(10px)',
  boxShadow: `
    0 10px 15px -3px rgba(0,0,0,0.1),
    0 4px 6px -2px rgba(0,0,0,0.05)
  `,
  transform: 'perspective(1000px)',
  transformStyle: 'preserve-3d',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  '&:hover': {
    transform: 'perspective(1000px) rotateX(2deg) translateY(-5px)',
    boxShadow: `
      0 20px 25px -5px ${alpha(COLORS.primary, 0.2)},
      0 8px 10px -6px ${alpha(COLORS.primary, 0.1)}
    `
  }
}));


const ProgressBar = styled(LinearProgress)(({ color }) => ({
  height: 10,
  borderRadius: 5,
  background: alpha(color || COLORS.primary, 0.1),
  '& .MuiLinearProgress-bar': {
    background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
    borderRadius: 5,
  }
}));

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;


const AnimatedIcon = styled(Box)(({ color }) => ({
  background: alpha(color || COLORS.primary, 0.1),
  borderRadius: '50%',
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${float} 3s ease-in-out infinite`,
  '& svg': {
    fontSize: '2rem',
    color: color || COLORS.primary,
  }
}));

// Mock Data

// Add Tournament Progress Chart data

// Update TeamPerformanceChart

// Update TournamentStatsGrid to receive isDarkMode as prop

const Overview = () => {

  const [tournamentTeams,setTournamentTeams]=useState([])
    const [tournament,setTournament]=useState()
    const [matches,setMatches]=useState([])
  fetchCurrentTournamentHook(setTournament,undefined)



    useEffect(() => {
  
        fetchAllTeamReq().then(teamData => 
          {
            console.log(teamData, "teamData from ");
        if(tournament){
        const thisTournamentTeam= teamData.allTeamReq.filter(team => team.tournamentId === tournament.id && team.approved  );
        console.log(thisTournamentTeam, "thisTournamentTeam");
        setTournamentTeams(thisTournamentTeam);
        }
      });
  },[tournament]);
  const progress=matches.filter(match => match.status?.toLowerCase() === 'completed').length / matches.length * 100 || 0;
const firstUpcomingMatch = matches.find(
  (match) => match.status?.toLowerCase() === 'upcoming'
);


  fetchCurrentTournamentMatchesHook(tournament,setMatches)

const teamPoints = {};

matches.forEach((match) => {
  console.log(match, "match in overview page");
  // Add team1's points
  if (teamPoints[match.team1Name]) {
    teamPoints[match.team1Name] += parseInt(match.team1Points);
  } else {
    teamPoints[match.team1Name] = parseInt(match.team1Points);
  }

  // Add team2's points (if applicable)
  if (teamPoints[match.team2Name]) {
    teamPoints[match.team2Name] += parseInt(match.team2Points);
  } else {
    teamPoints[match.team2Name] = parseInt(match.team2Points);
  }
});

// Convert teamPoints object to array and sort by points

const ptsArray = Object.entries(teamPoints).map(
  ([teamName, totalPoints]) => ({ teamName, totalPoints })
);

ptsArray.sort((a, b) => b.totalPoints - a.totalPoints);








  return (
    matches && tournament && tournamentTeams && matches.length>0 &&
    <MainContainer>

   {/* <Header phase={tournamentStage}></Header> */}
      
    {/* <>
      <Typography 
        variant="h3" 
        sx={{
          fontWeight: 800,
          mb: 4,
          background: `linear-gradient(135deg, 
            ${COLORS.primary}, 
            ${COLORS.secondary} 50%, 
            ${COLORS.primary} 100%)`,
          backgroundSize: '200% auto',
          animation: `${shine} 3s linear infinite`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          letterSpacing: '-0.02em',
          textShadow: '0 2px 10px rgba(67, 97, 238, 0.2)',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-8px',
            left: 0,
            width: '60px',
            height: '4px',
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
            borderRadius: '2px',
          }
        }}
      >
        Tournament Overview

        
      </Typography>
         <Typography variant="subtitle1" color="text.secondary"
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
            Phase: {tournamentStage || "Not Started"}
          </Typography>

          </> */}

      {/* Charts Section */}
      {/* <Grid container spacing={3} sx={{ mt: 3 }}>
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
      </Grid> */}

      {/* Header Section */}



      {/* Tournament Progress */}
      <Grid container spacing={3}>
        {/* Tournament Progress Card */}
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 4 
              }}>
                <AnimatedIcon color={COLORS.primary}>
                  <SportsCricket />
                </AnimatedIcon>
                <Typography variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Tournament Progress
                </Typography>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  mb: 2 
                }}>
                  <Typography variant="h4" 
                    sx={{ 
                      fontWeight: 800,
                      background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    {progress.toFixed(0)}%
                  </Typography>
                </Box>
                <ProgressBar 
                  variant="determinate" 
                  value={progress} 
                  color={COLORS.primary}
                />
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" 
                  sx={{ 
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: COLORS.text,
                    '& svg': { color: COLORS.primary }
                  }}
                >
                  <Groups /> Participating Teams
                </Typography>
                
                {ptsArray.map((team, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      p: 2.5,
                      mb: 2,
                      borderRadius: 3,
                      background: index < 3 
                        ? `linear-gradient(135deg, 
                            ${alpha(COLORS.primary, 0.08)} 0%, 
                            ${alpha(COLORS.secondary, 0.08)} 100%)`
                        : alpha(COLORS.background, 0.5),
                      backdropFilter: 'blur(8px)',
                      border: '1px solid',
                      borderColor: index < 3 ? alpha(COLORS.primary, 0.1) : 'transparent',
                      transform: 'perspective(1000px)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'perspective(1000px) scale(1.02) translateX(10px) rotateY(-2deg)',
                        background: index < 3 
                          ? `linear-gradient(135deg, 
                              ${alpha(COLORS.primary, 0.12)} 0%, 
                              ${alpha(COLORS.secondary, 0.12)} 100%)`
                          : alpha(COLORS.primary, 0.05),
                        boxShadow: index < 3 
                          ? `0 10px 20px ${alpha(COLORS.primary, 0.2)}`
                          : 'none'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: index < 3 
                            ? `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
                            : alpha(COLORS.text, 0.1),
                          width: 40,
                          height: 40,
                          border: '2px solid white',
                          boxShadow: index < 3 
                            ? `0 0 0 2px ${alpha(COLORS.primary, 0.2)}`
                            : 'none',
                          animation: index < 3 ? `${pulseGlow} 2s infinite` : 'none'
                        }}
                      >
                        {index + 1}
                      </Avatar>
                      <Box>
                        <Typography 
                          variant="body1"
                          sx={{ 
                            fontWeight: index < 3 ? 700 : 500,
                            fontSize: '1.1rem',
                            color: index < 3 ? COLORS.primary : COLORS.text,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {team.teamName}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: COLORS.textSecondary,
                            display: 'block',
                            mt: 0.5
                          }}
                        >
                          Rank #{index + 1}
                        </Typography>
                      </Box>
                    </Box>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1.5,
                        background: alpha(index < 3 ? COLORS.primary : COLORS.text, 0.05),
                        padding: '8px 16px',
                        borderRadius: '20px'
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 800,
                          color: index < 3 ? COLORS.primary : COLORS.text,
                          textShadow: index < 3 ? '0 2px 4px rgba(67, 97, 238, 0.2)' : 'none'
                        }}
                      >
                        {team.totalPoints}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography variant="caption" sx={{ color: COLORS.textSecondary }}>
                          points
                        </Typography>
                        {index < ptsArray.length/2 ? (
                          <ArrowUpward sx={{ 
                            color: COLORS.success, 
                            fontSize: '1.2rem',
                            animation: `${float} 2s infinite`
                          }} />
                        ) : (
                          <ArrowDownward sx={{ 
                            color: COLORS.error,
                            fontSize: '1.2rem'
                          }} />
                        )}
                      </Box>
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
       
                  <Box
                 
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
                      {matches[0].date}
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {matches[0].team1Name} vs {matches[0].team2Name}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {matches[0].winner} won the match
                    </Typography>
                  </Box>
                
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
            
               

                  <Grid item xs={12} md={6} key={firstUpcomingMatch.id}>
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
                          {firstUpcomingMatch?.team1Name} vs {firstUpcomingMatch.team2Name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {firstUpcomingMatch?.date}
                          </Typography>
                          {/* <Timer sx={{ fontSize: 16, color: 'text.secondary', ml: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {firstUpcomingMatch?.date}
                          </Typography> */}
                        </Box>
                      </Box>
                      <Tooltip title="View Details">
                     
                      </Tooltip>
                    </Box>
                  </Grid>
                

              
                
                
                
                
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default Overview;