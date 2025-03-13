
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

const RULE_TYPES = {
  TIME: {
    label: 'Time Rules',
    icon: <Schedule fontSize="large" color="primary" />,
    color: 'primary',
    templates: [
      'Standard match duration is 90 minutes',
      'Extra time consists of two 15-minute periods',
      'Minimum 15-minute half-time break',
    ]
  },
  TEAM: {
    label: 'Team Rules',
    icon: <People fontSize="large" color="success" />,
    color: 'success',
    templates: [
      '11 players per team on field',
      'Maximum 5 substitutes allowed',
      'Minimum 7 players required to start',
    ]
  },
  PLAYER: {
    label: 'Player Rules',
    icon: <EmojiPeople fontSize="large" color="info" />,
    color: 'info',
    templates: [
      'Players must be registered 48 hours before',
      'Age restrictions apply as per category',
      'Valid ID required for registration',
    ]
  },
  DISCIPLINE: {
    label: 'Disciplinary Rules',
    icon: <LocalPolice fontSize="large" color="error" />,
    color: 'error',
    templates: [
      'Yellow card results in warning',
      'Red card leads to match suspension',
      'Three yellows equal one match ban',
    ]
  },
  SCORING: {
    label: 'Scoring Rules',
    icon: <Stars fontSize="large" color="warning" />,
    color: 'warning',
    templates: [
      'Win: 3 points, Draw: 1 point',
      'Goal difference as tiebreaker',
      'Head-to-head record considered',
    ]
  },
};

export default RULE_TYPES;