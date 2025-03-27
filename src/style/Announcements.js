import { styled, alpha } from '@mui/material/styles';
import { Box, Card, Chip } from '@mui/material';

export const COLORS = {
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

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: COLORS.background,
  minHeight: '100vh',
  color: COLORS.text.primary,
}));

export const StyledCard = styled(Card)(({ theme, $isActive }) => ({
  background: COLORS.paper,
  borderRadius: theme.spacing(2),
  border: $isActive ? `2px solid ${COLORS.primary}` : `1px solid ${COLORS.border}`,
  boxShadow: $isActive 
    ? `0 0 0 3px ${alpha(COLORS.primary, 0.2)}`
    : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: $isActive
      ? `0 20px 25px -5px ${alpha(COLORS.primary, 0.25)}`
      : '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
}));

export const StatCard = styled(Card)(({ theme, $active, color }) => ({
  background: COLORS.paper,
  borderRadius: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: $active ? alpha(color || COLORS.primary, 0.05) : 'transparent',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
  },
}));

export const PriorityChip = styled(Chip)(({ priority }) => {
  const colors = {
    high: { bg: COLORS.error, light: alpha(COLORS.error, 0.12) },
    medium: { bg: COLORS.warning, light: alpha(COLORS.warning, 0.12) },
    low: { bg: COLORS.success, light: alpha(COLORS.success, 0.12) },
  };
  return {
    backgroundColor: colors[priority]?.light || colors.medium.light,
    color: colors[priority]?.bg || colors.medium.bg,
    fontWeight: 600,
    fontSize: '0.875rem',
    border: `1px solid ${alpha(colors[priority]?.bg || colors.medium.bg, 0.3)}`,
    '&:hover': {
      backgroundColor: alpha(colors[priority]?.bg || colors.medium.bg, 0.2),
    },
  };
}); 