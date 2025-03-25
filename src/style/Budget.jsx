import { styled, alpha } from '@mui/material/styles';
import { Box, Card } from '@mui/material';

export const COLORS = {
  primary: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#00BCD4',
};

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  minHeight: '100vh',
  position: 'relative',
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  transition: 'all 0.3s ease',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  },
}));

export const StatBox = styled(Box)(({ theme, colortype }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  background: alpha(COLORS[colortype], 0.1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    background: alpha(COLORS[colortype], 0.15),
  },
}));