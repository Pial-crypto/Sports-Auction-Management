




import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Button,
  Paper,
  Fade,
  Zoom,
  Slide,
  Tooltip,
  Chip,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  SportsCricket,
  SportsTennis,
  SportsSoccer,
  AddCircle,
  Save,
  Publish,
  EmojiEvents,
  AttachMoney,
  Rule,
  Schedule,
  Preview,
  Groups,
  CheckCircle,
  Cancel,
  AccessTime,
} from '@mui/icons-material';





export const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #2a3441, #1e2530)',
}));

export const Sidebar = styled(Box)(({ theme }) => ({
  width: 80,
  background: 'linear-gradient(180deg, #1e2530, #2a3441)',
  height: '100vh',
  position: 'fixed',
  left: 0,
  top: 0,
  padding: theme.spacing(3, 1),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  alignItems: 'center',
  borderRight: `1px solid ${alpha('#fff', 0.1)}`,
  zIndex: 1000,
}));

export const ContentArea = styled(Box)(({ theme }) => ({
  marginLeft: 80,
  flex: 1,
  padding: theme.spacing(3),
  background: '#f8fafc',
  borderRadius: '24px 0 0 24px',
  minHeight: '100vh',
  overflow: 'hidden',
}));

export const Header = styled(Box)(({ theme }) => ({
  background: '#ffffff',
  padding: theme.spacing(2, 3),
  borderRadius: 16,
  marginBottom: theme.spacing(3),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
}));

export const TournamentCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
  },
}));

export const StatusChip = styled(Chip)(({ status }) => {
  const colors = {
    LIVE: '#10b981',
    UPCOMING: '#f59e0b',
    COMPLETED: '#6366f1',
    CANCELLED: '#ef4444',
  };
  return {
    backgroundColor: alpha(colors[status], 0.1),
    color: colors[status],
    fontWeight: 'bold',
  };
});

