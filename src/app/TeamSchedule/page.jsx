"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Avatar,
  Tooltip,
  Tabs,
  Tab,
  Fade,
  Zoom,
  CircularProgress,
  Divider,
  AvatarGroup,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  CalendarToday,
  AccessTime,
  LocationOn,
  SportsCricket,
  Edit,
  Delete,
  Add,
  Save,
  Close,
  Today,
  Event,
  Schedule,
  Timer,
  EmojiEvents,
  Tv,
  ConfirmationNumber,
  People,
  WbSunny,
  Warning,
  CheckCircle,
  Cancel,
  Star,
  StarBorder,
} from '@mui/icons-material';

// Styled Components
const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  minHeight: '100vh',
  color: 'white',
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: 16,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)',
    background: 'rgba(255, 255, 255, 0.15)',
  },
}));

const StatusChip = styled(Chip)(({ status }) => {
  const colors = {
    upcoming: { bg: '#2196F3', light: '#E3F2FD' },
    completed: { bg: '#4CAF50', light: '#E8F5E9' },
    cancelled: { bg: '#F44336', light: '#FFEBEE' },
    live: { bg: '#FF9800', light: '#FFF3E0' },
  };
  return {
    backgroundColor: alpha(colors[status].bg, 0.2),
    color: colors[status].light,
    border: `1px solid ${alpha(colors[status].light, 0.5)}`,
    fontWeight: 'bold',
  };
});

