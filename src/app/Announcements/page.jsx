"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fade,
  Zoom,
  Tooltip,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Notifications,
  Campaign,
  NotificationsActive,
  Add,
  Edit,
  Delete,
  PriorityHigh,
  Info,
  CheckCircle,
  Schedule,
  Close,
  Send,
  AttachFile,
} from '@mui/icons-material';
import PlayerCards from '@/components/TournamentManagement/PlayerCards';
// Update color theme
const COLORS = {
  primary: '#2563EB',    // Modern Blue
  secondary: '#4F46E5',  // Deep Purple
  success: '#059669',    // Emerald
  warning: '#D97706',    // Amber
  error: '#DC2626',      // Red
  info: '#0891B2',       // Cyan
  background: '#F8FAFC', // Light Cool Gray
  paper: '#FFFFFF',      // White
  border: '#E2E8F0',     // Light Border
  text: {
    primary: '#1E293B',   // Slate Dark
    secondary: '#64748B', // Slate Medium
    title: '#1E40AF',     // Blue Dark
  }
};

// Styled Components
const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: COLORS.background,
  minHeight: '100vh',
  color: COLORS.text.primary,
}));

const StyledCard = styled(Card)(({ theme, isActive }) => ({
  background: COLORS.paper,
  borderRadius: theme.spacing(2),
  border: isActive ? `2px solid ${COLORS.primary}` : `1px solid ${COLORS.border}`,
  boxShadow: isActive 
    ? `0 0 0 3px ${alpha(COLORS.primary, 0.2)}`
    : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: isActive
      ? `0 20px 25px -5px ${alpha(COLORS.primary, 0.25)}`
      : '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
}));

const PriorityChip = styled(Chip)(({ priority }) => {
  const colors = {
    high: { bg: COLORS.error, light: alpha(COLORS.error, 0.12) },
    medium: { bg: COLORS.warning, light: alpha(COLORS.warning, 0.12) },
    low: { bg: COLORS.success, light: alpha(COLORS.success, 0.12) },
  };
  return {
    backgroundColor: colors[priority].light,
    color: colors[priority].bg,
    fontWeight: 600,
    fontSize: '0.875rem',
    border: `1px solid ${alpha(colors[priority].bg, 0.3)}`,
    '&:hover': {
      backgroundColor: alpha(colors[priority].bg, 0.2),
    },
  };
});

