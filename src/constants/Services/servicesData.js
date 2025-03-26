import { 
  SportsSoccer, 
  Assessment, 
  Group,
  Speed,
  Security,
  Timeline,
  Analytics,
  EmojiEvents
} from '@mui/icons-material';

export const services = [
  {
    id: 1,
    title: 'Player Management',
    description: 'Comprehensive player management including contracts, schedules, and performance tracking.',
    icon: <Group sx={{ fontSize: 40, color: '#2196F3' }} />
  },
  {
    id: 2,
    title: 'Tournament Organization',
    description: 'End-to-end tournament management solutions for all sports.',
    icon: <SportsSoccer sx={{ fontSize: 40, color: '#4CAF50' }} />
  },
  {
    id: 3,
    title: 'Performance Analytics',
    description: 'Advanced analytics and statistics for player and team performance.',
    icon: <Assessment sx={{ fontSize: 40, color: '#FFC107' }} />
  }
];

export const features = [
  {
    id: 1,
    title: 'Real-time Updates',
    description: 'Get instant updates on scores, stats, and player performance.',
    icon: <Speed sx={{ fontSize: 40, color: '#2196F3' }} />
  },
  {
    id: 2,
    title: 'Secure Platform',
    description: 'Advanced security measures to protect sensitive data.',
    icon: <Security sx={{ fontSize: 40, color: '#4CAF50' }} />
  },
  {
    id: 3,
    title: 'Historical Data',
    description: 'Access to comprehensive historical data and trends.',
    icon: <Timeline sx={{ fontSize: 40, color: '#FFC107' }} />
  },
  {
    id: 4,
    title: 'Advanced Analytics',
    description: 'Powerful analytics tools for performance insights.',
    icon: <Analytics sx={{ fontSize: 40, color: '#F44336' }} />
  }
]; 