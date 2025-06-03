import React from 'react';
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Chip,
  IconButton,
  Zoom,
  Tooltip as MuiTooltip,
  Avatar
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  LocationOn,
  Timer,
  CalendarToday,
  Visibility,
  Edit,
  Delete,
  EmojiEvents,
  Celebration
} from '@mui/icons-material';
import { keyframes } from '@mui/system';
import { Timeline } from '@mui/icons-material';
import { ScoreBoard } from './ScoreBoard';
import { getTeamColor,getTeamInitials } from '@/function/handleMatchesPage';
import { useState } from 'react';


import { StyledCard, MatchStatusChip } from '@/style/Matches';
import { getFilteredMatches } from '@/function/handleMatchesPage';
import storage from '@/class/storage';

const winnerGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(25, 118, 210, 0.5); }
  50% { box-shadow: 0 0 20px rgba(25, 118, 210, 0.8); }
  100% { box-shadow: 0 0 5px rgba(25, 118, 210, 0.5); }
`;

// Add new animations
const cardHover = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const scoreGlow = keyframes`
  0% { text-shadow: 0 0 5px rgba(25, 118, 210, 0.3); }
  50% { text-shadow: 0 0 15px rgba(25, 118, 210, 0.5); }
  100% { text-shadow: 0 0 5px rgba(25, 118, 210, 0.3); }
