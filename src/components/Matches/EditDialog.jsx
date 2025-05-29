import React from 'react';
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Close,
  Save,
} from '@mui/icons-material';
import { StyledDialogTitle } from '@/style/Matches';
import { styled, keyframes } from '@mui/material/styles';
import { EmojiEvents, SportsCricket, Public, Timer } from '@mui/icons-material';

// Add animations
const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Styled components
const AnimatedContent = styled(Box)`
  animation: ${slideIn} 0.3s ease-out;
`;

const StyledFormControl = styled(FormControl)`
  & .MuiOutlinedInput-root {
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
  }
`;

export const EditDialog = ({editDialogOpen, setEditDialogOpen, setEditMatch, editMatch, handleSaveEdit, tournament}) => {
  const isCricket = tournament?.gameType === 'cricket';

  // Numeric validation function
  const handleNumericInput = (value, field) => {
    // Remove any non-numeric characters except dot for overs
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // For current over, ensure only one decimal point and max 1 digit after decimal
    if (field === 'currentOver') {
      const parts = numericValue.split('.');
      if (parts.length > 1) {
        return `${parts[0]}.${parts[1].slice(0, 1)}`;
      }
    }

    return numericValue;
  };

  // Add this function to handle points distribution
  const handlePointsChange = (value) => {
    const numericValue = handleNumericInput(value, 'points');
    updatePointsDistribution(numericValue, editMatch?.winner);
  };

  // Add new function for points distribution
  const updatePointsDistribution = (points, winner) => {
    setEditMatch(prev => ({
      ...prev,
      totalPoints: points,
      team1Points: winner === prev.team1Name ? points : 
                  winner === 'Draw' ? (Number(points)/2).toString() : '0',
      team2Points: winner === prev.team2Name ? points : 
                  winner === 'Draw' ? (Number(points)/2).toString() : '0'
    }));
  };

  return (
    <Dialog 
      open={editDialogOpen} 
      onClose={() => setEditDialogOpen(false)}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          background: 'linear-gradient(to bottom, #ffffff, #f8faff)'
        }
      }}
    >
      <StyledDialogTitle
        sx={{
          background: 'linear-gradient(135deg, #2196F3, #1976D2)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <SportsCricket sx={{ fontSize: 28 }} />
        Edit Match
        <IconButton
          onClick={() => setEditDialogOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            '&:hover': {
              transform: 'rotate(90deg)',
              transition: 'transform 0.3s ease'
            }
          }}
        >
          <Close />
        </IconButton>
      </StyledDialogTitle>

      <DialogContent>
        {editMatch && (
          <AnimatedContent sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              {/* Team 1 Score */}
              <Grid item xs={12} md={6}>
                <TextField
                  label={isCricket ? `${editMatch.team1Name} (Runs/Wickets)` : `${editMatch.team1Name} Goals`}
                  placeholder={isCricket ? "Example: 156/4" : "Example: 2"}
                  fullWidth
                  value={editMatch?.team1Score || ''}
                  sx={{ mt: 2 }}
                  onChange={(e) => setEditMatch({
                    ...editMatch,
                    team1Score: e.target.value
                  })}
                />
              </Grid>

              {/* Team 2 Score */}
              <Grid item xs={12} md={6}>
                <TextField
                  label={isCricket ? `${editMatch.team2Name} (Runs/Wickets)` : `${editMatch.team2Name} Goals`}
                  placeholder={isCricket ? "Example: 123/7" : "Example: 1"}
                  fullWidth
                  value={editMatch?.team2Score || ''}
                  sx={{ mt: 2 }}
                  onChange={(e) => setEditMatch({
                    ...editMatch,
                    team2Score: e.target.value
                  })}
                />
              </Grid>

           {/* Match Progress */}
              {editMatch?.status === 'live' && (
                <Grid item xs={12} md={6}>
                  <TextField
                    label={isCricket ? "Current Over" : "Current Time (Minutes)"}
                    placeholder={isCricket ? "Example: 12.4" : "Example: 75"}
                    fullWidth
                    value={isCricket ? editMatch?.currentOver || '' : editMatch?.currentTime || ''}
                    onChange={(e) => {
                      const value = isCricket ? 
                        handleNumericInput(e.target.value, 'currentOver') : 
                        handleNumericInput(e.target.value, 'currentTime');
                      
                      setEditMatch({
                        ...editMatch,
                        [isCricket ? 'currentOver' : 'currentTime']: value
                      });
                    }}
                    inputProps={{
                      inputMode: 'decimal',
                      pattern: isCricket ? '[0-9]*[.]{0,1}[0-9]{0,1}' : '[0-9]*'
                    }}
                  />
                </Grid>
              )}

              {/* Winner Selection for Completed Matches */}
              {editMatch?.status === 'completed' && (
                <Grid item xs={12} md={6}>
                  <StyledFormControl fullWidth>
                    <InputLabel>Select Winner</InputLabel>
                    <Select
                      value={editMatch?.winner || ''}
                      label="Select Winner"
                      onChange={(e) => {
                        const newWinner = e.target.value;
                        updatePointsDistribution(editMatch?.totalPoints || '0', newWinner);
                        setEditMatch(prev => ({
                          ...prev,
                          winner: newWinner
                        }));
                      }}
                      startAdornment={
                        <EmojiEvents sx={{ ml: 1, color: '#FFC107' }} />
                      }
                    >
                      <MenuItem value={editMatch?.team1Name}>
                        {editMatch?.team1Name}
                      </MenuItem>
                      <MenuItem value={editMatch?.team2Name}>
                        {editMatch?.team2Name}
                      </MenuItem>
                          <MenuItem value={'Draw'}>
                         Draw
                      </MenuItem>
                    </Select>
                  </StyledFormControl>
                </Grid>
              )}

              {/* Match Status */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Match Status</InputLabel>
                  <Select
                    value={editMatch?.status || 'upcoming'}
                    label="Match Status"
                    onChange={(e) => setEditMatch({
                      ...editMatch,
                      status: e.target.value,
                      // Reset winner when status changes from completed
                      winner: e.target.value !== 'completed' ? '' : editMatch?.winner
                    })}
                  >
                    <MenuItem value="upcoming">Upcoming</MenuItem>
                    <MenuItem value="live">Live</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Venue */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Venue"
                  fullWidth
                  value={editMatch?.venue || ''}
                  onChange={(e) => setEditMatch({
                    ...editMatch,
                    venue: e.target.value
                  })}
                />
              </Grid>

              {/* Additional Info for Cricket */}
              {isCricket && editMatch?.status === 'live' && (
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Total Overs"
                    placeholder="Example: 20"
                    fullWidth
                    value={editMatch?.overs || ''}
                    onChange={(e) => {
                      const value = handleNumericInput(e.target.value, 'totalOvers');
                      setEditMatch({
                        ...editMatch,
                        overs: value
                      });
                    }}
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*'
                    }}
                  />
                </Grid>
              )}

              {/* Add Points System for Completed Matches */}
              {editMatch?.status === 'completed' && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Total Match Points"
                      fullWidth
                      value={editMatch?.totalPoints || ''}
                      onChange={(e) => handlePointsChange(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <Box sx={{ mr: 1, color: '#4CAF50' }}>
                            <EmojiEvents />
                          </Box>
                        )
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                          }
                        }
                      }}
                    />
                  </Grid>
                  
                  {/* Points Preview with enhanced styling */}
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      <Typography 
                        variant="subtitle1" 
                        gutterBottom
                        sx={{ 
                          color: '#1976D2',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        <EmojiEvents sx={{ color: '#FFC107' }} />
                        Points Distribution
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        {[
                          { team: editMatch?.team1Name, points: editMatch?.team1Points },
                          { team: editMatch?.team2Name, points: editMatch?.team2Points }
                        ].map((item, index) => (
                          <Box 
                            key={index}
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              p: 1.5,
                              borderRadius: 1,
                              bgcolor: item.team === editMatch?.winner ? 'rgba(33, 150, 243, 0.1)' : 'transparent',
                              border: '1px solid',
                              borderColor: item.team === editMatch?.winner ? '#2196F3' : 'transparent'
                            }}
                          >
                            <Typography variant="body1">
                              {item.team}
                            </Typography>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                color: item.team === editMatch?.winner ? '#2196F3' : 'text.secondary',
                                fontWeight: 600
                              }}
                            >
                              {item.points || '0'} pts
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </AnimatedContent>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, background: '#f8faff' }}>
        <Button 
          onClick={() => setEditDialogOpen(false)}
          sx={{ 
            borderRadius: 2,
            '&:hover': { transform: 'translateY(-2px)' }
          }}
        >
          Cancel
        </Button>
        <Button 
          variant="contained"
          onClick={handleSaveEdit}
          startIcon={<Save />}
          sx={{ 
            borderRadius: 2,
            background: 'linear-gradient(135deg, #2196F3, #1976D2)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)'
            }
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};