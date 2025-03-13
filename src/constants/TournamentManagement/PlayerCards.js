import RuleIcon from '@mui/icons-material/Rule';
import TimelineIcon from '@mui/icons-material/Timeline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CampaignIcon from '@mui/icons-material/Campaign';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const playerTournamentCards = [
  { 
    title: 'Team Schedule',
    value: 'Next: 2d',
    subtitle: 'vs Thunder Kings',
    path: '/TeamSchedule',
    icon: <CalendarTodayIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    viewOnly: true
  },
  { 
    title: 'Team Statistics',
    value: 'Rank 3',
    subtitle: 'Win Rate: 75%',
    path: '/TeamStats',
    icon: <TimelineIcon sx={{ fontSize: 32, color: '#dc2626' }} />,
    color: '#dc2626',
    viewOnly: true
  },
  { 
    title: 'Tournament Rules',
    value: '15/15',
    subtitle: 'Guidelines',
    path: '/TournamentRules',
    icon: <RuleIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    viewOnly: true
  },
  { 
    title: 'Matches',
    value: 'Today: 3',
    subtitle: 'Next: 9:30',
    path: '/Matches',
    icon: <EmojiEventsIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    viewOnly: true
  },
  { 
    title: 'Announcements',
    value: 'New',
    subtitle: 'Updates & Notices',
    path: '/Announcements',
    icon: <CampaignIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    viewOnly: true
  }
];

export default playerTournamentCards;