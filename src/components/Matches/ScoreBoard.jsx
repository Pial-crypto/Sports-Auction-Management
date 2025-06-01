import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Tabs,
  Tab,
  Avatar,
  Chip,
  IconButton,
  Grid,
} from '@mui/material';
import {
  SportsCricket,
  SportsSoccer,
  EmojiEvents,
  Close,
  Speed,
  Assessment,
  SportsCricketOutlined,
  TimelineOutlined,
  SportsBaseballOutlined
} from '@mui/icons-material';
import { styled } from '@mui/system';
import { getTeamColor, getTeamInitials } from '@/function/handleMatchesPage';
import fetchAllUsers from '@/function/fetchAllUser';
import { setAllPlayersNameFromIdHook } from '@/hook/setAllPlayersNameFromIdHook';

// Mock Data for Cricket
const mockCricketData = {
  team1: {
    name: "Super Kings",
    players: [
      { id: 1, name: "MS Dhoni", runsScored: 45, ballsFaced: 30, wickets: 0, overs: 0 },
      { id: 2, name: "Ravindra Jadeja", runsScored: 32, ballsFaced: 25, wickets: 2, overs: 4 },
      { id: 3, name: "Faf du Plessis", runsScored: 85, ballsFaced: 50, wickets: 0, overs: 0 },
    ]
  },
  team2: {
    name: "Mumbai Indians",
    players: [
      { id: 4, name: "Rohit Sharma", runsScored: 56, ballsFaced: 40, wickets: 0, overs: 0 },
      { id: 5, name: "Jasprit Bumrah", runsScored: 8, ballsFaced: 12, wickets: 3, overs: 4 },
      { id: 6, name: "Hardik Pandya", runsScored: 42, ballsFaced: 30, wickets: 1, overs: 3 },
    ]
  },
  manOfTheMatch: { id: 3, name: "Faf du Plessis" }
};

// Mock Data for Football
const mockFootballData = {
  team1: {
    name: "Real Madrid",
    players: [
      { id: 1, name: "Benzema", goals: 2, assists: 1, cards: "none" },
      { id: 2, name: "Modric", goals: 0, assists: 2, cards: "yellow" },
      { id: 3, name: "Vinicius", goals: 1, assists: 1, cards: "none" },
    ]
  },
  team2: {
    name: "Barcelona",
    players: [
      { id: 4, name: "Lewandowski", goals: 1, assists: 0, cards: "none" },
      { id: 5, name: "Pedri", goals: 0, assists: 1, cards: "none" },
      { id: 6, name: "Gavi", goals: 0, assists: 0, cards: "red" },
    ]
  },
  manOfTheMatch: { id: 1, name: "Benzema" }
};

// Styled Components
const PlayerCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  background: 'white',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)'
  }
}));

const StatChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  fontWeight: 'bold',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)'
  }
}));

export const ScoreBoard = ({ open, onClose, match, sport = 'cricket' ,playerPerformances}) => {
  const [activeTeam, setActiveTeam] = useState(0);
  

  console.log('player performances for this match',match,playerPerformances)
  // Use mock data based on sport
  const mockData = sport === 'cricket' ? mockCricketData : mockFootballData;
  
  const data = {
    team1: {
      name: match?.team1Name || mockData.team1.name,
      players: mockData.team1.players
    },
    team2: {
      name: match?.team2Name || mockData.team2.name,
      players: mockData.team2.players
    },
    manOfTheMatch: mockData.manOfTheMatch
  };



  const [team1PlayersPerf,setTeam1PlayersPerf]=useState(playerPerformances.filter((performance)=>performance.teamId===match.team1Id));
  const [team2PlayersPerf,setTeam2PlayersPerf]=useState(playerPerformances.filter((performance)=>performance.teamId===match.team2Id));

setAllPlayersNameFromIdHook(setTeam1PlayersPerf)
setAllPlayersNameFromIdHook(setTeam2PlayersPerf)
  console.log("team1PlayerPerf",team1PlayersPerf);
  console.log("team2playersPert",team2PlayersPerf)
  const renderCricketStats = (perf) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
      <StatChip 
        icon={<Assessment />} 
        label={`Runs: ${perf.runsScored}`}
        sx={{ bgcolor: '#2196F3' }}
      />
      <StatChip 
        icon={<Speed />} 
        label={`Balls: ${perf.ballsFaced}`}
        sx={{ bgcolor: '#2196F3' }}
      />
      <StatChip 
        icon={<SportsCricketOutlined />} 
        label={`Wickets: ${perf.wickets}`}
        sx={{ bgcolor: '#2196F3' }}
      />
      <StatChip 
        icon={<TimelineOutlined />} 
        label={`Overs: ${perf.overs}`}
        sx={{ bgcolor: '#2196F3' }}
      />
    </Box>
  );

  const renderFootballStats = (perf) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
      <StatChip
        icon={<SportsBaseballOutlined />}
        label={`Goals: ${perf.goals}`}
        sx={{ bgcolor: '#2196F3' }}
      />
      <StatChip
        icon={<Assessment />}
        label={`Assists: ${perf.assists}`}
        sx={{ bgcolor: '#2196F3' }}
      />
      <StatChip
        label={`Card: ${perf.cards}`}
        sx={{
          bgcolor: perf.cards === 'red' ? '#f44336' : 
                  perf.cards === 'yellow' ? '#ffc107' : '#2196F3'
        }}
      />
    </Box>
  );

  return (
    team1PlayersPerf && team2PlayersPerf &&
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionProps={{ timeout: 100 }}
      PaperProps={{
        sx: {
          borderRadius: 2,
          background: '#fff'
        }
      }}
    >
      <DialogTitle
        sx={{
          background: '#1976D2',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {sport === 'cricket' ? <SportsCricket /> : <SportsSoccer />}
          <Typography variant="h6">Match Scoreboard</Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
      

        <Tabs
          value={activeTeam}
          onChange={(e, v) => setActiveTeam(v)}
          sx={{ mb: 3 }}
        >
          <Tab 
            icon={<Avatar sx={{ bgcolor: getTeamColor(match.team1Name) }}>
              {getTeamInitials(match.team2Name)}
            </Avatar>}
            label={match.team1Name}
            iconPosition="start"
          />
          <Tab 
            icon={<Avatar sx={{ bgcolor: getTeamColor(match.team2Name) }}>
              {getTeamInitials(match.team2Name)}
            </Avatar>}
            label={match.team2Name}
            iconPosition="start"
          />
        </Tabs>

        <Grid container spacing={2}>
          {(activeTeam === 0 ? team1PlayersPerf : team2PlayersPerf).map((playerPerf) => (
            <Grid item xs={12} md={6} key={playerPerf.id}>
              <PlayerCard >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Avatar sx={{ bgcolor: getTeamColor(activeTeam === 0 ? match.team1Name : match.team2Name) }}>
                    {playerPerf.playerName?.charAt(0)}
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {playerPerf.playerName}
                  </Typography>
                  {match.manOfTheMatchId === playerPerf.playerId && (
                    <Chip
                      icon={<EmojiEvents />}
                      label="Man of the Match"
                      size="small"
                      sx={{
                        ml: 'auto',
                        bgcolor: 'rgba(255,215,0,0.1)',
                        color: '#FFC107',
                        border: '1px solid #FFC107'
                      }}
                    />
                  )}
                </Box>
                {sport === 'cricket' ? renderCricketStats(playerPerf) : renderFootballStats(playerPerf)}
              </PlayerCard>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};