import React, { useState } from 'react';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography} from '@mui/material';


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

  const statusOptions = ['Upcoming', 'Live', 'Completed'];

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
            <Typography 
              sx={{ 
                fontWeight: 600, 
                color: '#333',
                mb: 1
              }}
            >
              Session Title
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter session title"
              value={editedPractice.title}
              onChange={(e) => setEditedPractice({...editedPractice, title: e.target.value})}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography 
                sx={{ 
                  fontWeight: 600, 
                  color: '#333',
                  mb: 1
                }}
              >
                Status
              </Typography>
              <Select
                value={editedPractice.status}
                onChange={(e) => setEditedPractice({...editedPractice, status: e.target.value})}
                sx={{
                  '& .MuiSelect-select': {
                    padding: '12px'
                  }
                }}
              >
                {statusOptions.map((status) => (
                  <MenuItem 
                    key={status} 
                    value={status}
                    sx={{
                      textTransform: 'capitalize'
                    }}
                  >
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <Typography 
              sx={{ 
                fontWeight: 600, 
                color: '#333',
                mb: 1
              }}
            >
              Date
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={editedPractice.date}
              onChange={(e) => setEditedPractice({...editedPractice, date: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography 
              sx={{ 
                fontWeight: 600, 
                color: '#333',
                mb: 1
              }}
            >
              Time
            </Typography>
            <TextField
              fullWidth
              type="time"
              value={editedPractice.time}
              onChange={(e) => setEditedPractice({...editedPractice, time: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Rest of the fields with Typography labels */}
          {[{
            field: 'venue', label: 'Venue' },
            { field: 'duration', label: 'Duration' },
            { field: 'focus', label: 'Focus Areas' },
            { field: 'coach', label: 'Coach' }
          ].map(({ field, label }) => (
            <Grid item xs={12} key={field}>
              <Typography 
                sx={{ 
                  fontWeight: 600, 
                  color: '#333',
                  mb: 1
                }}
              >
                {label}
              </Typography>
              <TextField
                fullWidth
                placeholder={`Enter ${label.toLowerCase()}`}
                value={editedPractice[field]}
                onChange={(e) => setEditedPractice({...editedPractice, [field]: e.target.value})}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          color="inherit"
        >
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