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
import { Close, SportsCricket, SportsSoccer, Sports, Group } from '@mui/icons-material';
import { COLORS } from '@/style/JoinTournament';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const TeamInfoDialog = ({ open, onClose, onSubmit, tournament }) => {
  const initialFormState = {
    teamName: '',
    managerName: '',
    contactNumber: '',
    email: '',
   
    previousTournaments: '',
    teamDescription: '',
    role: 'team', // Add role to identify this as a team registration
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setFormData(initialFormState);
      setErrors({});
      setIsSubmitting(false);
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
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required';
    if (!formData.managerName.trim()) newErrors.managerName = 'Manager name is required';
    
    // Contact validation
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid 10-digit phone number';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    


    if (!formData.previousTournaments.trim()) newErrors.previousTournaments = 'Previous tournaments information is required';
    if (!formData.teamDescription.trim()) newErrors.teamDescription = 'Team description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = () => {
    console.log(formData);
    if (validateForm()) {
      console.log(formData);
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
          <Group sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Register Team for {tournament?.name}
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
          {/* Team Information Section */}
          <Grid item xs={12}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: COLORS[tournament?.sport || 'cricket'].primary }}>
                Team Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Team Name"
                    value={formData.teamName}
                    onChange={handleChange('teamName')}
                    required
                    error={!!errors.teamName}
                    helperText={errors.teamName}
                  />
                </Grid>
               
              </Grid>
            </MotionBox>
          </Grid>

          {/* Manager Information Section */}
          <Grid item xs={12}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: COLORS[tournament?.sport || 'cricket'].primary }}>
                Manager Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Manager Name"
                    value={formData.managerName}
                    onChange={handleChange('managerName')}
                    required
                    error={!!errors.managerName}
                    helperText={errors.managerName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange('contactNumber')}
                    required
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    required
                    error={!!errors.email}
                    helperText={errors.email}
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
                    label="Previous Tournaments"
                    value={formData.previousTournaments}
                    onChange={handleChange('previousTournaments')}
                    required
                    error={!!errors.previousTournaments}
                    helperText={errors.previousTournaments}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Team Description"
                    value={formData.teamDescription}
                    onChange={handleChange('teamDescription')}
                    required
                    error={!!errors.teamDescription}
                    helperText={errors.teamDescription}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting || 
            !formData.teamName || 
            !formData.managerName || 
            !formData.contactNumber || 
            !formData.email || 
            !formData.previousTournaments ||
            !formData.teamDescription
          }
          sx={{
            background: `linear-gradient(135deg, ${COLORS[tournament?.sport || 'cricket'].primary}, ${COLORS[tournament?.sport || 'cricket'].secondary})`,
            '&:hover': {
              background: `linear-gradient(135deg, ${COLORS[tournament?.sport || 'cricket'].secondary}, ${COLORS[tournament?.sport || 'cricket'].primary})`,
            },
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeamInfoDialog; 