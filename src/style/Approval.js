import { styled, alpha } from '@mui/material/styles';
import { Box, Card, Chip, ToggleButton, IconButton } from '@mui/material';

export const COLORS = {
  primary: '#3B82F6',    // Bright Blue
  secondary: '#6366F1',  // Indigo
  success: '#22C55E',    // Green
  warning: '#F59E0B',    // Amber
  error: '#EF4444',      // Red
  info: '#06B6D4',       // Cyan
  background: '#1E293B', // Dark Blue
  paper: '#293548',      // Lighter Slate
  border: '#475569',     // Slate
  text: {
    primary: '#F8FAFC',   // Very Light Gray
    secondary: '#CBD5E1', // Light Gray
    title: '#FFFFFF',     // White
  }
};

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: `linear-gradient(135deg, ${COLORS.background} 0%, #0F172A 100%)`,
  minHeight: '100vh',
  color: COLORS.text.primary,
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  background: alpha('#FFF', 0.05),
  backdropFilter: 'blur(12px)',
  borderRadius: theme.spacing(2),
  border: `1px solid ${alpha('#FFF', 0.1)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 24px ${alpha('#000', 0.2)}`,
    background: alpha('#FFF', 0.08),
  },
}));

export const FilterButton = styled(ToggleButton)(({ theme }) => ({
  color: '#CBD5E1',
  background: 'rgba(255, 255, 255, 0.05)',
  borderColor: 'rgba(255, 255, 255, 0.1)',
  '&.Mui-selected': {
    color: '#FFFFFF',
    background: 'rgba(59, 130, 246, 0.5)',
    '&:hover': {
      background: 'rgba(59, 130, 246, 0.6)',
    },
  },
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
}));

export const StatusChip = styled(Chip)(({ status }) => {
  const colors = {
    pending: COLORS.warning,
    approved: COLORS.success,
    rejected: COLORS.error,
  };
  return {
    backgroundColor: alpha(colors[status], 0.12),
    color: colors[status],
    fontWeight: 600,
    border: `1px solid ${alpha(colors[status], 0.3)}`,
  };
});

export const StyledIconButton = styled(IconButton)(({ theme, color }) => ({
  backgroundColor: alpha(color || COLORS.primary, 0.1),
  '&:hover': {
    backgroundColor: alpha(color || COLORS.primary, 0.2),
  },
  '& .MuiSvgIcon-root': {
    color: color || COLORS.primary,
  },
  padding: theme.spacing(1),
  transition: 'all 0.2s ease',
})); 