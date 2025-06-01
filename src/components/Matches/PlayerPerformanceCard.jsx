import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
} from '@mui/material';
import { Avatar, FormControl, InputLabel, Select } from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import { ExpandMore, Person } from '@mui/icons-material';
import { fetchPlayerForSpecificTeamHook } from '@/hook/fetchSpecificTeamPlayersHook';
import fetchAllUsers from '@/function/fetchCurrentTournament';
import { fetchCurrentTournamentForPlayerHook } from '@/hook/fetchCurrentTournamentForPlayer';
import { fetchPlayerFilteringUserForTeam } from '@/hook/fetchTeamPlayerHook';
import { getTeamInitials } from '@/function/handleMatchesPage';

export const PlayerPerformanceSection = ({ 
  sport,
tournament,
  editMatch,
  setEditMatch 
}) => {

   
 
    const [auctionTeam2,setAuctionTeam2]=useState([])
    const [auctionTeam1,setAuctionTeam1]=useState([])
     const [team1Players,setTeam1Players]=useState([])
    const [team2Players,setTeam2Players]=useState([])


tournament && fetchPlayerForSpecificTeamHook(editMatch.team1Name,editMatch.team1Id,tournament,setAuctionTeam1)
tournament && fetchPlayerForSpecificTeamHook(editMatch.team2Name,editMatch.team2Id,tournament,setAuctionTeam2)

fetchPlayerFilteringUserForTeam(auctionTeam1,setTeam1Players)
fetchPlayerFilteringUserForTeam(auctionTeam2,setTeam2Players)

//console.log("Playerarra",team1Players,team2Players)

// Inside the component, add getAllPlayers function
const getAllPlayers = () => {
  return [...team1Players, ...team2Players];
};

const getNameInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Add this color generation function
const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};
// Add this near your other render functions
// Update the renderManOfTheMatch function
const renderManOfTheMatch = () => (
  <Box
    sx={{
      width: '100%',
      maxWidth: '800px',
      mx: 'auto',
      mb: 3,
      p: 2,
      backgroundColor: 'white',
      borderRadius: 2,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}
  >
    <FormControl fullWidth>
      <InputLabel>Man of the Match</InputLabel>
      <Select
        value={editMatch?.manOfTheMatchId || ''} // Change this line
        label="Man of the Match"
        onChange={(e) => {
          const selectedPlayer = getAllPlayers().find(p => p.id === e.target.value);
          setEditMatch(prev => ({
            ...prev,
            manOfTheMatchId: selectedPlayer.id,
            manOfTheMatchName: selectedPlayer.name,
          }));
        }}
        startAdornment={
          <EmojiEvents sx={{ ml: 1, color: '#FFC107', mr: 1 }} />
        }
        renderValue={(selected) => {
          const selectedPlayer = getAllPlayers().find(p => p.id === selected);
          if (!selectedPlayer) return '';
          
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar 
                src={selectedPlayer.imageUrl}
                alt={selectedPlayer.name}
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: selectedPlayer.imageUrl ? undefined : stringToColor(selectedPlayer.name),
                }}
              >
                {!selectedPlayer.imageUrl && getNameInitials(selectedPlayer.name)}
              </Avatar>
              <Typography>{selectedPlayer.name}</Typography>
            </Box>
          );
        }}
      >
        {getAllPlayers().map((player) => (
          <MenuItem 
            key={player.id} 
            value={player.id} // Change this line
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              py: 1 // Add more padding
            }}
          >
            <Avatar 
              src={player.imageUrl} 
              alt={player.name}
              sx={{ 
                width: 32, 
                height: 32,
                bgcolor: player.imageUrl ? undefined : stringToColor(player.name),
              }}
            >
              {!player.imageUrl && getNameInitials(player.name)}
            </Avatar>
            <Typography>{player.name}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);

  const handleTeam1PerformanceChange = (playerId, field, value) => {
    setEditMatch(prev => ({
      ...prev,
      team1Perf: {
        ...prev.team1Perf,
        [playerId]: {
          ...(prev.team1Perf?.[playerId] || {}),
          [field]: value
        }
      }
    }));
  };

  const handleTeam2PerformanceChange = (playerId, field, value) => {
    setEditMatch(prev => ({
      ...prev,
      team2Perf: {
        ...prev.team2Perf,
        [playerId]: {
          ...(prev.team2Perf?.[playerId] || {}),
          [field]: value
        }
      }
    }));
  };

