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
  Avatar,
  Tabs,
  Tab,
  Fade,
  Zoom,
  Tooltip as MuiTooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  SportsCricket,
  Schedule,
  LocationOn,
  Timer,
  EmojiEvents,
  Star,
  CalendarToday,
  ArrowForward,
  Groups,
  Visibility,
  Edit,
  Delete,
  Close,
  Save,
  AddCircle,
  TrendingUp,
  Assessment,
} from '@mui/icons-material';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, ChartTooltip, Legend);

// Add a color palette object
const COLORS = {
  primary: {
    main: '#2C3E50',
    light: '#34495E',
    dark: '#1A252F',
    contrastText: '#ECF0F1'
  },
  secondary: {
    main: '#3498DB',
    light: '#5DADE2',
    dark: '#2980B9',
    contrastText: '#FFFFFF'
  },
  success: {
    main: '#2ECC71',
    light: '#58D68D',
    dark: '#27AE60',
    contrastText: '#FFFFFF'
  },
  warning: {
    main: '#F1C40F',
    light: '#F4D03F',
    dark: '#F39C12',
    contrastText: '#FFFFFF'
  },
  error: {
    main: '#E74C3C',
    light: '#EC7063',
    dark: '#C0392B',
    contrastText: '#FFFFFF'
  }
};

