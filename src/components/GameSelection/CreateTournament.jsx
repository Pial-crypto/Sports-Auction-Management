import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
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
  TextField} from '@mui/material';
import { 
  AttachMoney,
  AddPhotoAlternate} from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { rulesTextFieldStyle, TournamentCard } from '@/style/GameSelection';
import { UploadBox } from '@/style/GameSelection';

const CreateTournament = ({ createTournamentSteps, formData, setFormData }) => {
  const defaultDates = {
    tournamentDate: formData.tournamentDate || null,
    registrationDeadline: formData.registrationDeadline || null,
    auctionDate: formData.auctionDate || null
  };

  const handleDateChange = (field) => (newValue) => {
    if (newValue && dayjs.isDayjs(newValue)) {
      setFormData(prev => ({
        ...prev,
        [field]: newValue
      }));
    }
  };

  return (
    <Fade in={true} timeout={500}>
      <Box>
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
                      <FormControl fullWidth required>
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
                          <Typography variant="subtitle1" color="primary" gutterBottom>
                            Tournament Schedule
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  label="Tournament Start Date"
                                  value={defaultDates.tournamentDate}
                                  onChange={handleDateChange('tournamentDate')}
                                  sx={{ width: '100%', mb: 2 }}
                                  slotProps={{ textField: { required: true } }}
                                  minDate={dayjs()}
                                />
                              </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  label="Registration Deadline"
                                  value={defaultDates.registrationDeadline}
                                  onChange={handleDateChange('registrationDeadline')}
                                  sx={{ width: '100%', mb: 2 }}
                                  slotProps={{ textField: { required: true } }}
                                  minDate={defaultDates.tournamentDate || dayjs()}
                                />
                              </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  label="Auction Date"
                                  value={defaultDates.auctionDate}
                                  onChange={handleDateChange('auctionDate')}
                                  sx={{ width: '100%', mb: 2 }}
                                  slotProps={{ textField: { required: true } }}
                                  minDate={defaultDates.registrationDeadline || dayjs()}
                                />
                              </LocalizationProvider>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" color="primary" gutterBottom>
                            Tournament Media
                          </Typography>
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
                                    </>
                                  )}
                                </UploadBox>
                              </label>
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <TextField
                                fullWidth
                                required
                                multiline
                                rows={3}
                                label="Tournament Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                sx={rulesTextFieldStyle}
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
                            required
                            type="number"
                            label="Total Budget"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                            InputProps={{
                              startAdornment: <AttachMoney />,
                              inputProps: { min: 500 }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            required
                            type="number"
                            label="Registration Fee"
                            value={formData.registrationFee}
                            onChange={(e) => setFormData({ ...formData, registrationFee: Number(e.target.value) })}
                            InputProps={{
                              startAdornment: <AttachMoney />,
                              inputProps: { min: 100 }
                            }}
                            helperText="Minimum fee: 100"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            required
                            type="number"
                            label="Prize Money"
                            value={formData.prizeMoney}
                            onChange={(e) => setFormData({ ...formData, prizeMoney: Number(e.target.value) })}
                            InputProps={{
                              startAdornment: <AttachMoney />,
                              inputProps: { min: 50}
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            required
                            type="number"
                            label="Venue Budget"
                            value={formData.venueBudget}
                            onChange={(e) => setFormData({ ...formData, venueBudget: Number(e.target.value) })}
                            InputProps={{
                              startAdornment: <AttachMoney />,
                              inputProps: { min: 50}
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            required
                            type="number"
                            label="Staff Budget"
                            value={formData.staffBudget}
                            onChange={(e) => setFormData({ ...formData, staffBudget: Number(e.target.value) })}
                            InputProps={{
                              startAdornment: <AttachMoney />,
                              inputProps: { min: 50}
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            required
                            type="number"
                            label="Equipment Budget"
                            value={formData.equipmentBudget}
                            onChange={(e) => setFormData({ ...formData, equipmentBudget: Number(e.target.value) })}
                            InputProps={{
                              startAdornment: <AttachMoney />,
                              inputProps: { min: 50}
                            }}
                          />
                        </Grid>
                      </Grid>
                    )}
                    {step.component === 'TeamSetup' && (
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControl fullWidth required>
                            <InputLabel>Number of Teams</InputLabel>
                            <Select
                              value={formData.numberOfTeams}
                              onChange={(e) => setFormData({ ...formData, numberOfTeams: e.target.value })}
                              label="Number of Teams"
                            >
                              {step.teamOptions.map((num) => (
                                num >= 6 &&
                                <MenuItem value={num} key={num}>{num} Teams</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            required
                            type="number"
                            label="Players Per Team"
                            value={formData.playersPerTeam}
                            onChange={(e) => setFormData({ ...formData, playersPerTeam: Number(e.target.value) })}
                            inputProps={{ min: 1 }}
                          />
                        </Grid>
                      </Grid>
                    )}
                  </CardContent>
                </TournamentCard>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fade>
  );
};

CreateTournament.propTypes = {
  createTournamentSteps: PropTypes.array.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default CreateTournament;