const renderPerformanceFields = (teamPlayers, teamPerf, handleChange, teamName) => (
   <Accordion 
      sx={{ 
        width: '100%', // Full width
        maxWidth: '800px', // Maximum width
        mx: 'auto', // Center horizontally
        mt: 3,
        mb: 2,
        justifyContent:'center',
        '& .MuiAccordionDetails-root': {
          backgroundColor: '#f5f5f5',
          maxHeight: '400px',
          overflowY: 'auto'
        },
        '& .MuiAccordion-root': {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          '&:before': {
            display: 'none'
          }
        }
      }}
    >
      <AccordionSummary 
        expandIcon={<ExpandMore />}
        sx={{
          bgcolor: 'primary.light',
          '&:hover': {
            bgcolor: 'primary.main',
            '& .MuiTypography-root': {
              color: 'white'
            }
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 
            , justifyContent: 'center'
        }}>
          <Person />
          <Typography>{teamName} Player Performance</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}
           sx={{ 
          maxWidth: '95%', // Slightly smaller than parent
          margin: '0 auto' // Center the grid
        }}
        >
          {teamPlayers?.map((player) => (
            <Grid 
              container 
              item 
              spacing={2} 
              key={player.id}
              sx={{ 
                mb: 2,
                p: 2,
                backgroundColor: 'white',
                borderRadius: 1,
                boxShadow: 1,
                     justifyContent: 'center', // Center grid items
              '& .MuiGrid-root': {
                display: 'flex',
                justifyContent: 'center' // Center form fields
              }
              }}
            >
  <Grid item xs={12}>
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 2,
      justifyContent: 'center'
    }}>
      <Avatar 
        src={player.imageUrl || '/default-avatar.png'} 
        alt={player.id}
  sx={{ 
    width: 40, 
    height: 40,
    border: '2px solid',
    borderColor: 'primary.main',
    bgcolor: player.imageUrl ? undefined : stringToColor(player.name),
  }}
      >
         {!player.imageUrl && getTeamInitials(player.name)}
      </Avatar>
      <Typography 
        variant="subtitle1" 
        sx={{ 
          fontWeight: 'bold',
          color: 'primary.main'
        }}
      >
        {player.name}
      </Typography>
    </Box>
  </Grid>
              {sport === 'cricket' ? (
                <>
                  <Grid item xs={6}>
                    <TextField
                      label="Runs Scored"
                       sx={{ width: '95%' }} // Slightly smaller width
                      type="number"
                      fullWidth
                      value={teamPerf?.[player.id]?.runsScored || ''}
                      onChange={(e) => handleChange(player.id, 'runsScored', e.target.value, player.name)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Balls Faced"
                      type="number"
                       sx={{ width: '95%' }} // Slightly smaller width
                      fullWidth
                      value={teamPerf?.[player.id]?.ballsFaced || ''}
                      onChange={(e) => handleChange(player.id, 'ballsFaced', e.target.value, player.name)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Wickets"
                      type="number"
                      fullWidth
                       sx={{ width: '95%' }} // Slightly smaller width
                      value={teamPerf?.[player.id]?.wickets || ''}
                      onChange={(e) => handleChange(player.id, 'wickets', e.target.value, player.name)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Overs"
                      type="number"
                       sx={{ width: '95%' }} // Slightly smaller width
                      fullWidth
                      value={teamPerf?.[player.id]?.overs || ''}
                      onChange={(e) => handleChange(player.id, 'overs', e.target.value, player.name)}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={4}>
                    <TextField
                      label="Goals"
                      type="number"
                      fullWidth
                       sx={{ width: '95%' }} // Slightly smaller width
                      value={teamPerf?.[player.id]?.goals || ''}
                      onChange={(e) => handleChange(player.id, 'goals', e.target.value, player.name)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Assists"
                      type="number"
                      fullWidth
                       sx={{ width: '95%' }} // Slightly smaller width
                      value={teamPerf?.[player.id]?.assists || ''}
                      onChange={(e) => handleChange(player.id, 'assists', e.target.value, player.name)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Cards"
                      select
                      fullWidth
                       sx={{ width: '95%' }} // Slightly smaller width
                      value={teamPerf?.[player.id]?.cards || 'none'}
                      onChange={(e) => handleChange(player.id, 'cards', e.target.value, player.name)}
                    >
                      <MenuItem value="none">None</MenuItem>
                      <MenuItem value="yellow">Yellow</MenuItem>
                      <MenuItem value="red">Red</MenuItem>
                    </TextField>
                  </Grid>
                </>
              )}
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );

  return (
       <Box sx={{ 
      my: 3, // increased vertical margin
      '& .MuiAccordion-root + .MuiAccordion-root': {
        mt: 3 // adds space between accordions
      }
    }}>
       {editMatch?.status === 'completed' && renderManOfTheMatch()}
      {team1Players?.length > 0 && renderPerformanceFields(
        team1Players, 
        editMatch?.team1Perf,
        handleTeam1PerformanceChange,
        editMatch?.team1Name
      )}
      {team2Players?.length > 0 && renderPerformanceFields(
        team2Players,
        editMatch?.team2Perf,
        handleTeam2PerformanceChange,
        editMatch?.team2Name
      )}
    </Box>
  );
};