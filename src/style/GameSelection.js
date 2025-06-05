




import {
  Box,
  Chip,
  Card,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';





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
    active: '#10b981',
    UPCOMING: '#f59e0b',
    COMPLETED: '#6366f1',
    CANCELLED: '#ef4444',
      live: '#10b981',
    active: '#10b981',
    upcoming: '#f59e0b',
    completed: '#6366f1',
    cancelled: '#ef4444',

  };
  
  return {
   // backgroundColor: alpha(colors[status], 0.1),
    color: colors[status],
    fontWeight: 'bold',
  };
});

export const publishStyle={ 
  background: 'linear-gradient(45deg, #06b6d4, #0891b2)',
  '&:hover': {
    background: 'linear-gradient(45deg, #0891b2, #06b6d4)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
  },
  transition: 'all 0.3s ease',
}

export const previewStyle={
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  transition: 'all 0.3s ease',
}

export const saveDraftStyle={
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  transition: 'all 0.3s ease',
}

export const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: '12px',
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.dark,
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const rulesTextFieldStyle={
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'background.paper',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: 'background.default',
      '& fieldset': {
        borderColor: 'primary.main',
      },
    },
  },
  '& .MuiInputLabel-root': {
    color: 'primary.main',
  },
  maxHeight: '120px',
}
