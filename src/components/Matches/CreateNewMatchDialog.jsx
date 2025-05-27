import React, { useState } from 'react';
import {
  IconButton, Button, Dialog, DialogContent,
  TextField, Grid, MenuItem, FormControl, InputLabel, Select,
  Typography, Zoom, Box, Avatar
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Close, Stadium, CalendarMonth, Groups, EmojiEvents,
  SportsCricket, Celebration
} from '@mui/icons-material';
import { 
  StyledDialogTitle,
  dialogStyles,
  teamSelectionStyles,
  inputStyles,
  submitButtonStyles,
  COLORS
} from '@/style/Matches';

import { getTeamInitials } from '@/function/handleMatchesPage';
import { handleSaveNew, handleValidation,getTeamColor,isTeamAlreadySelected } from '@/function/handleMatchesPage';
// Remove dummy teams and use actual tournament teams data
const matchTypes = ['League Match', 'Quarter Final', 'Semi Final', 'Final'];




export const CreateNewMatchDialog = ({ 
  createDialogOpen, 
  setCreateDialogOpen,
matches,
setMatches,
  tournamentTeams,
}) => {
  const [formData, setFormData] = useState({
    team1: {
      teamName: '', // Changed from name to teamName to match data structure
      managerId: '',
      managerName: '',
      managerEmail: '',
      managerNumber: '',
      teamDescription: '',
      approved: false,
      rejected: false,
      rejectionReason: '',
    },
    team2: {
      teamName: '', // Changed from name to teamName to match data structure
      managerId: '',
      managerName: '',
      managerEmail: '',
      managerNumber: '',
      teamDescription: '',
      approved: false,
      rejected: false,
      rejectionReason: '',
    },
    status: 'upcoming',
    date: '',
   // time: '',
    venue: '',
    type: ''
  });

  // Modified team selection handler to handle teamName properly
  const handleTeamChange = (teamNum, selectedTeam) => {
    setFormData(prev => ({
      ...prev,
      [`team${teamNum}`]: {
        ...selectedTeam
      }
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
    if(handleValidation(formData)){
      const newMatch={
        type: formData.type,
        venue: formData.venue,
        date: formData.date,
        team1Name: formData.team1.teamName,
        team2Name: formData.team2.teamName,
        team1Id: formData.team1.id,
        team2Id: formData.team2.id,
        status:formData.status,
        tournamentId: tournamentTeams[0]?.tournamentId, // Assuming all teams belong to the same tournament
      }
   handleSaveNew(newMatch, matches, setMatches, setCreateDialogOpen);
    }
  };

  return (
    <>
      {tournamentTeams && (
        <Dialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          maxWidth="md"
          fullWidth
          TransitionComponent={Zoom}
          PaperProps={{ sx: dialogStyles.paper }}
        >
          <StyledDialogTitle sx={dialogStyles.title}>
            <Box sx={dialogStyles.titleBox}>
              <SportsCricket sx={dialogStyles.cricketIcon} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Create New Match
              </Typography>
            </Box>
            <IconButton
              onClick={() => setCreateDialogOpen(false)}
              sx={dialogStyles.closeButton}
            >
              <Close />
            </IconButton>
          </StyledDialogTitle>
          
          <DialogContent sx={dialogStyles.content}>
            <Grid container spacing={3}>
              {/* Match Type */}
              <Grid item xs={12} md={6}>
                 <Typography variant="h6" sx={teamSelectionStyles.title}>
                 <EmojiEvents sx={teamSelectionStyles.teamIcon} />
                    Stage
                  </Typography>
                <FormControl fullWidth>
                  {/* <InputLabel>Match Stage</InputLabel> */}
                  <Select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    // startAdornment={<EmojiEvents sx={teamSelectionStyles.teamIcon} />}
                  >
                    {matchTypes.map((type) => (
                      <MenuItem 
                        key={type} 
                        value={type}
                         sx={teamSelectionStyles.menuItem}
                      >
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Updated Team Selection with fixed value handling */}
              <Grid item xs={12}>
                <Box sx={teamSelectionStyles.container}>
                  <Typography variant="h6" sx={teamSelectionStyles.title}>
                    <Groups sx={teamSelectionStyles.teamIcon} />
                    Select Teams
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {[1, 2].map((teamNum) => (
                      <Grid item xs={12} md={6} key={teamNum}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id={`team${teamNum}-label`} sx={{ 
                            background: '#fff',
                            padding: '0 8px',
                          }}>
                            Team {teamNum}
                          </InputLabel>
                          <Select
                            labelId={`team${teamNum}-label`}
                            value={formData[`team${teamNum}`].teamName || ''}
                            onChange={(e) => {
                              const team = tournamentTeams.find(t => t.teamName === e.target.value);
                              if (team && !isTeamAlreadySelected(team, formData, teamNum)) {
                                handleTeamChange(teamNum, team);
                              }
                            }}
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(0, 0, 0, 0.23)',
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: COLORS.secondary.main,
                              },
                            }}
                          >
                            {tournamentTeams.map((team) => {
                              const isDisabled = isTeamAlreadySelected(team, formData, teamNum);
                              return (
                                <MenuItem 
                                  key={team.id} 
                                  value={team.teamName}
                                  disabled={isDisabled}
                                  sx={{
                                    ...teamSelectionStyles.menuItem,
                                    opacity: isDisabled ? 0.5 : 1,
                                  }}
                                >
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar
                                      sx={{
                                        bgcolor: getTeamColor(team.teamName),
                                        width: 40,
                                        height: 40,
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        boxShadow: `0 0 10px ${alpha(getTeamColor(team.teamName), 0.3)}`
                                      }}
                                    >
                                      {getTeamInitials(team.teamName)}
                                    </Avatar>
                                    <Box>
                                      <Typography sx={{ fontWeight: 'bold' }}>
                                        {team.teamName}
                                      </Typography>
                                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                        {team.managerName}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>

              {/* Venue */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Venue"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  InputProps={{
                    startAdornment: <Stadium sx={inputStyles.icon} />
                  }}
                  sx={inputStyles.venue}
                />
              </Grid>

              {/* Date */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  InputProps={{
                    startAdornment: <CalendarMonth sx={inputStyles.icon} />
                  }}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                  startIcon={<Celebration />}
                  sx={submitButtonStyles.button}
                >
                  Create Match
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

