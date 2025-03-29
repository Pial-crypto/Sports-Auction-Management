import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  IconButton,
  Slide,
} from '@mui/material';
import { Close, SportsCricket, SportsSoccer, Sports } from '@mui/icons-material';
import { COLORS } from '@/style/JoinTournament';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const PlayerInfoDialog = ({ open, onClose, onSubmit, tournament }) => {

  //console.log(tournament,"I am the tournament")
  const initialFormState = {
    name: '',
    age: '',
    role: '',
    experience: '',
    previousTeam: '',
    achievements: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [open]);

  const getSportIcon = (sport) => {
    switch(sport) {
      case 'cricket':
        return <SportsCricket sx={{ fontSize: 40 }} />;
      case 'football':
        return <SportsSoccer sx={{ fontSize: 40 }} />;
      default:
        return <Sports sx={{ fontSize: 40 }} />;
    }
  };

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    // Age validation
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) < 15) {
      newErrors.age = 'Minimum age should be 15 years';
    }
    
    if (!formData.role) newErrors.role = 'Position is required';
    
    // Experience validation
    if (!formData.experience) {
      newErrors.experience = 'Experience is required';
    } else if (parseInt(formData.experience) < 0) {
      newErrors.experience = 'Experience cannot be negative';
    }

    // Additional fields validation
    if (!formData.previousTeam.trim()) newErrors.previousTeam = 'Previous team is required';
    if (!formData.achievements.trim()) newErrors.achievements = 'Achievements are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      setFormData(initialFormState); // Reset form after submission
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' }}
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden',
        }
      }}
    >
      <DialogTitle
        sx={{
          background: `linear-gradient(135deg, ${COLORS[tournament?.sport || 'cricket'].primary}, ${COLORS[tournament?.sport || 'cricket'].secondary})`,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {getSportIcon(tournament?.sport)}
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Join {tournament?.name}
            </Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
              {tournament?.format}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        <Grid container spacing={3}>
          {/* Personal Information Section */}
          <Grid item xs={12}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: COLORS[tournament?.sport || 'cricket'].primary }}>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={formData.name}
                    onChange={handleChange('name')}
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange('age')}
                    required
                    error={!!errors.age}
                    helperText={errors.age}
                    inputProps={{ min: 15 }}
                  />
                </Grid>
              </Grid>
            </MotionBox>
          </Grid>

          {/* Sport Specific Section */}
          <Grid item xs={12}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: COLORS[tournament?.sport || 'cricket'].primary }}>
                Sport Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Primary Position</InputLabel>
                    <Select
                      value={formData.role}
                      label="Primary Position"
                      onChange={handleChange('role')}
                      error={!!errors.role}
                    >
                      {tournament?.playerRequirements.positions.map((position) => (
                        <MenuItem key={position} value={position}>
                          {position}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Years of Experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleChange('experience')}
                    required
                    error={!!errors.experience}
                    helperText={errors.experience}
                    inputProps={{ min: 0 }}
                  />
                </Grid>
              </Grid>
            </MotionBox>
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: COLORS[tournament?.sport || 'cricket'].primary }}>
                Additional Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Previous Team"
                    value={formData.previousTeam}
                    onChange={handleChange('previousTeam')}
                    required
                    error={!!errors.previousTeam}
                    helperText={errors.previousTeam}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Achievements"
                    value={formData.achievements}
                    onChange={handleChange('achievements')}
                    required
                    error={!!errors.achievements}
                    helperText={errors.achievements}
                  />
                </Grid>
              </Grid>
            </MotionBox>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions 
        sx={{ 
          p: 3,
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: COLORS[tournament?.sport || 'cricket'].primary,
            color: COLORS[tournament?.sport || 'cricket'].primary,
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          disabled={
            !formData.name || 
            !formData.age || 
            parseInt(formData.age) < 15 || 
            !formData.role || 
            !formData.experience || 
            parseInt(formData.experience) < 0 ||
            !formData.previousTeam ||
            !formData.achievements
          }
          sx={{
            background: `linear-gradient(135deg, ${COLORS[tournament?.sport || 'cricket'].primary}, ${COLORS[tournament?.sport || 'cricket'].secondary})`,
            '&:hover': {
              background: `linear-gradient(135deg, ${COLORS[tournament?.sport || 'cricket'].secondary}, ${COLORS[tournament?.sport || 'cricket'].primary})`,
            },
          }}
        >
          Submit Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlayerInfoDialog; 