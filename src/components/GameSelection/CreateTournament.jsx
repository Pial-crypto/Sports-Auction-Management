import React from 'react';
import PropTypes from 'prop-types';
import { Grid, CardMedia, CardContent, Typography, Box, Fade, Zoom, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { CheckCircle, Cancel, AttachMoney } from '@mui/icons-material';
import { TournamentCard } from '@/style/GameSelection';
import { StatusChip } from '@/style/GameSelection';

const CreateTournament = ({ createTournamentSteps, formData, setFormData }) => {
  return (
    <Fade in={true} timeout={500}>
      <Grid container spacing={3}>
        {createTournamentSteps.map((step, index) => (
          <Grid item xs={12} sm={6} md={3} key={step.id}>
            <Zoom in={true} timeout={500 + index * 100}>
              <TournamentCard>
                <CardMedia
                  component="img"
                  height="140"
                  image={step.image}
                  alt={step.name}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    {step.icon}
                    <Typography variant="h6" fontWeight="bold">
                      {step.name}
                    </Typography>
                  </Box>
                  {step.component === 'GameTypeSelector' && (
                    <FormControl fullWidth>
                      <InputLabel>Select Sport</InputLabel>
                      <Select
                        value={formData.gameType}
                        onChange={(e) => setFormData({ ...formData, gameType: e.target.value })}
                        label="Select Sport"
                      >
                        {step.options.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {option.icon}
                              <Typography>{option.label}</Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                  {step.component === 'RulesEditor' && (
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Tournament Rules"
                      value={formData.rules}
                      onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                    />
                  )}
                  {step.component === 'BudgetPlanner' && (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Registration Fee"
                          value={formData.registrationFee}
                          onChange={(e) => setFormData({ ...formData, registrationFee: e.target.value })}
                          InputProps={{
                            startAdornment: <AttachMoney />,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Prize Money"
                          value={formData.prizeMoney}
                          onChange={(e) => setFormData({ ...formData, prizeMoney: e.target.value })}
                          InputProps={{
                            startAdornment: <AttachMoney />,
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}
                  {step.component === 'TeamSetup' && (
                    <FormControl fullWidth>
                      <InputLabel>Number of Teams</InputLabel>
                      <Select
                        value={formData.numberOfTeams}
                        onChange={(e) => setFormData({ ...formData, numberOfTeams: e.target.value })}
                        label="Number of Teams"
                      >
                        {step.teamOptions.map((num) => (
                          <MenuItem value={num} key={num}>{num} Teams</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </CardContent>
              </TournamentCard>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Fade>
  );
};

CreateTournament.propTypes = {
  createTournamentSteps: PropTypes.array.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default CreateTournament;