// Styled Components
const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  minHeight: '100vh',
  background: `linear-gradient(135deg, ${COLORS.primary.main} 0%, ${COLORS.primary.dark} 100%)`,
  color: COLORS.primary.contrastText,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(236, 240, 241, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(236, 240, 241, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 8px 40px rgba(0, 0, 0, 0.2)`,
    background: 'rgba(236, 240, 241, 0.08)',
  },
}));

const MatchStatusChip = styled(Chip)(({ status, theme }) => {
  const colors = {
    upcoming: { bg: '#2196F3', light: '#E3F2FD' },
    live: { bg: '#4CAF50', light: '#E8F5E9' },
    completed: { bg: '#9E9E9E', light: '#F5F5F5' },
  };
  return {
    backgroundColor: colors[status].light,
    color: colors[status].bg,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: alpha(colors[status].light, 0.8),
    },
  };
});

const TeamAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  border: '3px solid white',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  textTransform: 'none',
  padding: '8px 16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
  color: 'white',
  padding: theme.spacing(2),
}));

const MatchStatsCard = styled(Box)(({ theme }) => ({
  background: 'rgba(236, 240, 241, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  border: '1px solid rgba(236, 240, 241, 0.1)',
}));

// Mock Data
const initialMatches = [
  {
    id: 1,
    team1: {
      name: 'Royal Strikers',
      logo: '/team1-logo.png',
      score: '186/4',
      overs: '20.0',
      runRate: '9.30',
    },
    team2: {
      name: 'Thunder Kings',
      logo: '/team2-logo.png',
      score: '142/8',
      overs: '18.2',
      runRate: '7.75',
    },
    status: 'live',
    date: '2024-01-20',
    time: '14:30',
    venue: 'Central Stadium',
    overs: '20',
    currentOver: '15.2',
    type: 'Quarter Final',
    matchDetails: {
      tossWinner: 'Royal Strikers',
      tossDecision: 'Bat',
      umpires: ['John Doe', 'Jane Smith'],
      referee: 'Robert Brown',
      highlights: ['6 sixes in one over', 'Century by Smith'],
    }
  },
  {
    id: 2,
    team1: {
      name: 'Eagle Warriors',
      logo: '/team3-logo.png',
      score: '-',
      overs: '-',
      runRate: '-',
    },
    team2: {
      name: 'Lion Kings',
      logo: '/team4-logo.png',
      score: '-',
      overs: '-',
      runRate: '-',
    },
    status: 'upcoming',
    date: '2024-01-22',
    time: '15:00',
    venue: 'Sports Complex',
    overs: '20',
    type: 'Semi Final',
    matchDetails: {
      tossWinner: '-',
      tossDecision: '-',
      umpires: ['Mike Johnson', 'Steve Williams'],
      referee: 'James Wilson',
    }
  },
  {
    id: 3,
    team1: {
      name: 'Phoenix Riders',
      logo: '/team5-logo.png',
      score: '225/6',
      overs: '20.0',
      runRate: '11.25',
    },
    team2: {
      name: 'Dragon Force',
      logo: '/team6-logo.png',
      score: '198/9',
      overs: '20.0',
      runRate: '9.90',
    },
    status: 'completed',
    date: '2024-01-19',
    time: '14:00',
    venue: 'International Ground',
    overs: '20',
    type: 'Quarter Final',
    matchDetails: {
      tossWinner: 'Phoenix Riders',
      tossDecision: 'Bat',
      umpires: ['David Brown', 'Richard Davis'],
      referee: 'Thomas Anderson',
      result: 'Phoenix Riders won by 27 runs',
    }
  },
];

const matchStats = {
  labels: ['Wins', 'Losses', 'Draw'],
  datasets: [{
    data: [12, 3, 1],
    backgroundColor: [
      COLORS.success.main,
      COLORS.error.main,
      COLORS.warning.main
    ],
    borderColor: [
      COLORS.success.light,
      COLORS.error.light,
      COLORS.warning.light
    ],
    borderWidth: 1,
  }],
};

const MatchStatistics = () => (
  <Grid container spacing={3} sx={{ mb: 4 }}>
    <Grid item xs={12} md={4}>
      <MatchStatsCard>
        <Typography variant="h6" gutterBottom sx={{ color: '#90caf9' }}>
          Match Statistics
        </Typography>
        <Box sx={{ height: 200 }}>
          <Doughnut 
            data={matchStats}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: { color: '#fff' }
                }
              }
            }}
          />
        </Box>
      </MatchStatsCard>
    </Grid>
    <Grid item xs={12} md={8}>
      <Grid container spacing={2}>
        {[
          { label: 'Total Matches', value: '16', icon: <SportsCricket />, color: '#2196F3' },
          { label: 'Win Rate', value: '75%', icon: <TrendingUp />, color: '#4CAF50' },
          { label: 'Avg. Score', value: '185', icon: <Assessment />, color: '#FF9800' },
          { label: 'Highest Score', value: '210', icon: <EmojiEvents />, color: '#E91E63' },
        ].map((stat, index) => (
          <Grid item xs={6} key={index}>
            <MatchStatsCard sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              background: alpha(stat.color, 0.1),
            }}>
              <Avatar sx={{ bgcolor: alpha(stat.color, 0.2), color: stat.color }}>
                {stat.icon}
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ color: stat.color, fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  {stat.label}
                </Typography>
              </Box>
            </MatchStatsCard>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);

const MatchesPage = () => {
  // States
  const [matches, setMatches] = useState(initialMatches);
  const [tabValue, setTabValue] = useState(0);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [editMatch, setEditMatch] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // New Match Template
  const newMatchTemplate = {
    team1: {
      name: '',
      logo: '',
      score: '-',
      overs: '-',
      runRate: '-',
    },
    team2: {
      name: '',
      logo: '',
      score: '-',
      overs: '-',
      runRate: '-',
    },
    status: 'upcoming',
    date: '',
    time: '',
    venue: '',
    overs: '20',
    type: '',
    matchDetails: {
      tossWinner: '-',
      tossDecision: '-',
      umpires: ['', ''],
      referee: '',
    }
  };

  // Handlers
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getFilteredMatches = () => {
    switch(tabValue) {
      case 0:
        return matches.filter(match => match.status === 'live');
      case 1:
        return matches.filter(match => match.status === 'upcoming');
      case 2:
        return matches.filter(match => match.status === 'completed');
      default:
        return matches;
    }
  };

  const handleCreateMatch = () => {
    setEditMatch({ ...newMatchTemplate });
    setCreateDialogOpen(true);
  };

  const handleViewDetails = (match) => {
    setSelectedMatch(match);
    setViewDialogOpen(true);
  };

  const handleEditMatch = (match) => {
    setEditMatch({...match});
    setEditDialogOpen(true);
  };

  const handleDeleteMatch = (match) => {
    setSelectedMatch(match);
    setDeleteDialogOpen(true);
  };

  const handleMatchDetails = (match) => {
    setSelectedMatch(match);
    setDetailsDialogOpen(true);
  };

  const handleSaveEdit = () => {
    setMatches(matches.map(m => m.id === editMatch.id ? editMatch : m));
    setEditDialogOpen(false);
  };

  const handleSaveNew = () => {
    const newMatch = {
      ...editMatch,
      id: matches.length + 1,
    };
    setMatches([...matches, newMatch]);
    setCreateDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    setMatches(matches.filter(m => m.id !== selectedMatch.id));
    setDeleteDialogOpen(false);
  };

  return (
    <MainContainer>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography 
            variant="h3" 
            sx={{
              fontWeight: 800,
              background: `linear-gradient(45deg, ${COLORS.primary.contrastText}, ${COLORS.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Tournament Matches
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddCircle />}
            onClick={handleCreateMatch}
            sx={{
              borderRadius: 2,
              background: `linear-gradient(45deg, ${COLORS.secondary.main}, ${COLORS.secondary.light})`,
              '&:hover': {
                background: `linear-gradient(45deg, ${COLORS.secondary.light}, ${COLORS.secondary.main})`,
              },
            }}
          >
            Create New Match
          </Button>
        </Box>

        <MatchStatistics />

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: COLORS.secondary.main,
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
            '& .MuiTab-root': {
              color: 'rgba(236, 240, 241, 0.7)',
              '&.Mui-selected': {
                color: COLORS.secondary.main,
              },
            },
          }}
        >
          <Tab 
            label="Live Matches" 
            icon={<SportsCricket />} 
            iconPosition="start"
          />
          <Tab 
            label="Upcoming" 
            icon={<Schedule />} 
            iconPosition="start"
          />
          <Tab 
            label="Completed" 
            icon={<EmojiEvents />} 
            iconPosition="start"
          />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {getFilteredMatches().map((match, index) => (
          <Grid item xs={12} md={6} key={match.id}>
            <Zoom in={true} timeout={500 + (index * 100)}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <MatchStatusChip
                      icon={match.status === 'live' ? <Timer /> : <CalendarToday />}
                      label={match.status.toUpperCase()}
                      status={match.status}
                    />
                    <Typography 
                      variant="subtitle2" 
                      color="text.secondary"
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: 0.5 
                      }}
                    >
                      <LocationOn fontSize="small" />
                      {match.venue}
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                  }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <TeamAvatar src={match.team1.logo} alt={match.team1.name} />
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
                        {match.team1.name}
                      </Typography>
                      <Typography variant="h5" color="primary" fontWeight="bold">
                        {match.team1.score}
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="text.secondary">VS</Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          display: 'block',
                          color: 'primary.main',
                          fontWeight: 'bold',
                        }}
                      >
                        {match.type}
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                      <TeamAvatar src={match.team2.logo} alt={match.team2.name} />
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
                        {match.team2.name}
                      </Typography>
                      <Typography variant="h5" color="primary" fontWeight="bold">
                        {match.team2.score}
                      </Typography>
                    </Box>
                  </Box>

                  {match.status === 'live' && (
                    <Box sx={{ 
                      bgcolor: alpha('#4CAF50', 0.1), 
                      p: 1, 
                      borderRadius: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
                    }}>
                      <Typography color="success.main" fontWeight="bold">
                        LIVE • Over {match.currentOver}
                      </Typography>
                      <Chip 
                        label={`${match.overs} Overs`}
                        size="small"
                        sx={{ bgcolor: 'white' }}
                      />
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <MuiTooltip title="View Details">
                        <IconButton 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha(COLORS.secondary.main, 0.1),
                            '&:hover': {
                              bgcolor: alpha(COLORS.secondary.main, 0.2),
                            }
                          }}
                          onClick={() => handleViewDetails(match)}
                        >
                          <Visibility sx={{ color: COLORS.secondary.main }} />
                        </IconButton>
                      </MuiTooltip>
                      <MuiTooltip title="Edit Match">
                        <IconButton 
                          size="small" 
                          sx={{ bgcolor: alpha('#4CAF50', 0.1) }}
                          onClick={() => handleEditMatch(match)}
                        >
                          <Edit sx={{ color: '#4CAF50' }} />
                        </IconButton>
                      </MuiTooltip>
                      <MuiTooltip title="Delete Match">
                        <IconButton 
                          size="small" 
                          sx={{ bgcolor: alpha('#F44336', 0.1) }}
                          onClick={() => handleDeleteMatch(match)}
                        >
                          <Delete sx={{ color: '#F44336' }} />
                        </IconButton>
                      </MuiTooltip>
                    </Box>
                    <ActionButton
                      variant="contained"
                      endIcon={<ArrowForward />}
                      onClick={() => handleMatchDetails(match)}
                      sx={{
                        background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                        color: 'white',
                      }}
                    >
                      Match Details
                    </ActionButton>
                  </Box>
                </CardContent>
              </StyledCard>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      {/* Dialogs will continue in the next part... */}

            {/* View Details Dialog */}
            <Dialog 
        open={viewDialogOpen} 
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <StyledDialogTitle>
          Quick Match Overview
          <IconButton
            onClick={() => setViewDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
          >
            <Close />
          </IconButton>
        </StyledDialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedMatch && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: 2, bgcolor: alpha('#2196F3', 0.05) }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom color="primary">
                        Match Information
                      </Typography>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell><strong>Match Type</strong></TableCell>
                            <TableCell>{selectedMatch.type}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><strong>Venue</strong></TableCell>
                            <TableCell>{selectedMatch.venue}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><strong>Date & Time</strong></TableCell>
                            <TableCell>{`${selectedMatch.date} ${selectedMatch.time}`}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell>
                              <MatchStatusChip
                                label={selectedMatch.status.toUpperCase()}
                                status={selectedMatch.status}
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom color="primary">
                        Team Statistics
                      </Typography>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell><strong>{selectedMatch.team1.name}</strong></TableCell>
                            <TableCell>{selectedMatch.team1.score}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><strong>{selectedMatch.team2.name}</strong></TableCell>
                            <TableCell>{selectedMatch.team2.score}</TableCell>
                          </TableRow>
                          {selectedMatch.status === 'live' && (
                            <TableRow>
                              <TableCell><strong>Current Over</strong></TableCell>
                              <TableCell>{selectedMatch.currentOver}</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          <Button 
            variant="contained"
            onClick={() => {
              setViewDialogOpen(false);
              handleMatchDetails(selectedMatch);
            }}
          >
            View Full Details
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Match Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <StyledDialogTitle>
          Edit Match
          <IconButton
            onClick={() => setEditDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
          >
            <Close />
          </IconButton>
        </StyledDialogTitle>
        <DialogContent>
          {editMatch && (
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Team 1 Details
                  </Typography>
                  <TextField
                    label="Team Name"
                    fullWidth
                    value={editMatch.team1.name}
                    onChange={(e) => setEditMatch({
                      ...editMatch,
                      team1: { ...editMatch.team1, name: e.target.value }
                    })}
                  />
                  <TextField
                    label="Score"
                    fullWidth
                    value={editMatch.team1.score}
                    sx={{ mt: 2 }}
                    onChange={(e) => setEditMatch({
                      ...editMatch,
                      team1: { ...editMatch.team1, score: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Team 2 Details
                  </Typography>
                  <TextField
                    label="Team Name"
                    fullWidth
                    value={editMatch.team2.name}
                    onChange={(e) => setEditMatch({
                      ...editMatch,
                      team2: { ...editMatch.team2, name: e.target.value }
                    })}
                  />
                  <TextField
                    label="Score"
                    fullWidth
                    value={editMatch.team2.score}
                    sx={{ mt: 2 }}
                    onChange={(e) => setEditMatch({
                      ...editMatch,
                      team2: { ...editMatch.team2, score: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Match Status</InputLabel>
                    <Select
                      value={editMatch.status}
                      label="Match Status"
                      onChange={(e) => setEditMatch({
                        ...editMatch,
                        status: e.target.value
                      })}
                    >
                      <MenuItem value="upcoming">Upcoming</MenuItem>
                      <MenuItem value="live">Live</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Venue"
                    fullWidth
                    value={editMatch.venue}
                    onChange={(e) => setEditMatch({
                      ...editMatch,
                      venue: e.target.value
                    })}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained"
            onClick={handleSaveEdit}
            startIcon={<Save />}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle sx={{ color: 'error.main' }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this match? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error" 
            variant="contained"
            startIcon={<Delete />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Match Details Dialog */}
      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <StyledDialogTitle>
          Full Match Details
          <IconButton
            onClick={() => setDetailsDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
          >
            <Close />
          </IconButton>
        </StyledDialogTitle>
        <DialogContent>
          {selectedMatch && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: alpha('#2196F3', 0.05) }}>
                    <Typography variant="h6" gutterBottom color="primary">
                      Match Officials
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2">Umpires:</Typography>
                        <Typography>
                          {selectedMatch.matchDetails.umpires.join(', ')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2">Match Referee:</Typography>
                        <Typography>
                          {selectedMatch.matchDetails.referee}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                
                {selectedMatch.status === 'completed' && (
                  <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: alpha('#4CAF50', 0.05) }}>
                      <Typography variant="h6" gutterBottom color="success.main">
                        Match Result
                      </Typography>
                      <Typography>
                        {selectedMatch.matchDetails.result}
                      </Typography>
                    </Paper>
                  </Grid>
                )}

                {selectedMatch.status === 'live' && (
                  <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: alpha('#FF9800', 0.05) }}>
                      <Typography variant="h6" gutterBottom color="warning.main">
                        Live Updates
                      </Typography>
                      <Typography>
                        Current Over: {selectedMatch.currentOver}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Create New Match Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <StyledDialogTitle>
          Create New Match
          <IconButton
            onClick={() => setCreateDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
          >
            <Close />
          </IconButton>
        </StyledDialogTitle>
        <DialogContent>
          {/* Add form fields similar to Edit Dialog */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained"
            onClick={handleSaveNew}
            startIcon={<Save />}
          >
            Create Match
          </Button>
        </DialogActions>
      </Dialog>
    </MainContainer>
  );
};

export default MatchesPage;