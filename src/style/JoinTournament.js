import { styled, alpha } from '@mui/material/styles';
import { Box, Card, Chip } from '@mui/material';

export const COLORS = {
  cricket: {
    primary: '#1d4ed8',
    secondary: '#3b82f6',
    light: '#93c5fd',
  },
  football: {
    primary: '#047857',
    secondary: '#10b981',
    light: '#6ee7b7',
  },
  badminton: {
    primary: '#7c3aed',
    secondary: '#8b5cf6',
    light: '#c4b5fd',
  }
};

export const StyledCard = styled(Card, {
  shouldForwardProp: prop => prop !== 'sportType'
})(({ theme, sportType = 'cricket' }) => ({
  borderRadius: theme.spacing(2),
  background: `linear-gradient(135deg, ${alpha(COLORS[sportType].primary, 0.02)} 0%, ${alpha(COLORS[sportType].secondary, 0.05)} 100%)`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(COLORS[sportType].primary, 0.1)}`,
  boxShadow: `0 4px 20px ${alpha(COLORS[sportType].primary, 0.1)}`,
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 12px 30px ${alpha(COLORS[sportType].primary, 0.2)}`,
  },
}));

export const SportIcon = styled(Box, {
  shouldForwardProp: prop => prop !== 'sportType'
})(({ theme, sportType = 'cricket' }) => ({
  width: 50,
  height: 50,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${COLORS[sportType].primary}, ${COLORS[sportType].secondary})`,
  color: 'white',
  marginRight: theme.spacing(2),
}));

export const StatusChip = styled(Chip, {
  shouldForwardProp: prop => prop !== 'status'
})(({ theme, status }) => {
  const colors = {
    active: '#059669',
    upcoming: '#2563eb',
    completed: '#dc2626',
  };
  
  return {
    backgroundColor: alpha(colors[status], 0.1),
    color: colors[status],
    fontWeight: 600,
    border: `1px solid ${alpha(colors[status], 0.2)}`,
  };
});

export const TournamentImage = styled('img')({
  width: '100%',
  height: 200,
  objectFit: 'cover',
  borderRadius: '16px 16px 0 0',
}); 