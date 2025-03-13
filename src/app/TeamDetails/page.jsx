"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Tooltip,
  Tabs,
  Tab,
  Fade,
  Zoom,
  CircularProgress,
  LinearProgress,
  Divider,
  AvatarGroup,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Person,
  Email,
  Phone,
  SportsCricket,
  Edit,
  Delete,
  Add,
  Save,
  Close,
  Star,
  Assignment,
  EmojiEvents,
  Speed,
  Timeline,
  Group,
  Insights,
  SportsScore,
  LocationOn,
  CalendarToday,
  Download,
} from '@mui/icons-material';

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

const PlayerCard = styled(GlassCard)(({ theme }) => ({
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    background: 'linear-gradient(45deg, #1e88e5, #1565c0)',
    borderRadius: '16px 16px 0 0',
    zIndex: 0,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  border: '4px solid white',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  margin: '-50px auto 10px',
  position: 'relative',
  zIndex: 1,
}));

const RoleChip = styled(Chip)(({ role }) => {
  const colors = {
    batsman: { bg: '#2196F3', light: '#E3F2FD' },
    bowler: { bg: '#4CAF50', light: '#E8F5E9' },
    allRounder: { bg: '#FF9800', light: '#FFF3E0' },
    captain: { bg: '#9C27B0', light: '#F3E5F5' },
  };
  return {
    backgroundColor: alpha(colors[role]?.bg || colors.batsman.bg, 0.2),
    color: colors[role]?.light || colors.batsman.light,
    border: `1px solid ${alpha(colors[role]?.light || colors.batsman.light, 0.5)}`,
    fontWeight: 'bold',
  };
});

const StatBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  background: alpha('#fff', 0.1),
  textAlign: 'center',
}));