const Announcements = () => {
  // States
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Tournament Schedule Update",
      content: "Due to weather conditions, all matches scheduled for tomorrow will be delayed by 2 hours.",
      priority: "high",
      type: "schedule",
      timestamp: "2024-01-20 14:30",
      author: "Tournament Admin",
      status: "active"
    },
    {
      id: 2,
      title: "New Team Registration Deadline",
      content: "Team registration deadline has been extended to January 25th, 2024.",
      priority: "medium",
      type: "registration",
      timestamp: "2024-01-19 10:15",
      author: "Registration Committee",
      status: "active"
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'medium',
    type: 'general',
  });

  // Filter announcements
  const getFilteredAnnouncements = () => {
    switch(filterType) {
      case 'active':
        return announcements.filter(a => a.status === 'active');
      case 'highPriority':
        return announcements.filter(a => a.priority === 'high');
      case 'scheduled':
        return announcements.filter(a => a.type === 'schedule');
      default:
        return announcements;
    }
  };

  // Handlers
  const handleQuickStatClick = (type) => {
    setFilterType(type);
  };

  const handleCreateAnnouncement = () => {
    setSelectedAnnouncement(null);
    setNewAnnouncement({
      title: '',
      content: '',
      priority: 'medium',
      type: 'general',
    });
    setOpenDialog(true);
  };

  const handleEditAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
    setNewAnnouncement(announcement);
    setOpenDialog(true);
  };

  const handleDeleteClick = (announcement) => {
    setAnnouncementToDelete(announcement);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setAnnouncements(announcements.filter(a => a.id !== announcementToDelete.id));
    setDeleteDialogOpen(false);
    setAnnouncementToDelete(null);
  };

  const handleSaveAnnouncement = () => {
    if (selectedAnnouncement) {
      setAnnouncements(announcements.map(a => 
        a.id === selectedAnnouncement.id ? {...newAnnouncement, id: a.id} : a
      ));
    } else {
      setAnnouncements([...announcements, {
        ...newAnnouncement,
        id: announcements.length + 1,
        timestamp: new Date().toLocaleString(),
        author: "Current User",
        status: "active"
      }]);
    }
    setOpenDialog(false);
  };

  return (
    <MainContainer>
      <Fade in={true} timeout={800}>
        <Box>
          {/* Header Section */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography 
                variant="h4" 
                sx={{
                  fontWeight: 800,
                  fontSize: '2.5rem',
                  color: COLORS.text.title,
                  letterSpacing: '-0.02em',
                  mb: 1
                }}
              >
                Announcements
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleCreateAnnouncement}
                sx={{
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #21CBF3, #2196F3)',
                  },
                }}
              >
                New Announcement
              </Button>
            </Box>

            {/* Quick Stats */}
            <Grid container spacing={2}>
              {[
                { 
                  icon: <NotificationsActive />, 
                  label: 'Active', 
                  count: announcements.filter(a => a.status === 'active').length, 
                  color: COLORS.primary, 
                  type: 'active' 
                },
                { 
                  icon: <PriorityHigh />, 
                  label: 'High Priority', 
                  count: announcements.filter(a => a.priority === 'high').length, 
                  color: COLORS.error, 
                  type: 'highPriority' 
                },
                { 
                  icon: <Schedule />, 
                  label: 'Scheduled', 
                  count: announcements.filter(a => a.type === 'schedule').length, 
                  color: COLORS.success, 
                  type: 'scheduled' 
                },
              ].map((stat, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Zoom in={true} timeout={500 + (index * 100)}>
                    <StyledCard 
                      isActive={filterType === stat.type}
                      onClick={() => handleQuickStatClick(stat.type)}
                      sx={{ 
                        cursor: 'pointer',
                        bgcolor: filterType === stat.type ? alpha(stat.color, 0.05) : 'transparent',
                      }}
                    >
                      <CardContent sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                      }}>
                        <Box sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: alpha(stat.color, filterType === stat.type ? 0.15 : 0.1),
                          transition: 'all 0.3s ease',
                        }}>
                          {React.cloneElement(stat.icon, { 
                            sx: { 
                              color: stat.color, 
                              fontSize: 32,
                              transform: filterType === stat.type ? 'scale(1.1)' : 'scale(1)',
                              transition: 'all 0.3s ease',
                            } 
                          })}
                        </Box>
                        <Box>
                          <Typography 
                            variant="h5" 
                            sx={{ 
                              fontWeight: filterType === stat.type ? 800 : 700,
                              color: filterType === stat.type ? stat.color : COLORS.text.primary,
                              transition: 'all 0.3s ease',
                            }}
                          >
                            {stat.count}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: filterType === stat.type ? stat.color : COLORS.text.secondary,
                              fontWeight: filterType === stat.type ? 500 : 400,
                              transition: 'all 0.3s ease',
                            }}
                          >
                            {stat.label}
                          </Typography>
                        </Box>
                      </CardContent>
                    </StyledCard>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Announcements List */}
          <Grid container spacing={3}>
            {getFilteredAnnouncements().map((announcement, index) => (
              <Grid item xs={12} key={announcement.id}>
                <Zoom in={true} timeout={500 + (index * 100)}>
                  <StyledCard>
                    <CardContent>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mb: 3,
                        p: 2,
                        borderRadius: 2,
                        bgcolor: alpha(COLORS.primary, 0.04),
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Campaign sx={{ color: COLORS.primary, fontSize: 32 }} />
                          <Typography variant="h5" sx={{ fontWeight: 600, color: COLORS.text.primary }}>
                            {announcement.title}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <PriorityChip
                            label={announcement.priority.toUpperCase()}
                            priority={announcement.priority}
                            size="medium"
                          />
                          <Chip
                            label={announcement.type}
                            size="medium"
                            sx={{ 
                              bgcolor: alpha(COLORS.primary, 0.08), 
                              color: COLORS.primary,
                              fontSize: '0.875rem',
                              fontWeight: 500,
                            }}
                          />
                        </Box>
                      </Box>

                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mb: 3, 
                          fontSize: '1.1rem',
                          lineHeight: 1.6,
                          color: COLORS.text.primary 
                        }}
                      >
                        {announcement.content}
                      </Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                          Posted by {announcement.author} • {announcement.timestamp}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Edit">
                            <IconButton
                              size="medium"
                              sx={{ 
                                bgcolor: alpha(COLORS.primary, 0.08),
                                '&:hover': {
                                  bgcolor: alpha(COLORS.primary, 0.15),
                                }
                              }}
                              onClick={() => handleEditAnnouncement(announcement)}
                            >
                              <Edit sx={{ color: COLORS.primary, fontSize: 22 }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="medium"
                              sx={{ 
                                bgcolor: alpha(COLORS.error, 0.08),
                                '&:hover': {
                                  bgcolor: alpha(COLORS.error, 0.15),
                                }
                              }}
                              onClick={() => handleDeleteClick(announcement)}
                            >
                              <Delete sx={{ color: COLORS.error, fontSize: 22 }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardContent>
                  </StyledCard>
                </Zoom>
              </Grid>
            ))}
          </Grid>

          {/* Create/Edit Dialog */}
          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
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
            }}>
              {selectedAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 1 }}>
                <TextField
                  label="Title"
                  fullWidth
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                />
                <TextField
                  label="Content"
                  fullWidth
                  multiline
                  rows={4}
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Priority</InputLabel>
                      <Select
                        value={newAnnouncement.priority}
                        label="Priority"
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })}
                      >
                        <MenuItem value="high">High</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Type</InputLabel>
                      <Select
                        value={newAnnouncement.type}
                        label="Type"
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, type: e.target.value })}
                      >
                        <MenuItem value="general">General</MenuItem>
                        <MenuItem value="schedule">Schedule</MenuItem>
                        <MenuItem value="registration">Registration</MenuItem>
                        <MenuItem value="results">Results</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  variant="outlined"
                  startIcon={<AttachFile />}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Attach Files
                </Button>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, bgcolor: 'white' }}>
              <Button 
                onClick={() => setOpenDialog(false)}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<Send />}
                onClick={handleSaveAnnouncement}
                sx={{
                  background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #21CBF3, #2196F3)',
                  },
                }}
              >
                {selectedAnnouncement ? 'Update' : 'Publish'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this announcement?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button 
                onClick={confirmDelete} 
                color="error" 
                variant="contained"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Fade>
    </MainContainer>
  );
};

export default Announcements;