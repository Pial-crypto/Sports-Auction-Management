import { Box, Chip, styled } from "@mui/material";
import { Card } from "@mui/material";

import { alpha } from "@mui/material/styles";

export const GlassCard = styled(Card)(() => ({
  background: 'white',
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  border: '1px solid #eef2f6',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
  },
}));

export const StatusChip = styled(Chip)(({ status }) => {
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


export const NavigationToolbar = styled(Box)(({ theme }) => ({
  background: 'white',
  borderRadius: '12px',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(4),
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
}));

  // Styled Components
export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: '#f8fafc',
  minHeight: '100vh',
  position: 'relative',
}));