'use client'

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Fade,
  Zoom,
  Tooltip,
  styled,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Avatar,
  Stack,
  Paper,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Delete,
  Add,
  Schedule,
  People,
  EmojiPeople,
  LocalPolice,
  Stars,
  Close,
  Save,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { CategoryChip,GradientButton,StyledCard,AnimatedIconButton,StyledDialog } from '@/style/TournamentRules';
import RULE_TYPES from '@/constants/TournamentRules/tournamentRules';
import Header from '@/components/TournamentRules/Header';
import ContentsInCard from '@/components/TournamentRules/ContentInCard';
import DialogActionsComponent from '@/components/TournamentRules/DialogActionsComponent';
import ControlForm from '@/components/TournamentRules/ControlForm';
import FormFields from '@/components/TournamentRules/FormFields';
import GradButton from '@/components/TournamentRules/GradButton';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import EditIcon from '@mui/icons-material/Edit';

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  height: '100%',
}));

const UserProfile = () => {
  const router = useRouter();
  const theme = useTheme();
  const [rules, setRules] = useState([
    {
      id: 1,
      title: 'Match Duration & Timing',
      description: 'Standard matches consist of two 45-minute halves with a 15-minute break. Extra time may apply in knockout stages.',
      category: 'TIME',
    },
    {
      id: 2,
      title: 'Team Composition Rules',
      description: 'Each team must have 11 starting players and up to 5 substitutes. Minimum 7 players required to start a match.',
      category: 'TEAM',
    },
    {
      id: 3,
      title: 'Player Registration',
      description: 'All players must be registered 48 hours before tournament start. Valid ID and age verification required.',
      category: 'PLAYER',
    },
    {
      id: 4,
      title: 'Card System',
      description: 'Yellow card results in warning. Red card leads to immediate match suspension. Three yellows equal one match ban.',
      category: 'DISCIPLINE',
    },
    {
      id: 5,
      title: 'Points System',
      description: 'Win: 3 points, Draw: 1 point, Loss: 0 points. Goal difference used as primary tiebreaker.',
      category: 'SCORING',
    },
    {
      id: 6,
      title: 'Match Officials',
      description: 'One main referee and two assistant referees required for each match. Fourth official for knockout stages.',
      category: 'DISCIPLINE',
    },
    {
      id: 7,
      title: 'Substitution Rules',
      description: 'Maximum 3 substitutions allowed per match. Additional substitution allowed in extra time.',
      category: 'TEAM',
    },
    {
      id: 8,
      title: 'Tournament Schedule',
      description: 'Matches scheduled with minimum 48 hours gap between consecutive matches for same team.',
      category: 'TIME',
    },
    {
      id: 9,
      title: 'Player Equipment',
      description: 'Players must wear proper kit with visible numbers. Shin guards mandatory. No jewelry allowed.',
      category: 'PLAYER',
    },
    {
      id: 10,
      title: 'Goal Difference',
      description: 'In case of equal points, goal difference followed by goals scored will determine rankings.',
      category: 'SCORING',
    }
]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [newRule, setNewRule] = useState({
    title: '',
    description: '',
    category: '',
  });
  const [error, setError] = useState('');
  const [role, setRole] = useState('Organizer');

  const handleAddRule = () => {
    if (rules.length >= 15) {
      setError('Maximum 15 rules allowed');
      return;
    }
    setNewRule({ title: '', description: '', category: '' });
    setEditingRule(null);
    setOpenDialog(true);
  };

  const handleEditRule = (rule) => {
    setNewRule({ ...rule });
    setEditingRule(rule);
    setOpenDialog(true);
  };

  const handleDeleteRule = (ruleId) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
  };

  const handleSaveRule = () => {
    if (!newRule.title || !newRule.description || !newRule.category) {
      setError('Please fill all fields');
      return;
    }

    if (editingRule) {
      setRules(rules.map(rule => 
        rule.id === editingRule.id ? { ...newRule, id: rule.id } : rule
      ));
    } else {
      setRules([...rules, { ...newRule, id: Date.now() }]);
    }
    
    setOpenDialog(false);
    setError('');
  };

  const handleTemplateSelect = (template) => {
    setNewRule({ ...newRule, description: template });
  };

  const renderContent = () => {
    switch (role) {
      case 'Organizer':
        return (
          <>
            <Grid item xs={12} md={4}>
              <StatsCard elevation={2}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ width: 64, height: 64 }}>O</Avatar>
                  <Box>
                    <Typography variant="h6">Organizer Profile</Typography>
                    <Typography color="textSecondary">Organizer Name</Typography>
                  </Box>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Box>
              </StatsCard>
            </Grid>
            <Grid item xs={12} md={8}>
              <StatsCard elevation={2}>
                <Typography variant="h6" gutterBottom>
                  Events Overview
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <Line type="monotone" dataKey="value" stroke="#1976d2" />
                    <XAxis dataKey="name" />
                    <YAxis />
                  </LineChart>
                </ResponsiveContainer>
              </StatsCard>
            </Grid>
          </>
        );
      case 'Player':
        return (
          <>
            <Grid item xs={12} md={4}>
              <StatsCard elevation={2}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ width: 64, height: 64 }}>P</Avatar>
                  <Box>
                    <Typography variant="h6">Player Profile</Typography>
                    <Typography color="textSecondary">Player Name</Typography>
                  </Box>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Box>
              </StatsCard>
            </Grid>
            <Grid item xs={12} md={8}>
              <StatsCard elevation={2}>
                <Typography variant="h6" gutterBottom>
                  Performance Statistics
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData}>
                    <Bar dataKey="value" fill="#1976d2" />
                    <XAxis dataKey="name" />
                    <YAxis />
                  </BarChart>
                </ResponsiveContainer>
              </StatsCard>
            </Grid>
          </>
        );
      case 'Manager':
        return (
          <>
            <Grid item xs={12} md={4}>
              <StatsCard elevation={2}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ width: 64, height: 64 }}>M</Avatar>
                  <Box>
                    <Typography variant="h6">Manager Profile</Typography>
                    <Typography color="textSecondary">Manager Name</Typography>
                  </Box>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Box>
              </StatsCard>
            </Grid>
            <Grid item xs={12} md={8}>
              <StatsCard elevation={2}>
                <Typography variant="h6" gutterBottom>
                  Team Overview
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <Line type="monotone" dataKey="value" stroke="#1976d2" />
                    <XAxis dataKey="name" />
                    <YAxis />
                  </LineChart>
                </ResponsiveContainer>
              </StatsCard>
            </Grid>
          </>
        );
      default:
        return null;
    }
  };

  // Demo data
  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, py: 4 }}>
        <Grid container spacing={3}>
          {/* Header */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h4" fontWeight="bold">
                USER PROFILE
              </Typography>
              <Button variant="contained" color="primary">
                Edit Profile
              </Button>
            </Box>
          </Grid>

          {/* Dynamic Content */}
          {renderContent()}

          {/* Stats */}
          <Grid item xs={12} md={8}>
            <StatsCard elevation={2}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="subtitle1">Total Tournaments</Typography>
                  <Typography variant="h4">220</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1">Players Acquired</Typography>
                  <Typography variant="h4">220</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1">Budget Remaining</Typography>
                  <Typography variant="h4">210</Typography>
                </Grid>
              </Grid>
            </StatsCard>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12} md={3}>
            <StatsCard elevation={2}>
              <Stack spacing={2}>
                <Button variant="contained" fullWidth>
                  View Teams
                </Button>
                <Button variant="outlined" fullWidth>
                  Manage Profile
                </Button>
                <Button variant="outlined" fullWidth>
                  Settings
                </Button>
              </Stack>
            </StatsCard>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UserProfile;