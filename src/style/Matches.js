import { Avatar, Button, Card, Chip, styled,alpha, DialogTitle, Box } from "@mui/material";

export const COLORS = {
  primary: {
    main: '#2C3E50',
    light: '#34495E',
    dark: '#1A252F',
    contrastText: '#ECF0F1'
  },
  secondary: {
    main: '#3498DB',
    light: '#5DADE2',
    dark: '#2980B9',
    contrastText: '#FFFFFF'
  },
  success: {
    main: '#2ECC71',
    light: '#58D68D',
    dark: '#27AE60',
    contrastText: '#FFFFFF'
  },
  warning: {
    main: '#F1C40F',
    light: '#F4D03F',
    dark: '#F39C12',
    contrastText: '#FFFFFF'
  },
  error: {
    main: '#E74C3C',
    light: '#EC7063',
    dark: '#C0392B',
    contrastText: '#FFFFFF'
  }
};

export const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(0, 0, 0, 0.08)',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.95)',
  },
}));

export const MatchStatusChip = styled(Chip)(({ status, theme }) => {
  const colors = {
    upcoming: { bg: '#2196F3', light: '#E3F2FD' },
    live: { bg: '#4CAF50', light: '#E8F5E9' },
    completed: { bg: '#9E9E9E', light: '#F5F5F5' },
  };
  return {
    backgroundColor: colors[status].light,
    color: colors[status].bg,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: alpha(colors[status].light, 0.8),
    },
  };
});


export const TeamAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  border: '3px solid white',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  textTransform: 'none',
  padding: '8px 16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
  color: 'white',
  padding: theme.spacing(2),
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  minHeight: '100vh',
  background: `linear-gradient(135deg, 
    ${alpha('#f8f9fa', 0.97)} 0%,
    ${alpha('#e9ecef', 0.95)} 50%,
    ${alpha('#dee2e6', 0.92)} 100%)`,
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
  color: '#2C3E50',
  position: 'relative',
  overflow: 'hidden',

  // Subtle pattern overlay
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 100% 0%, 
        ${alpha('#4dabf7', 0.08)} 0%,
        transparent 25%),
      radial-gradient(circle at 0% 100%, 
        ${alpha('#4CAF50', 0.05)} 0%,
        transparent 25%)
    `,
    pointerEvents: 'none'
  },

  // Subtle grid pattern
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(90deg, ${alpha('#000', 0.02)} 1px, transparent 1px),
                 linear-gradient(0deg, ${alpha('#000', 0.02)} 1px, transparent 1px)`,
    backgroundSize: '20px 20px',
    opacity: 0.3,
    pointerEvents: 'none'
  }
}));

export const MatchStatsCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  border: '1px solid rgba(0, 0, 0, 0.08)',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
}));

export const dialogStyles = {
  paper: {
    borderRadius: 2,
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)'
  },
  title: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color: 'white',
    p: 3,
    display: 'flex',
    alignItems: 'center'
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center'
  },
  cricketIcon: {
    mr: 2,
    fontSize: '2rem',
    color: '#FFD700'
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    color: 'white',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'rotate(90deg)'
    }
  },
  content: {
    mt: 2,
    p: 3
  }
};

export const teamSelectionStyles = {
  container: {
    p: 2,
    background: 'rgba(33, 150, 243, 0.05)',
    borderRadius: 2,
    mb: 2
  },
  title: {
    mb: 2,
    display: 'flex',
    alignItems: 'center',
    color: '#1976d2',
    fontWeight: 'bold'
  },
  teamIcon: {
    mr: 1,
    color: '#1976d2'
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'translateX(10px)',
      backgroundColor: 'rgba(0,0,0,0.04)'
    }
  }
};

export const inputStyles = {
  venue: {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#4CAF50'
      }
    }
  },
  icon: {
    mr: 1,
    color: '#4CAF50'
  }
};

export const submitButtonStyles = {
  button: {
    mt: 2,
    height: 56,
    background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    '&:hover': {
      background: 'linear-gradient(45deg, #FF8E53 30%, #FF6B6B 90%)',
      transform: 'scale(1.02)'
    }
  }
};

