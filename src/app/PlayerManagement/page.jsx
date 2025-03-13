"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Tooltip,
  Fade,
  Zoom,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  AvatarGroup,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Person,
  SportsCricket,
  Edit,
  Delete,
  Add,
  Save,
  Close,
  EmojiEvents,
  Assessment,
  Phone,
  Email,
  CalendarToday,
  AccessTime,
  Star,
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

const PlayerAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: '4px solid white',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  margin: '0 auto',
}));

const RoleChip = styled(Chip)(({ role }) => {
  const colors = {
    batsman: { bg: '#2196F3', light: '#E3F2FD' },
    bowler: { bg: '#4CAF50', light: '#E8F5E9' },
    allRounder: { bg: '#FF9800', light: '#FFF3E0' },
    captain: { bg: '#9C27B0', light: '#F3E5F5' },
  };
  return {
    backgroundColor: alpha(colors[role]?.bg || colors.batsman.bg, 0.2),
    color: colors[role]?.light || colors.batsman.light,
    border: `1px solid ${alpha(colors[role]?.light || colors.batsman.light, 0.5)}`,
    fontWeight: 'bold',
  };
});

// Expanded Mock Data
const initialPlayers = [
  {
    id: 1,
    name: "John Doe",
    role: "captain",
    jerseyNumber: "7",
    battingStyle: "Right Handed",
    bowlingStyle: "Right Arm Fast",
    age: 28,
    matches: 45,
    runs: 1250,
    wickets: 30,
    avatar: "/player1.jpg",
    email: "john@example.com",
    phone: "+1234567890",
    achievements: ["Player of the Series 2023", "Most Runs 2022"],
    availability: "active",
    joinedDate: "2020-01-15",
  },
  {
    id: 2,
    name: "Mike Wilson",
    role: "bowler",
    jerseyNumber: "15",
    battingStyle: "Left Handed",
    bowlingStyle: "Left Arm Fast",
    age: 25,
    matches: 30,
    runs: 200,
    wickets: 45,
    avatar: "/player2.jpg",
    email: "mike@example.com",
    phone: "+1234567891",
    achievements: ["Best Bowler 2023"],
    availability: "injured",
    joinedDate: "2021-03-20",
  },
  {
    id: 3,
    name: "Steve Smith",
    role: "batsman",
    jerseyNumber: "49",
    battingStyle: "Right Handed",
    bowlingStyle: "Right Arm Medium",
    age: 27,
    matches: 38,
    runs: 1800,
    wickets: 5,
    avatar: "/player3.jpg",
    email: "steve@example.com",
    phone: "+1234567892",
    achievements: ["Highest Score 2023", "Most Sixes 2022"],
    availability: "active",
    joinedDate: "2020-06-10",
  },
  {
    id: 4,
    name: "David Warner",
    role: "allRounder",
    jerseyNumber: "31",
    battingStyle: "Left Handed",
    bowlingStyle: "Right Arm Off-Spin",
    age: 29,
    matches: 42,
    runs: 1100,
    wickets: 25,
    avatar: "/player4.jpg",
    email: "david@example.com",
    phone: "+1234567893",
    achievements: ["All-Round Performance 2023"],
    availability: "active",
    joinedDate: "2021-01-05",
  },
  {
    id: 5,
    name: "Chris Evans",
    role: "bowler",
    jerseyNumber: "23",
    battingStyle: "Right Handed",
    bowlingStyle: "Right Arm Fast",
    age: 24,
    matches: 20,
    runs: 120,
    wickets: 35,
    avatar: "/player5.jpg",
    email: "chris@example.com",
    phone: "+1234567894",
    achievements: [],
    availability: "active",
    joinedDate: "2022-02-15",
  },
  {
    id: 6,
    name: "Tom Hardy",
    role: "batsman",
    jerseyNumber: "77",
    battingStyle: "Right Handed",
    bowlingStyle: "NA",
    age: 26,
    matches: 35,
    runs: 1500,
    wickets: 0,
    avatar: "/player6.jpg",
    email: "tom@example.com",
    phone: "+1234567895",
    achievements: ["Most Boundaries 2023"],
    availability: "rested",
    joinedDate: "2021-08-20",
  }
];