// Mock Data
const initialTeamData = {
  name: "Royal Strikers",
  established: "2020",
  captain: "John Doe",
  coach: "Mike Smith",
  homeGround: "Central Stadium",
  logo: "/team-logo.png",
  coverImage: "/team-cover.jpg",
  description: "A dynamic cricket team known for aggressive batting and disciplined bowling. Winners of multiple championships and committed to nurturing young talent.",
  stats: {
    matchesPlayed: 45,
    matchesWon: 32,
    winRate: 71,
    ranking: 2,
  },
  players: [
    {
      id: 1,
      name: "John Doe",
      role: "captain",
      battingStyle: "Right Handed",
      bowlingStyle: "Right Arm Fast",
      age: 28,
      matches: 45,
      runs: 1250,
      wickets: 30,
      average: 42.5,
      strikeRate: 145.8,
      economy: 7.2,
      avatar: "/player1.jpg",
      jerseyNumber: "7",
      email: "john@example.com",
      phone: "+1234567890",
      achievements: ["Player of the Series 2023", "Most Runs 2022"]
    },
    {
      id: 2,
      name: "Mike Wilson",
      role: "bowler",
      battingStyle: "Left Handed",
      bowlingStyle: "Left Arm Fast",
      age: 25,
      matches: 40,
      runs: 320,
      wickets: 62,
      average: 18.5,
      strikeRate: 110.2,
      economy: 6.8,
      avatar: "/player2.jpg",
      jerseyNumber: "11",
      email: "mike@example.com",
      phone: "+1234567891",
      achievements: ["Best Bowler 2023"]
    },
    {
      id: 3,
      name: "Steve Johnson",
      role: "batsman",
      battingStyle: "Right Handed",
      bowlingStyle: "Right Arm Medium",
      age: 27,
      matches: 42,
      runs: 1820,
      wickets: 10,
      average: 52.3,
      strikeRate: 155.4,
      economy: 8.2,
      avatar: "/player3.jpg",
      jerseyNumber: "45",
      email: "steve@example.com",
      phone: "+1234567892",
      achievements: ["Fastest Century 2023"]
    },
    {
      id: 4,
      name: "Chris Brown",
      role: "allRounder",
      battingStyle: "Right Handed",
      bowlingStyle: "Right Arm Spin",
      age: 26,
      matches: 38,
      runs: 980,
      wickets: 45,
      average: 35.6,
      strikeRate: 138.5,
      economy: 6.9,
      avatar: "/player4.jpg",
      jerseyNumber: "23",
      email: "chris@example.com",
      phone: "+1234567893",
      achievements: ["Best All-Rounder 2022"]
    },
    {
      id: 5,
      name: "David Miller",
      role: "batsman",
      battingStyle: "Left Handed",
      bowlingStyle: "-",
      age: 24,
      matches: 35,
      runs: 1150,
      wickets: 0,
      average: 48.2,
      strikeRate: 165.2,
      economy: 0,
      avatar: "/player5.jpg",
      jerseyNumber: "99",
      email: "david@example.com",
      phone: "+1234567894",
      achievements: ["Most Sixes 2023"]
    }
  ],
  achievements: [
    {
      title: "Tournament Winner",
      year: "2023",
      description: "City Cricket Championship",
      icon: "🏆",
      date: "December 2023"
    },
    {
      title: "Runners Up",
      year: "2023",
      description: "National T20 League",
      icon: "🥈",
      date: "August 2023"
    },
    {
      title: "Best Team Spirit",
      year: "2023",
      description: "Regional Cricket Association Award",
      icon: "🌟",
      date: "October 2023"
    },
    {
      title: "Most Disciplined Team",
      year: "2022",
      description: "Cricket Excellence Awards",
      icon: "🎯",
      date: "December 2022"
    }
  ],
  upcomingMatches: [
    {
      id: 1,
      opponent: "Thunder Kings",
      date: "2024-01-25",
      time: "14:30",
      venue: "Central Stadium",
      matchType: "League Match",
      ticketInfo: "Available",
      broadcastChannel: "Sports HD"
    },
    {
      id: 2,
      opponent: "Eagle Warriors",
      date: "2024-01-28",
      time: "15:00",
      venue: "City Ground",
      matchType: "Quarter Final",
      ticketInfo: "Sold Out",
      broadcastChannel: "Sports HD"
    }
  ],
  documents: [
    {
      title: "Team Registration",
      type: "PDF",
      size: "2.5 MB",
      uploadDate: "2024-01-01",
      status: "Verified"
    },
    {
      title: "Player Contracts",
      type: "PDF",
      size: "5.8 MB",
      uploadDate: "2024-01-05",
      status: "Confidential"
    },
    {
      title: "Tournament Schedule",
      type: "XLSX",
      size: "1.2 MB",
      uploadDate: "2024-01-10",
      status: "Public"
    }
  ],
  staff: [
    {
      name: "Mike Smith",
      role: "Head Coach",
      experience: "15 years",
      specialization: "Batting",
      contact: "+1234567895"
    },
    {
      name: "James Wilson",
      role: "Bowling Coach",
      experience: "12 years",
      specialization: "Fast Bowling",
      contact: "+1234567896"
    },
    {
      name: "Sarah Johnson",
      role: "Physiotherapist",
      experience: "8 years",
      specialization: "Sports Injury",
      contact: "+1234567897"
    }
  ]
};
const TeamDetails = () => {
  // States
  const [teamData, setTeamData] = useState(initialTeamData);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1500);
  }, []);

  // Handlers
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditPlayer = (player) => {
    setSelectedPlayer(player);
    setOpenDialog(true);
  };

  // Components
  const TeamOverview = () => (
    <GlassCard sx={{ mb: 4 }}>
      <Box
        sx={{
          height: 200,
          background: `url(${teamData.coverImage}) center/cover`,
          position: 'relative',
          borderRadius: '16px 16px 0 0',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))',
            borderRadius: 'inherit',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            color: 'white',
            zIndex: 1,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            {teamData.name}
          </Typography>
          <Typography variant="subtitle1">
            Est. {teamData.established}
          </Typography>
        </Box>
      </Box>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar
                src={teamData.logo}
                sx={{
                  width: 150,
                  height: 150,
                  margin: 'auto',
                  border: '5px solid white',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.8)' }}>
              {teamData.description}
            </Typography>
            <Grid container spacing={2}>
              {[
                { label: 'Matches', value: teamData.stats.matchesPlayed },
                { label: 'Wins', value: teamData.stats.matchesWon },
                { label: 'Win Rate', value: `${teamData.stats.winRate}%` },
                { label: 'Ranking', value: `#${teamData.stats.ranking}` },
              ].map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <StatBox>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      {stat.label}
                    </Typography>
                  </StatBox>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </GlassCard>
  );

  const PlayersList = () => (
    <Grid container spacing={3}>
      {teamData.players.map((player, index) => (
        <Grid item xs={12} sm={6} md={4} key={player.id}>
          <Zoom in={!loading} timeout={500 + (index * 100)}>
            <PlayerCard>
              <CardContent sx={{ textAlign: 'center', pt: 8 }}>
                <StyledAvatar src={player.avatar} />
                <Typography variant="h6" gutterBottom>
                  {player.name}
                </Typography>
                <RoleChip
                  label={player.role.toUpperCase()}
                  role={player.role}
                  size="small"
                  sx={{ mb: 2 }}
                />
                
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={4}>
                    <Typography variant="h6">{player.matches}</Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Matches
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6">{player.runs}</Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Runs
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6">{player.wickets}</Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Wickets
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Insights />}
                    sx={{
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.3)',
                      '&:hover': {
                        borderColor: 'white',
                        background: 'rgba(255,255,255,0.1)',
                      },
                    }}
                    onClick={() => handleEditPlayer(player)}
                  >
                    View Stats
                  </Button>
                </Box>
              </CardContent>
            </PlayerCard>
          </Zoom>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <MainContainer>
      <Fade in={!loading} timeout={1000}>
        <Box>
          {/* Header */}
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
              Team Details
            </Typography>
          </Box>

          <TeamOverview />

          {/* Tabs */}
          <Box sx={{ mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                  bgcolor: '#64b5f6',
                },
                '& .MuiTab-root': {
                  color: 'rgba(255,255,255,0.7)',
                  '&.Mui-selected': {
                    color: 'white',
                  },
                },
              }}
            >
              <Tab icon={<Group />} label="Players" />
              <Tab icon={<EmojiEvents />} label="Achievements" />
              <Tab icon={<Assignment />} label="Documents" />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box>
       
{tabValue === 0 && <PlayersList />}
{tabValue === 1 && (
  <Grid container spacing={3}>
    {teamData.achievements.map((achievement, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Zoom in={true} timeout={500 + (index * 100)}>
          <GlassCard>
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 2,
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))',
                p: 2,
                borderRadius: 2
              }}>
                <Typography variant="h2" sx={{ color: 'white' }}>
                  {achievement.icon}
                </Typography>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {achievement.title}
                  </Typography>
                  <Chip 
                    label={achievement.year}
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                  />
                </Box>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.7)' }}>
                {achievement.description}
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'rgba(255,255,255,0.6)',
                gap: 1
              }}>
                <CalendarToday fontSize="small" />
                <Typography variant="caption">
                  {achievement.date}
                </Typography>
              </Box>
            </CardContent>
          </GlassCard>
        </Zoom>
      </Grid>
    ))}
  </Grid>
)}

