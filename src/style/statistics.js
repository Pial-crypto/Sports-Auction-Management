
import {
  Card,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCard = styled(Card)(() => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: 16,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  color: 'white',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
    background: 'rgba(255, 255, 255, 0.08)',
  },
}));