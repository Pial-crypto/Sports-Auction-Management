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
export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  minHeight: '100vh',
  color: 'white',
}));

export const GlassCard = styled(Card)(() => ({
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

export const PlayerAvatar = styled(Avatar)(() => ({
  width: 120,
  height: 120,
  border: '4px solid white',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  margin: '0 auto',
}));

export const RoleChip = styled(Chip)(({ role }) => {
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