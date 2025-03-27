import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { 
  Campaign,
  AttachFile,
  Send,
  Close,
  PriorityHigh,
  Info,
  CheckCircle,
  NotificationsActive,
  Schedule,
  HowToReg,
  EmojiEvents
} from '@mui/icons-material';
import { COLORS } from '@/style/Announcements';

export const CreateEditDialog = ({
  open,
  onClose,
  onSave,
  announcement
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium',
    type: 'general'
  });

  useEffect(() => {
    if (announcement) {
      setFormData({
        title: announcement.title,
        content: announcement.content,
        priority: announcement.priority,
        type: announcement.type
      });
    } else {
      setFormData({
        title: '',
        content: '',
        priority: 'medium',
        type: 'general'
      });
    }
  }, [announcement]);

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    setFormData({
      title: '',
      content: '',
      priority: 'medium',
      type: 'general'
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: COLORS.paper,
          boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        }
      }}
    >
      <DialogTitle sx={{
        background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.secondary})`,
        color: '#FFFFFF',
        fontSize: '1.5rem',
        fontWeight: 600,
        py: 2.5,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}>
        <Campaign sx={{ fontSize: 28 }} />
        {announcement ? 'Edit Announcement' : 'New Announcement'}
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3,
          p: 1,
          '& .MuiTextField-root': {
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }
        }}>
          <TextField
            label="Title"
            fullWidth
            value={formData.title}
            onChange={handleChange('title')}
            placeholder="Enter announcement title"
          />
          
          <TextField
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={formData.content}
            onChange={handleChange('content')}
            placeholder="Write your announcement content here..."
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  label="Priority"
                  onChange={handleChange('priority')}
                >
                  <MenuItem value="high">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PriorityHigh sx={{ color: COLORS.error }} />
                      High
                    </Box>
                  </MenuItem>
                  <MenuItem value="medium">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Info sx={{ color: COLORS.warning }} />
                      Medium
                    </Box>
                  </MenuItem>
                  <MenuItem value="low">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle sx={{ color: COLORS.success }} />
                      Low
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Type"
                  onChange={handleChange('type')}
                >
                  <MenuItem value="general">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <NotificationsActive sx={{ color: COLORS.primary }} />
                      General
                    </Box>
                  </MenuItem>
                  <MenuItem value="schedule">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Schedule sx={{ color: COLORS.info }} />
                      Schedule
                    </Box>
                  </MenuItem>
                  <MenuItem value="results">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmojiEvents sx={{ color: COLORS.warning }} />
                      Results
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, bgcolor: 'white' }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          startIcon={<Close />}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<Send />}
          onClick={handleSubmit}
          disabled={!formData.title || !formData.content}
          sx={{
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            px: 3,
            '&:hover': {
              background: 'linear-gradient(45deg, #21CBF3, #2196F3)',
            },
          }}
        >
          {announcement ? 'Update' : 'Publish'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const DeleteDialog = ({ open, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirm Delete</DialogTitle>
    <DialogContent>
      <Typography>
        Are you sure you want to delete this announcement?
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button 
        onClick={onConfirm} 
        color="error" 
        variant="contained"
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
); 