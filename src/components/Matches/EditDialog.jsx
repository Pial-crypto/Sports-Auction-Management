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

  return (
    <Dialog 
      open={editDialogOpen} 
      onClose={() => setEditDialogOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <StyledDialogTitle>
        Edit Match
        <IconButton
          onClick={() => setEditDialogOpen(false)}
          sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
        >
          <Close />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent>
        {editMatch && (
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2}>
              {/* Team 1 Score */}
              <Grid item xs={12} md={6}>
                <TextField
                  label={isCricket ? "Team 1 Score (Runs/Wickets)" : "Team 1 Goals"}
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
                  label={isCricket ? "Team 2 Score (Runs/Wickets)" : "Team 2 Goals"}
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
                  <FormControl fullWidth>
                    <InputLabel>Select Winner</InputLabel>
                    <Select
                      value={editMatch?.winner || ''}
                      label="Select Winner"
                      onChange={(e) => setEditMatch({
                        ...editMatch,
                        winner: e.target.value
                      })}
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
                  </FormControl>
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
            </Grid>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
        <Button 
          variant="contained"
          onClick={handleSaveEdit}
          startIcon={<Save />}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};