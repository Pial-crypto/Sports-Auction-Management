import {
  Box,
  Grid,
  Card,
  Chip,
  IconButton,
  Fade,
  DialogTitle,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
// Update color theme for better visibility
const COLORS = {
  primary: '#3B82F6',    // Bright Blue
  secondary: '#6366F1',  // Indigo
  success: '#22C55E',    // Green
  warning: '#F59E0B',    // Amber
  error: '#EF4444',      // Red
  info: '#06B6D4',       // Cyan
  background: '#1E293B', // Lighter Dark Blue
  paper: '#293548',      // Lighter Slate
  border: '#475569',     // Slate
  text: {
    primary: '#F8FAFC',    // Very Light Gray
    secondary: '#CBD5E1',  // Light Gray
    title: '#FFFFFF',      // White
  }
};

// Styled Components
const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: `linear-gradient(135deg, ${COLORS.background} 0%, #242F3D 100%)`,
  minHeight: '100vh',
  color: COLORS.text.primary,
}));

const StyledCard = styled(Card)(({ theme }) => ({
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

const StatusChip = styled(Chip)(({ status }) => {
  const colors = {
    pending: { bg: COLORS.warning, light: alpha(COLORS.warning, 0.12) },
    approved: { bg: COLORS.success, light: alpha(COLORS.success, 0.12) },
    rejected: { bg: COLORS.error, light: alpha(COLORS.error, 0.12) },
  };
  return {
    backgroundColor: colors[status].light,
    color: colors[status].bg,
    fontWeight: 600,
    border: `1px solid ${alpha(colors[status].bg, 0.3)}`,
    '& .MuiChip-icon': {
      color: colors[status].bg,
    },
    '&:hover': {
      backgroundColor: alpha(colors[status].bg, 0.2),
    },
  };
});

const StyledIconButton = styled(IconButton)(({ theme, color }) => ({
  backgroundColor: alpha(color, 0.1),
  '&:hover': {
    backgroundColor: alpha(color, 0.2),
  },
}));

const GlowingBorder = styled(Box)(({ theme, color }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  background: alpha(color, 0.08),
  border: `1px solid ${alpha(color, 0.2)}`,
  boxShadow: `0 0 20px ${alpha(color, 0.08)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: alpha(color, 0.12),
    boxShadow: `0 0 30px ${alpha(color, 0.12)}`,
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: `linear-gradient(45deg, ${alpha(COLORS.primary, 0.8)}, ${alpha(COLORS.secondary, 0.8)})`,
  color: COLORS.text.title,
  padding: theme.spacing(3),
  fontSize: '1.5rem',
  fontWeight: 600,
}));

export { MainContainer, StyledCard, StatusChip, StyledIconButton, GlowingBorder, StyledDialogTitle,COLORS };