const TeamSchedule = () => {
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [venueDialogOpen, setVenueDialogOpen] = useState(false);
  // New state for pressing functionality
  const [pressedEvents, setPressedEvents] = useState([]);
  const [pressDialogOpen, setPressDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [pressReason, setPressReason] = useState('');
  const [pressConfirmation, setPressConfirmation] = useState(false);
  
// First, Mock Data
const scheduleData = {
    upcoming: [
      {
        id: 1,
        type: 'match',
        title: 'Quarter Final',
        opponent: 'Thunder Kings',
        date: '2024-01-25',
        time: '14:30',
        venue: 'Central Stadium',
        status: 'upcoming',
        opponentLogo: '/team2-logo.png',
        ticketStatus: 'Available',
        broadcast: 'Sports Live HD',
        matchDetails: {
          format: 'T20',
          umpires: ['John Smith', 'Mike Brown'],
          referee: 'David Wilson',
          weatherForecast: 'Sunny, 25°C'
        }
      },
      {
        id: 2,
        type: 'practice',
        title: 'Team Practice',
        date: '2024-01-23',
        time: '09:00',
        venue: 'Training Ground',
        status: 'upcoming',
        duration: '3 hours',
        focus: 'Batting & Fielding',
        coach: 'Mike Smith',
        attendees: 'All Players'
      },
      {
        id: 3,
        type: 'match',
        title: 'Semi Final',
        opponent: 'Royal Challengers',
        date: '2024-01-28',
        time: '15:00',
        venue: 'Sports Complex',
        status: 'upcoming',
        opponentLogo: '/team3-logo.png',
        ticketStatus: 'Selling Fast',
        broadcast: 'Sports Live HD',
        matchDetails: {
          format: 'T20',
          umpires: ['Steve Davis', 'James Wilson'],
          referee: 'Robert Brown',
          weatherForecast: 'Partly Cloudy, 23°C'
        }
      }
    ],
    completed: [
      {
        id: 4,
        type: 'match',
        title: 'League Match',
        opponent: 'Eagle Warriors',
        date: '2024-01-15',
        time: '14:00',
        venue: 'City Stadium',
        status: 'completed',
        result: 'Won by 5 wickets',
        score: {
          team: '186/5',
          opponent: '182/8'
        },
        highlights: ['Century by John Doe', '5 wickets by Mike Wilson'],
        matchStats: {
          bestBatsman: 'John Doe (102 runs)',
          bestBowler: 'Mike Wilson (5/25)'
        }
      }
    ],
    cancelled: [
      {
        id: 5,
        type: 'practice',
        title: 'Net Practice',
        date: '2024-01-18',
        time: '10:00',
        venue: 'Training Ground',
        status: 'cancelled',
        reason: 'Heavy Rain',
        rescheduledTo: '2024-01-20'
      }
    ]
  };
  
  const venueDetails = {
    'Central Stadium': {
      address: '123 Sports Complex, City Center',
      capacity: '25,000',
      facilities: ['Floodlights', 'Indoor Nets', 'Media Center'],
      parking: 'Available',
      contact: '+1234567890'
    },
    'Training Ground': {
      address: '456 Practice Area, Sports Village',
      capacity: 'N/A',
      facilities: ['Practice Nets', 'Gym', 'Recovery Center'],
      parking: 'Available',
      contact: '+1234567891'
    },
    'Sports Complex': {
      address: '789 Sports Zone, Downtown',
      capacity: '30,000',
      facilities: ['Floodlights', 'Indoor Nets', 'Media Center', 'VIP Boxes'],
      parking: 'Available',
      contact: '+1234567892'
    }
  };
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
    // Load pressed events from localStorage
    const savedPressedEvents = localStorage.getItem('pressedEvents');
    if (savedPressedEvents) {
      setPressedEvents(JSON.parse(savedPressedEvents));
    }
  }, []);

  // Save pressed events to localStorage when they change
  useEffect(() => {
    localStorage.setItem('pressedEvents', JSON.stringify(pressedEvents));
  }, [pressedEvents]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return <Event />;
      case 'completed':
        return <CheckCircle />;
      case 'cancelled':
        return <Cancel />;
      case 'live':
        return <SportsCricket />;
      default:
        return <Event />;
    }
  };

  const handlePressEvent = (event) => {
    setSelectedEvent(event);
    setPressReason('');
    setPressDialogOpen(true);
  };

  const handleConfirmPress = () => {
    if (pressReason.trim()) {
      setPressedEvents([...pressedEvents, { 
        eventId: selectedEvent.id, 
        reason: pressReason,
        timestamp: new Date().toISOString()
      }]);
      setPressConfirmation(true);
      
      // Auto close confirmation message after 2 seconds
      setTimeout(() => {
        setPressConfirmation(false);
        setPressDialogOpen(false);
      }, 2000);
    }
  };

  const isEventPressed = (eventId) => {
    return pressedEvents.some(item => item.eventId === eventId);
  };

  const getEventPressReason = (eventId) => {
    const pressedEvent = pressedEvents.find(item => item.eventId === eventId);
    return pressedEvent ? pressedEvent.reason : '';
  };

  const MatchCard = ({ match }) => (
    <GlassCard>
      <CardContent>
        {/* Status Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <StatusChip
            icon={getStatusIcon(match.status)}
            label={match.status.toUpperCase()}
            status={match.status}
          />
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            {match.type.toUpperCase()}
          </Typography>
        </Box>

        {/* Match Title */}
        <Typography variant="h6" gutterBottom>
          {match.title}
        </Typography>

        {/* Teams Section (for matches) */}
        {match.type === 'match' && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            my: 3,
            p: 2,
            bgcolor: 'rgba(255,255,255,0.1)',
            borderRadius: 2
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar 
                src="/team-logo.png"
                sx={{ 
                  width: 60, 
                  height: 60, 
                  mb: 1,
                  border: '2px solid white'
                }}
              />
              <Typography variant="subtitle2">Our Team</Typography>
              {match.status === 'completed' && (
                <Typography variant="h6" color="primary.light">
                  {match.score?.team}
                </Typography>
              )}
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ mb: 1 }}>VS</Typography>
              {match.status === 'completed' && (
                <Chip 
                  label={match.result}
                  size="small"
                  sx={{ 
                    bgcolor: match.result.includes('Won') ? 
                      alpha('#4CAF50', 0.2) : alpha('#F44336', 0.2),
                    color: match.result.includes('Won') ? '#4CAF50' : '#F44336'
                  }}
                />
              )}
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Avatar 
                src={match.opponentLogo}
                sx={{ 
                  width: 60, 
                  height: 60, 
                  mb: 1,
                  border: '2px solid white'
                }}
              />
              <Typography variant="subtitle2">{match.opponent}</Typography>
              {match.status === 'completed' && (
                <Typography variant="h6" color="primary.light">
                  {match.score?.opponent}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Date, Time & Venue */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarToday fontSize="small" sx={{ color: 'primary.light' }} />
              <Typography variant="body2">
                {match.date}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTime fontSize="small" sx={{ color: 'primary.light' }} />
              <Typography variant="body2">
                {match.time}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            mb: 2,
            cursor: 'pointer',
            '&:hover': { color: 'primary.light' }
          }}
          onClick={() => {
            setSelectedVenue(venueDetails[match.venue]);
            setVenueDialogOpen(true);
          }}
        >
          <LocationOn fontSize="small" sx={{ color: 'primary.light' }} />
          <Typography variant="body2">
            {match.venue}
          </Typography>
        </Box>

        {/* Additional Info */}
        {match.type === 'match' && (
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            flexWrap: 'wrap',
            pt: 2,
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            {match.ticketStatus && (
              <Chip
                icon={<ConfirmationNumber />}
                label={match.ticketStatus}
                size="small"
                sx={{ 
                  bgcolor: alpha('#2196F3', 0.2),
                  color: '#90CAF9'
                }}
              />
            )}
            {match.broadcast && (
              <Chip
                icon={<Tv />}
                label={match.broadcast}
                size="small"
                sx={{ 
                  bgcolor: alpha('#4CAF50', 0.2),
                  color: '#A5D6A7'
                }}
              />
            )}
          </Box>
        )}

        {/* Practice Session Info */}
        {match.type === 'practice' && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Duration:</strong> {match.duration}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Focus:</strong> {match.focus}
            </Typography>
            <Typography variant="body2">
              <strong>Coach:</strong> {match.coach}
            </Typography>
          </Box>
        )}

        {/* Completed Match Stats */}
        {match.status === 'completed' && match.type === 'match' && match.matchStats && (
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Typography variant="subtitle2" gutterBottom>
              Match Highlights
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'primary.light' }}>
                🏏 {match.matchStats.bestBatsman}
              </Typography>
              <Typography variant="body2" sx={{ color: 'primary.light' }}>
                🎯 {match.matchStats.bestBowler}
              </Typography>
            </Box>
          </Box>
        )}
        
        {/* Press Button and Status */}
        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isEventPressed(match.id) ? (
            <Tooltip title={getEventPressReason(match.id)}>
              <Chip
                icon={<Star />}
                label="Pressed"
                size="small"
                sx={{ 
                  bgcolor: alpha('#FFD700', 0.2),
                  color: '#FFD700'
                }}
              />
            </Tooltip>
          ) : (
            <Button 
              startIcon={<StarBorder />}
              size="small"
              onClick={() => handlePressEvent(match)}
              sx={{ 
                color: '#FFD700',
                borderColor: alpha('#FFD700', 0.5),
                '&:hover': {
                  bgcolor: alpha('#FFD700', 0.1),
                  borderColor: '#FFD700'
                }
              }}
              variant="outlined"
            >
              Press
            </Button>
          )}
        </Box>
      </CardContent>
    </GlassCard>
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Add new state for selected category
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modify the filtering logic
  const getFilteredEvents = () => {
    switch(selectedCategory) {
      case 'upcoming':
        return scheduleData.upcoming.filter(match => isEventPressed(match.id));
      case 'completed':
        return scheduleData.completed.filter(match => isEventPressed(match.id));
      case 'practice':
        return scheduleData.upcoming
          .filter(match => match.type === 'practice' && isEventPressed(match.id));
      default:
        return scheduleData.upcoming;
    }
  };

  // Modify the Quick Stats section to be clickable
  const statsConfig = [
    { 
      id: 'upcoming',
      icon: <Event />,
      label: 'Upcoming Matches',
      count: scheduleData.upcoming.filter(m => m.type === 'match' && isEventPressed(m.id)).length,
      color: '#2196F3'
    },
    { 
      id: 'completed',
      icon: <CheckCircle />,
      label: 'Completed',
      count: scheduleData.completed.filter(m => isEventPressed(m.id)).length,
      color: '#4CAF50'
    },
    { 
      id: 'practice',
      icon: <SportsCricket />,
      label: 'Practice Sessions',
      count: scheduleData.upcoming.filter(m => m.type === 'practice' && isEventPressed(m.id)).length,
      color: '#FF9800'
    },
  ];

  return (
    <MainContainer>
      <Fade in={!loading} timeout={1000}>
        <Box>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h3" 
              fontWeight="bold"
              sx={{
                background: 'linear-gradient(45deg, #fff, #64b5f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 2,
              }}
            >
              Team Schedule
            </Typography>

            {/* Modified Quick Stats */}
            <Grid container spacing={2}>
              {statsConfig.map((stat, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Zoom in={true} timeout={500 + (index * 100)}>
                    <GlassCard 
                      sx={{ 
                        cursor: 'pointer',
                        transform: selectedCategory === stat.id ? 'scale(1.02)' : 'none',
                        border: selectedCategory === stat.id ? `2px solid ${stat.color}` : 'none'
                      }}
                      onClick={() => setSelectedCategory(selectedCategory === stat.id ? 'all' : stat.id)}
                    >
                      <CardContent sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                      }}>
                        <Avatar sx={{ 
                          bgcolor: alpha(stat.color, 0.2),
                          color: stat.color
                        }}>
                          {stat.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="h4" fontWeight="bold">
                            {stat.count}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            {stat.label}
                            {selectedCategory === stat.id && ' (Pressed)'}
                          </Typography>
                        </Box>
                      </CardContent>
                    </GlassCard>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Schedule Grid - Modified to use filtered events */}
          <Grid container spacing={3}>
            {getFilteredEvents().map((match, index) => (
              <Grid item xs={12} md={6} key={match.id}>
                <Zoom in={true} timeout={500 + (index * 100)}>
                  <Box>
                    <MatchCard match={match} />
                  </Box>
                </Zoom>
              </Grid>
            ))}
            {selectedCategory !== 'all' && getFilteredEvents().length === 0 && (
              <Grid item xs={12}>
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 4, 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 2
                }}>
                  <StarBorder sx={{ fontSize: 60, color: 'rgba(255,255,255,0.5)', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    No pressed events in this category
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    Press some events to see them here
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>

          {/* Venue Details Dialog */}
          <Dialog
            open={venueDialogOpen}
            onClose={() => setVenueDialogOpen(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle sx={{
              background: 'linear-gradient(45deg, #1a237e, #0d47a1)',
              color: 'white'
            }}>
              Venue Details
              <IconButton
                onClick={() => setVenueDialogOpen(false)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'white'
                }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              {selectedVenue && (
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {selectedVenue.address}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Capacity
                      </Typography>
                      <Typography variant="body1">
                        {selectedVenue.capacity}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Parking
                      </Typography>
                      <Typography variant="body1">
                        {selectedVenue.parking}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Facilities
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                        {selectedVenue.facilities.map((facility, index) => (
                          <Chip
                            key={index}
                            label={facility}
                            size="small"
                            sx={{ bgcolor: alpha('#2196F3', 0.1) }}
                          />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Contact
                      </Typography>
                      <Typography variant="body1">
                        {selectedVenue.contact}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </DialogContent>
          </Dialog>
          
          {/* Press Dialog */}
          <Dialog
            open={pressDialogOpen}
            onClose={() => !pressConfirmation && setPressDialogOpen(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle sx={{
              background: 'linear-gradient(45deg, #1a237e, #0d47a1)',
              color: 'white'
            }}>
              {pressConfirmation ? 'Success!' : 'Press Event'}
              {!pressConfirmation && (
                <IconButton
                  onClick={() => setPressDialogOpen(false)}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'white'
                  }}
                >
                  <Close />
                </IconButton>
              )}
            </DialogTitle>
            <DialogContent dividers>
              {pressConfirmation ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, flexDirection: 'column' }}>
                  <CheckCircle sx={{ color: '#4CAF50', fontSize: 60, mb: 2 }} />
                  <Typography variant="h6" align="center">
                    Event successfully pressed!
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ p: 2 }}>
                  {selectedEvent && (
                    <>
                      <Typography variant="subtitle1" gutterBottom>
                        You are pressing: <strong>{selectedEvent.title}</strong>
                      </Typography>
                      <TextField
                        fullWidth
                        label="Reason for pressing"
                        multiline
                        rows={4}
                        value={pressReason}
                        onChange={(e) => setPressReason(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        placeholder="Explain why you are pressing this event..."
                        helperText="This will be saved with your pressed event"
                      />
                    </>
                  )}
                </Box>
              )}
            </DialogContent>
            {!pressConfirmation && (
              <DialogActions>
                <Button onClick={() => setPressDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleConfirmPress}
                  variant="contained"
                  startIcon={<Star />}
                  disabled={!pressReason.trim()}
                  sx={{
                    bgcolor: '#FFD700',
                    color: '#000',
                    '&:hover': {
                      bgcolor: '#E6C200',
                    }
                  }}
                >
                  Confirm Press
                </Button>
              </DialogActions>
            )}
          </Dialog>

          {/* Loading State */}
          {loading && (
            <Box 
              sx={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(0,0,0,0.8)',
                zIndex: 9999,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress size={60} sx={{ color: '#fff' }} />
                <Typography sx={{ mt: 2, color: '#fff' }}>
                  Loading Schedule...
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Fade>
    </MainContainer>
  );
};

export default TeamSchedule;