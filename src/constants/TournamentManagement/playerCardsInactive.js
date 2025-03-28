import RuleIcon from '@mui/icons-material/Rule';
import TimelineIcon from '@mui/icons-material/Timeline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CampaignIcon from '@mui/icons-material/Campaign';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const playerCardInactive = [
  { 
    title: 'Join tournament',
    value: 'Join',
    subtitle: '',
    path: '/JoinTournament',
    icon: <CalendarTodayIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    viewOnly: true
  },
  { 
    title: 'Team Statistics',
    value: 'N/A',
    subtitle: '',
    path: '/TeamStats',
    icon: <TimelineIcon sx={{ fontSize: 32, color: '#dc2626' }} />,
    color: '#dc2626',
    viewOnly: true
  },
  { 
    title: 'Tournament Rules',
    value: 'N/A',
    subtitle: '',
    path: '/TournamentRules',
    icon: <RuleIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    viewOnly: true
  },
  { 
    title: 'Matches',
    value: 'N/A',
    subtitle: '',
    path: '/Matches',
    icon: <EmojiEventsIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    viewOnly: true
  },
  { 
    title: 'Announcements',
    value: 'N/A',
    subtitle: '',
    path: '/Announcements',
    icon: <CampaignIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    viewOnly: true
  }
];

export default playerCardInactive;