`;

const CARD_COLORS = {
  background: 'rgba(25, 118, 210, 0.02)',
  border: 'rgba(25, 118, 210, 0.08)',
  hover: 'rgba(25, 118, 210, 0.05)'
};



export const MatchCard = ({tabValue, matches, handleViewDetails, handleDeleteMatch, handleEditMatch,playerPerformances,tournament}) => {

   // Add this state
  const [scoreBoardOpen, setScoreBoardOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);


  //console.log(tournament,"Tournament inside match card")
  // Add this function
  const handleShowScoreBoard = (match) => {
    setSelectedMatch(match);
    setScoreBoardOpen(true);
  };

  return (
    <Grid container spacing={3}>
      {getFilteredMatches(tabValue, matches).map((match, index) => (
        <Grid item xs={12} md={6} key={match?.id || index}>
          <Zoom in={true} timeout={500 + (index * 100)}>
            <StyledCard
              sx={{
                bgcolor: CARD_COLORS.background,
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                transition: 'all 0.4s ease',
                border: '1px solid',
                borderColor: CARD_COLORS.border,
                position: 'relative',
                overflow: 'visible',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
                  borderColor: 'rgba(33,150,243,0.3)',
                  bgcolor: CARD_COLORS.hover,
                  '& .action-buttons': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  }
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                  zIndex: 0
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Status & Venue Section */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.04) 100%)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <MatchStatusChip
                    icon={match?.status === 'live' ? 
                      <Timer sx={{ animation: `${cardHover} 2s infinite` }}/> : 
                      <CalendarToday />
                    }
                    label={(match?.status || 'N/A').toUpperCase()}
                    status={match?.status || 'N/A'}
                    sx={{
                      '& .MuiChip-label': {
                        fontWeight: 600,
                        textShadow: match?.status === 'live' ? '0 0 10px rgba(76,175,80,0.3)' : 'none'
                      }
                    }}
                  />
                  <Typography 
                    variant="body1" // Changed from subtitle2
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 1,
                      color: 'primary.main',
                      fontWeight: 500,
                      fontSize: '1rem',
                      '& .MuiSvgIcon-root': {
                        fontSize: '1.5rem',
                        color: 'primary.main'
                      }
                    }}
                  >
                    <LocationOn />
                    {match?.venue || 'N/A'}
                  </Typography>
                </Box>

                {/* Teams Section - Updated */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                  p: 4, // Increased padding
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.03) 100%)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  gap: 4 // Increased spacing between elements
                }}>
                  {/* Add Winner Banner if status is completed */}
                  {match?.status === 'completed' && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bgcolor: 'primary.main',
                        color: 'white',
                        px: 4,
                        py: 1,
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        animation: `${winnerGlow} 2s infinite`,
                        border: '2px solid',
                        borderColor: 'rgba(255,255,255,0.3)',
                        boxShadow: '0 4px 20px rgba(25,118,210,0.4)',
                        zIndex: 2,
                      }}
                    >
                      <EmojiEvents sx={{ fontSize: 24, animation: `${cardHover} 2s infinite` }} />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: 2,
                          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        Winner: {match?.winner || 'Draw'}
                      </Typography>
                      <Celebration sx={{ fontSize: 24, animation: `${cardHover} 2s infinite ease 1s` }} />
                    </Box>
                  )}

                  {/* Team 1 Box - Update styles when team is winner */}
                  <Box sx={{ 
                    textAlign: 'center',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: match?.status === 'completed' && match?.winner === match?.team1Name ? 
                      'rgba(25,118,210,0.08)' : 'transparent',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1
                  }}>
                    <Avatar
                      sx={{
                        bgcolor: getTeamColor(match?.team1Name || 'N/A'),
                        width: 75, // Increased size
                        height: 75,
                        fontSize: '1.8rem',
                        marginBottom: 2,
                        fontWeight: 'bold',
                        background: `linear-gradient(135deg, ${getTeamColor(match?.team1Name || 'N/A')} 0%, ${alpha(getTeamColor(match?.team1Name || 'N/A'), 0.8)} 100%)`,
                        boxShadow: `0 4px 20px ${alpha(getTeamColor(match?.team1Name || 'N/A'), 0.4)}`,
                        border: '4px solid white',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1) rotate(5deg)'
                        }
                      }}
                    >
                      {getTeamInitials(match?.team1Name || 'N/A')}
                    </Avatar>
                    <Typography 
                      variant="h6" // Changed from subtitle1
                      sx={{ 
                        mt: 1, 
                        fontWeight: match?.status === 'completed' && match?.winner === match?.team1Name ? 700 : 600,
                        color: match?.status === 'completed' && match?.winner === match?.team1Name ? '#1976d2' : 'text.primary',
                        fontSize: '1.2rem',
                        textAlign: 'center',
                        width: '100%'
                      }}
                    >
                      {match?.team1Name || 'N/A'}
                    </Typography>
                    {match.status !== 'upcoming' && (
                      <Typography variant="h4" 
                        sx={{ 
                          color: match?.status === 'completed' && match?.winner === match?.team1Name ? 
                            '#1976d2' : 'text.primary',
                          fontWeight: 800,
                          animation: match?.status === 'live' ? `${scoreGlow} 2s infinite` : 'none',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.1)'
                          }
                        }}
                      >
                        {match?.team1Score || 'N/A'}
                      </Typography>
                    )}
                  </Box>

                  {/* VS Section - Keep existing styles */}
                  <Box sx={{ 
                    textAlign: 'center',
                    px: 2,
                    mx: 3 // Added horizontal margin
                  }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        color: match?.status === 'completed' ? '#1976d2' : 'text.secondary',
                        fontWeight: match?.status === 'completed' ? 700 : 500 
                      }}
                    >
                      {match?.status === 'completed' ? 'FINISHED' : 'VS'}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        color: '#1976d2',
                        fontWeight: 600,
                        bgcolor: 'rgba(25,118,210,0.08)',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        mt: 1
                      }}
                    >
                      {match?.type || 'N/A'}
                    </Typography>
                  </Box>

                  {/* Team 2 Box - Similar updates as Team 1 */}
                  <Box sx={{ 
                    textAlign: 'center',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: match?.status === 'completed' && match?.winner === match?.team2Name ? 
                      'rgba(25,118,210,0.08)' : 'transparent',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1
                  }}>
                    <Avatar
                      sx={{
                        bgcolor: getTeamColor(match?.team2Name || 'N/A'),
                        width: 75, // Increased size
                        height: 75,
                        fontSize: '1.8rem',
                        marginBottom: 2,
                        fontWeight: 'bold',
                        background: `linear-gradient(135deg, ${getTeamColor(match?.team2Name || 'N/A')} 0%, ${alpha(getTeamColor(match?.team2Name || 'N/A'), 0.8)} 100%)`,
                        boxShadow: `0 4px 20px ${alpha(getTeamColor(match?.team2Name || 'N/A'), 0.4)}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1) rotate(5deg)'
                        }
                      }}
                    >
                      {getTeamInitials(match?.team2Name || 'N/A')}
                    </Avatar>
                    <Typography 
                      variant="h6" // Changed from subtitle1
                      sx={{ 
                        mt: 1, 
                        fontWeight: 600,
                        fontSize: '1.2rem',
                        textAlign: 'center',
                        width: '100%'
                      }}
                    >
                      {match?.team2Name || 'N/A'}
                    </Typography>
                  {match.status!='upcoming'  &&( <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 800, animation: match?.status === 'live' ? `${scoreGlow} 2s infinite` : 'none', transition: 'all 0.3s ease', '&:hover': { transform: 'scale(1.1)' } }}>
                      {match?.team2Score || 'N/A'}
                    </Typography>
                  )

                  }
                  </Box>
                </Box>

                {/* Live Match Info */}
                {match?.status === 'live' && (
                  <Box sx={{ 
                    bgcolor: 'rgba(76,175,80,0.08)', 
                    p: 1.5,
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    border: '1px solid',
                    borderColor: 'rgba(76,175,80,0.2)'
                  }}>
                    <Typography sx={{ color: '#2e7d32', fontWeight: 600 }}>
                      <Timer sx={{ fontSize: 18, mr: 1, verticalAlign: 'text-bottom' }} />
                      LIVE • Over {match?.currentOver || 'N/A'}
                    </Typography>
                    <Chip 
                      label={`${match?.overs || 'N/A'} Overs`}
                      size="small"
                      sx={{ 
                        bgcolor: '#fff',
                        fontWeight: 500
                      }}
                    />
                  </Box>
                )}

                {/* Action Buttons */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: 1,
                  mt: 2,
                  pt: 2,
                  borderTop: '1px solid rgba(0,0,0,0.08)'
                }}>

                  <>

                     { (
            <MuiTooltip title="View Scoreboard">
              <IconButton 
                size="small" 
                sx={{ 
                  bgcolor: 'success.light',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(76,175,80,0.4)',
                  '&:hover': {
                    bgcolor: 'success.main',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(76,175,80,0.6)',
                  }
                }}
                onClick={() => handleShowScoreBoard(match)}
              >
                <Timeline />
              </IconButton>
            </MuiTooltip>
          )}
                  <MuiTooltip title="View Details">
                    <IconButton 
                      size="small" 
                      sx={{ 
                        bgcolor: 'primary.main',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(25,118,210,0.4)',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 16px rgba(25,118,210,0.6)',
                        }
                      }}
                      onClick={() => handleViewDetails(match)}
                    >
                      <Visibility />
                    </IconButton>
                  </MuiTooltip>


                   {/* Add ScoreBoard Dialog */}
      <ScoreBoard
      playerPerformances={playerPerformances.filter((performance)=>performance.matchId==match.id)}
        open={scoreBoardOpen}
        onClose={() => setScoreBoardOpen(false)}
        match={match}
        sport={ tournament && tournament.gameType.toLowerCase() || 'football'}
      />
                  </>
                  
             {    
             storage.get("user").role === "organizer" &&
             <>
             
             <MuiTooltip title="Edit Match">
                    <IconButton 
                      size="small" 
                      sx={{ bgcolor: alpha('#4CAF50', 0.1) }}
                      onClick={() => handleEditMatch(match)}
                    >
                      <Edit sx={{ color: '#4CAF50' }} />
                    </IconButton>
                  </MuiTooltip>
                  <MuiTooltip title="Delete Match">
                    <IconButton 
                      size="small" 
                      sx={{ bgcolor: alpha('#F44336', 0.1) }}
                      onClick={() => handleDeleteMatch(match)}
                    >
                      <Delete sx={{ color: '#F44336' }} />
                    </IconButton>
                  </MuiTooltip>
</>
             }
                </Box>
              </CardContent>
            </StyledCard>
          </Zoom>
        </Grid>
      ))}
    </Grid>
  );
};