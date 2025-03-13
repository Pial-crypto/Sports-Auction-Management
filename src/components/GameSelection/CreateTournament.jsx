import React from 'react';
import PropTypes from 'prop-types';
import { 
  Grid, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  Fade, 
  Zoom, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField,
  IconButton,
  styled
} from '@mui/material';
import { 
  AttachMoney,
  CalendarMonth,
  ChevronLeft,
  ChevronRight,
  AddPhotoAlternate
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { TournamentCard } from '@/style/GameSelection';

const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: '12px',
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.dark,
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const CreateTournament = ({ createTournamentSteps, formData, setFormData }) => {
  return (
    <Fade in={true} timeout={500}>
      <Grid container spacing={3}>
        {createTournamentSteps.map((step, index) => (
          <Grid item xs={12} sm={6} md={3} key={step.id}>
            <Zoom in={true} timeout={500 + index * 100}>
              <TournamentCard>
                <CardMedia component="img" height="140" image={step.image} alt={step.name} />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    {step.icon}
                    <Typography variant="h6" fontWeight="bold">{step.name}</Typography>
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
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Tournament Date"
                            value={formData.tournamentDate}
                            onChange={(newDate) => setFormData({ ...formData, tournamentDate: newDate })}
                            sx={{ width: '100%', mb: 2 }}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={4}>
                            <input
                              type="file"
                              accept="image/*"
                              id="tournament-icon"
                              style={{ display: 'none' }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    setFormData({ ...formData, tournamentIcon: e.target.result });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                            <label htmlFor="tournament-icon">
                              <UploadBox>
                                {formData.tournamentIcon ? (
                                  <Box
                                    component="img"
                                    src={formData.tournamentIcon}
                                    alt="Tournament Icon"
                                    sx={{
                                      width: '100%',
                                      height: '120px',
                                      objectFit: 'contain',
                                      borderRadius: '8px',
                                    }}
                                  />
                                ) : (
                                  <>
                                    <AddPhotoAlternate sx={{ fontSize: '3rem', color: 'primary.main' }} />
                                    <Typography color="primary" variant="body2">Tournament Icon</Typography>
                                    {/* <Typography color="textSecondary" variant="caption">Click to select an image</Typography> */}
                                  </>
                                )}
                              </UploadBox>
                            </label>
                          </Grid>
                          <Grid item xs={12} md={8}>
                            <TextField
                              fullWidth
                              multiline
                              rows={3}
                              label="Tournament Rules"
                              value={formData.rules}
                              onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  backgroundColor: 'background.paper',
                                  transition: 'all 0.3s ease-in-out',
                                  '&:hover': {
                                    backgroundColor: 'background.default',
                                    '& fieldset': {
                                      borderColor: 'primary.main',
                                    },
                                  },
                                },
                                '& .MuiInputLabel-root': {
                                  color: 'primary.main',
                                },
                                maxHeight: '120px',
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
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