const PlayerManagement = () => {
  const [players, setPlayers] = useState(initialPlayers);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const handleAddPlayer = () => {
    setSelectedPlayer({
      name: '',
      role: 'batsman',
      jerseyNumber: '',
      battingStyle: '',
      bowlingStyle: '',
      age: '',
      matches: 0,
      runs: 0,
      wickets: 0,
      email: '',
      phone: '',
      availability: 'available',
    });
    setOpenDialog(true);
  };

  const handleEditPlayer = (player) => {
    setSelectedPlayer(player);
    setOpenDialog(true);
  };

  const handleDeleteClick = (player) => {
    setPlayerToDelete(player);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setPlayers(players.filter(p => p.id !== playerToDelete.id));
    setDeleteDialogOpen(false);
    setSnackbar({
      open: true,
      message: 'Player removed successfully',
      severity: 'success'
    });
  };

  const handleSavePlayer = () => {
    if (selectedPlayer.id) {
      // Edit existing player
      setPlayers(players.map(p => 
        p.id === selectedPlayer.id ? selectedPlayer : p
      ));
      setSnackbar({
        open: true,
        message: 'Player updated successfully',
        severity: 'success'
      });
    } else {
      // Add new player
      const newPlayer = {
        ...selectedPlayer,
        id: Math.max(...players.map(p => p.id)) + 1,
        joinedDate: new Date().toISOString().split('T')[0],
      };
      setPlayers([...players, newPlayer]);
      setSnackbar({
        open: true,
        message: 'New player added successfully',
        severity: 'success'
      });
    }
    setOpenDialog(false);
  };

  // Filter players based on category
  const getFilteredPlayers = () => {
    switch(selectedCategory) {
      case 'active':
        return players.filter(p => p.availability === 'active');
      case 'injured':
        return players.filter(p => p.availability === 'injured');
      case 'rested':
        return players.filter(p => p.availability === 'rested');
      case 'achievements':
        return players.filter(p => p.achievements?.length > 0);
      default:
        return players;
    }
  };

  // Stats configuration with click handlers
  const statsConfig = [
    { 
      id: 'all',
      icon: <Person />,
      label: 'Total Players',
      value: players.length,
      color: '#2196F3'
    },
    { 
      id: 'active',
      icon: <SportsCricket />,
      label: 'Active Players',
      value: players.filter(p => p.availability === 'active').length,
      color: '#4CAF50'
    },
    { 
      id: 'achievements',
      icon: <EmojiEvents />,
      label: 'Achievement Holders',
      value: players.filter(p => p.achievements?.length > 0).length,
      color: '#FF9800'
    },
  ];

  // Add this new component for Achievement Card
  const AchievementCard = ({ player }) => (
    <GlassCard sx={{
      background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 193, 7, 0.1) 100%)',
      border: '1px solid rgba(255, 193, 7, 0.3)',
    }}>
      <CardContent>
        <Box sx={{ textAlign: 'center', mb: 2, position: 'relative' }}>
          <Star sx={{ 
            position: 'absolute',
            top: -10,
            right: -10,
            color: '#FFD700',
            fontSize: 30
          }} />
          <PlayerAvatar 
            src={player.avatar} 
            sx={{ border: '4px solid #FFD700' }}
          />
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            {player.name}
          </Typography>
          <RoleChip
            label={player.role.toUpperCase()}
            role={player.role}
          />
        </Box>

        {/* Achievements Section */}
        <Box sx={{ 
          mb: 3,
          p: 2,
          bgcolor: 'rgba(255, 193, 7, 0.1)',
          borderRadius: 2,
          border: '1px dashed rgba(255, 193, 7, 0.5)'
        }}>
          <Typography variant="subtitle2" sx={{ 
            color: '#FFD700',
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <EmojiEvents fontSize="small" />
            Achievements
          </Typography>
          {player.achievements.map((achievement, index) => (
            <Chip
              key={index}
              label={achievement}
              size="small"
              sx={{ 
                m: 0.5,
                bgcolor: 'rgba(255, 193, 7, 0.2)',
                color: '#FFD700',
                border: '1px solid rgba(255, 193, 7, 0.3)'
              }}
            />
          ))}
        </Box>

        {/* Stats with golden accent */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#FFD700' }}>
                {player.matches}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Matches
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#FFD700' }}>
                {player.runs}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Runs
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#FFD700' }}>
                {player.wickets}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Wickets
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Contact Info */}
        <Box sx={{ 
          p: 1.5, 
          bgcolor: 'rgba(255,255,255,0.1)',
          borderRadius: 1,
          mb: 2
        }}>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Email fontSize="small" /> {player.email}
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Phone fontSize="small" /> {player.phone}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Tooltip title="Edit Player">
            <IconButton
              onClick={() => handleEditPlayer(player)}
              sx={{ 
                bgcolor: alpha('#FFD700', 0.1),
                color: '#FFD700',
                '&:hover': {
                  bgcolor: alpha('#FFD700', 0.2),
                }
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove Player">
            <IconButton
              onClick={() => handleDeleteClick(player)}
              sx={{ 
                bgcolor: alpha('#F44336', 0.1),
                color: '#F44336',
                '&:hover': {
                  bgcolor: alpha('#F44336', 0.2),
                }
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </GlassCard>
  );

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
              Player Management
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
                            {stat.value}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            {stat.label}
                            {selectedCategory === stat.id && ' (Selected)'}
                          </Typography>
                        </Box>
                      </CardContent>
                    </GlassCard>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Add Player Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddPlayer}
              sx={{
                background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #21CBF3, #2196F3)',
                },
              }}
            >
              Add New Player
            </Button>
          </Box>

          {/* Modified Players Grid */}
          <Grid container spacing={3}>
            {getFilteredPlayers().map((player, index) => (
              <Grid item xs={12} sm={6} md={4} key={player.id}>
                <Zoom in={true} timeout={500 + (index * 100)}>
                  <Box>
                    {selectedCategory === 'achievements' ? (
                      <AchievementCard player={player} />
                    ) : (
                      // Regular player card component
                      <GlassCard>
                        <CardContent>
                          <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <PlayerAvatar src={player.avatar} />
                            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                              {player.name}
                            </Typography>
                            <RoleChip
                              label={player.role.toUpperCase()}
                              role={player.role}
                            />
                          </Box>

                          <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={4}>
                              <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" color="primary.light">
                                  {player.matches}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                  Matches
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" color="primary.light">
                                  {player.runs}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                  Runs
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" color="primary.light">
                                  {player.wickets}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                  Wickets
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>

                          <Box sx={{ 
                            p: 1.5, 
                            bgcolor: 'rgba(255,255,255,0.1)',
                            borderRadius: 1,
                            mb: 2
                          }}>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Email fontSize="small" /> {player.email}
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Phone fontSize="small" /> {player.phone}
                            </Typography>
                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Tooltip title="Edit Player">
                              <IconButton
                                onClick={() => handleEditPlayer(player)}
                                sx={{ 
                                  bgcolor: alpha('#4CAF50', 0.1),
                                  color: '#4CAF50',
                                  '&:hover': {
                                    bgcolor: alpha('#4CAF50', 0.2),
                                  }
                                }}
                              >
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Remove Player">
                              <IconButton
                                onClick={() => handleDeleteClick(player)}
                                sx={{ 
                                  bgcolor: alpha('#F44336', 0.1),
                                  color: '#F44336',
                                  '&:hover': {
                                    bgcolor: alpha('#F44336', 0.2),
                                  }
                                }}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </CardContent>
                      </GlassCard>
                    )}
                  </Box>
                </Zoom>
              </Grid>
            ))}
            {getFilteredPlayers().length === 0 && (
              <Grid item xs={12}>
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 4, 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 2
                }}>
                  <Person sx={{ fontSize: 60, color: 'rgba(255,255,255,0.5)', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    No players found in this category
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>

          {/* Add/Edit Player Dialog */}
          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle sx={{
              background: 'linear-gradient(45deg, #1a237e, #0d47a1)',
              color: 'white'
            }}>
              {selectedPlayer?.id ? 'Edit Player' : 'Add New Player'}
              <IconButton
                onClick={() => setOpenDialog(false)}
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
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={selectedPlayer?.name || ''}
                    onChange={(e) => setSelectedPlayer({ ...selectedPlayer, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={selectedPlayer?.role || 'batsman'}
                      label="Role"
                      onChange={(e) => setSelectedPlayer({ ...selectedPlayer, role: e.target.value })}
                    >
                      <MenuItem value="batsman">Batsman</MenuItem>
                      <MenuItem value="bowler">Bowler</MenuItem>
                      <MenuItem value="allRounder">All Rounder</MenuItem>
                      <MenuItem value="captain">Captain</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* Add more fields as needed */}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleSavePlayer}
                startIcon={<Save />}
              >
                {selectedPlayer?.id ? 'Update' : 'Add'} Player
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          >
            <DialogTitle sx={{ bgcolor: 'error.main', color: 'white' }}>
              Confirm Delete
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Typography>
                Are you sure you want to remove this player from the team?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteConfirm}
              >
                Remove
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>

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
                  Loading Players...
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Fade>
    </MainContainer>
  );
};

export default PlayerManagement;