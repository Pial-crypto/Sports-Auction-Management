
import React, { useState } from 'react';
import {
  Grid,
  Dialog,
    DialogTitle,
    DialogContent,
TextField,
  DialogActions,
  
  Button} from '@mui/material';


export const EditDialog = ({ open, onClose, practice, onSave }) => {
  const [editedPractice, setEditedPractice] = useState(practice || {
    type: 'practice',
    status: 'upcoming',
    title: '',
    date: '',
    time: '',
    venue: '',
    duration: '',
    focus: '',
    coach: ''
  });

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: '#f5f5f5',
        color: '#1976D2'
      }}>
        {practice ? 'Edit Practice Session' : 'New Practice Session'}
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Session Title"
              value={editedPractice.title}
              onChange={(e) => setEditedPractice({...editedPractice, 
                title: e.target.value})}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              value={editedPractice.date}
              onChange={(e) => setEditedPractice({...editedPractice, date: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="time"
              label="Time"
              value={editedPractice.time}
              onChange={(e) => setEditedPractice({...editedPractice, time: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Venue"
              value={editedPractice.venue}
              onChange={(e) => setEditedPractice({...editedPractice, venue: e.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Duration"
              value={editedPractice.duration}
              onChange={(e) => setEditedPractice({...editedPractice, duration: e.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Focus Areas"
              value={editedPractice.focus}
              onChange={(e) => setEditedPractice({...editedPractice, focus: e.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Coach"
              value={editedPractice.coach}
              onChange={(e) => setEditedPractice({...editedPractice, coach: e.target.value})}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={() => onSave(editedPractice)}
          variant="contained"
          sx={{
            bgcolor: '#4CAF50',
            '&:hover': { bgcolor: '#388E3C' }
          }}
        >
          {practice ? 'Save Changes' : 'Add Session'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};