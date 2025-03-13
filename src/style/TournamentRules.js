


import {
    Container,
    Typography,
    Box,
    Button,
    Grid,
    Card,
    CardContent,
    IconButton,
    Chip,
    Fade,
    Zoom,
    Tooltip,
    styled,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Alert,
  } from '@mui/material';
  import {
    ArrowBack,
    Edit,
    Delete,
    Add,
    Schedule,
    People,
    EmojiPeople,
    LocalPolice,
    Stars,
    Close,
    Save,
  } from '@mui/icons-material';


export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  transition: 'all 0.3s ease-in-out',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.95)',
  },
}));

export const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  borderRadius: 30,
  padding: '10px 25px',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
}));

export const CategoryChip = styled(Chip)(({ theme, color }) => ({
  borderRadius: 20,
  fontWeight: 600,
  background: `linear-gradient(45deg, ${theme.palette[color].main}, ${theme.palette[color].light})`,
  color: 'white',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

 export const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.2)',
  },
}));

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    padding: theme.spacing(2),
  },
}));