{tabValue === 2 && (
  <Grid container spacing={3}>
    {teamData.documents.map((doc, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Zoom in={true} timeout={500 + (index * 100)}>
          <GlassCard>
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {doc.type === 'PDF' ? (
                    <Avatar sx={{ bgcolor: '#f44336' }}>PDF</Avatar>
                  ) : (
                    <Avatar sx={{ bgcolor: '#4caf50' }}>XLS</Avatar>
                  )}
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      {doc.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                      {doc.type} • {doc.size}
                    </Typography>
                  </Box>
                </Box>
                <Chip 
                  label={doc.status}
                  size="small"
                  sx={{ 
                    bgcolor: doc.status === 'Verified' ? alpha('#4caf50', 0.2) : 
                           doc.status === 'Confidential' ? alpha('#f44336', 0.2) : 
                           alpha('#2196f3', 0.2),
                    color: doc.status === 'Verified' ? '#4caf50' :
                          doc.status === 'Confidential' ? '#f44336' :
                          '#2196f3',
                    border: '1px solid currentColor'
                  }}
                />
              </Box>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
                pt: 2,
                borderTop: '1px solid rgba(255,255,255,0.1)'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: 'rgba(255,255,255,0.6)',
                  gap: 1
                }}>
                  <CalendarToday fontSize="small" />
                  <Typography variant="caption">
                    Uploaded: {doc.uploadDate}
                  </Typography>
                </Box>
                
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Download />}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.3)',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Download
                </Button>
              </Box>
            </CardContent>
          </GlassCard>
        </Zoom>
      </Grid>
    ))}
  </Grid>
)}
          </Box>
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
              Loading Team Details...
            </Typography>
          </Box>
        </Box>
      )}
    </MainContainer>
  );
};

export default TeamDetails;