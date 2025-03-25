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

const GAME_SPECIFIC_TEMPLATES = {
  CRICKET: {
    TIME: [
      'Standard match duration is 50 overs per team',
      'T20 format: 20 overs per team',
      'Minimum 20 overs for DLS method',
    ],
    TEAM: [
      '11 players per team on field',
      'Maximum 4 substitute players allowed',
      'One super sub allowed per match',
    ],
    PLAYER: [
      'Players must be registered 48 hours before',
      'Age restrictions as per category',
      'Valid ID and NOC required for registration',
    ],
    DISCIPLINE: [
      'Three warnings lead to suspension',
      'Ball tampering results in match ban',
      'Excessive appealing leads to penalty',
    ],
    SCORING: [
      'Win: 2 points, Tie: 1 point, No Result: 1 point',
      'Net run rate as tiebreaker',
      'Bonus point for quick victories',
    ],
  },
  FOOTBALL: {
    TIME: [
      'Standard match duration is 90 minutes',
      'Extra time: Two 15-minute periods',
      'Minimum 15-minute half-time break',
    ],
    TEAM: [
      '11 players per team on field',
      'Maximum 5 substitutes allowed',
      'Minimum 7 players to start match',
    ],
    PLAYER: [
      'Players must be registered 24 hours before',
      'Age category restrictions apply',
      'Valid club registration required',
    ],
    DISCIPLINE: [
      'Yellow card: Warning',
      'Red card: Match suspension',
      'Three yellows equal one match ban',
    ],
    SCORING: [
      'Win: 3 points, Draw: 1 point',
      'Goal difference as tiebreaker',
      'Head-to-head record considered',
    ],
  },
  BADMINTON: {
    TIME: [
      'Best of 3 games format',
      '2-minute break between games',
      'Maximum 1-hour match duration',
    ],
    TEAM: [
      'Singles: 1 player per side',
      'Doubles: 2 players per side',
      'Mixed doubles allowed',
    ],
    PLAYER: [
      'Players must register 2 hours before',
      'Age category verification required',
      'Valid sports association ID needed',
    ],
    DISCIPLINE: [
      'Misconduct leads to point penalty',
      'Repeated violations: game forfeit',
      'Equipment must meet BWF standards',
    ],
    SCORING: [
      '21 points to win a game',
      'Must win by 2 points',
      'Service rules as per BWF',
    ],
  },
};

const RULE_TYPES = {
  TIME: {
    label: 'Time Rules',
    icon: <Schedule fontSize="large" color="primary" />,
    color: 'primary',
    getTemplates: (gameType) => GAME_SPECIFIC_TEMPLATES[gameType]?.TIME || [],
  },
  TEAM: {
    label: 'Team Rules',
    icon: <People fontSize="large" color="success" />,
    color: 'success',
    getTemplates: (gameType) => GAME_SPECIFIC_TEMPLATES[gameType]?.TEAM || [],
  },
  PLAYER: {
    label: 'Player Rules',
    icon: <EmojiPeople fontSize="large" color="info" />,
    color: 'info',
    getTemplates: (gameType) => GAME_SPECIFIC_TEMPLATES[gameType]?.PLAYER || [],
  },
  DISCIPLINE: {
    label: 'Disciplinary Rules',
    icon: <LocalPolice fontSize="large" color="error" />,
    color: 'error',
    getTemplates: (gameType) => GAME_SPECIFIC_TEMPLATES[gameType]?.DISCIPLINE || [],
  },
  SCORING: {
    label: 'Scoring Rules',
    icon: <Stars fontSize="large" color="warning" />,
    color: 'warning',
    getTemplates: (gameType) => GAME_SPECIFIC_TEMPLATES[gameType]?.SCORING || [],
  },
};

export default RULE_TYPES;