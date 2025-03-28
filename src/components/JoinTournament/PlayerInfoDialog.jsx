import React, { useState } from 'react';
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
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    role: '',
    experience: '',
    previousTeam: '',
    battingStyle: 'right',
    bowlingStyle: '',
    achievements: '',
  });

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
                    variant="outlined"
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
                    variant="outlined"
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
                    placeholder="Leave blank if none"
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
                    placeholder="List your achievements..."
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
          onClick={() => onSubmit(formData)}
          variant="contained"
          disabled={!formData.name || !formData.age || !formData.role}
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