import RuleIcon from '@mui/icons-material/Rule';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TimelineIcon from '@mui/icons-material/Timeline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VerifiedIcon from '@mui/icons-material/Verified';
import CampaignIcon from '@mui/icons-material/Campaign';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const scheduleCardsDisabled = [
  { 
    title: 'Create Tournament',
    path: '/GameSelection',
    value: 'N/A',
    subtitle: 'Unavailable',
    icon: <EmojiEventsIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    disabled: true
  },
  { 
    title: 'Rules',
    value: 'N/A',
    subtitle: 'Unavailable',
    path: '/TournamentRules',
    icon: <RuleIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    disabled: true
  },
  { 
    title: 'Budget',
    value: 'N/A',
    subtitle: 'Unavailable',
    path: '/Budget',
    icon: <MonetizationOnIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    disabled: true
  },
  { 
    title: 'Statistics',
    value: 'N/A',
    subtitle: 'Unavailable',
    path: '/Statistics',
    icon: <TimelineIcon sx={{ fontSize: 32, color: '#dc2626' }} />,
    color: '#dc2626',
    disabled: true
  },
  { 
    title: 'Matches',
    path: '/Matches',
    value: 'N/A',
    subtitle: 'Unavailable',
    icon: <EmojiEventsIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    disabled: true
  },
  { 
    title: 'Overview',
    path: '/Overview',
    value: 'N/A',
    subtitle: 'Unavailable',
    icon: <DashboardIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    disabled: true
  },
  { 
    title: 'Approval System',
    path: '/Approval',
    value: 'N/A',
    subtitle: 'Unavailable',
    icon: <VerifiedIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    disabled: true
  },
  { 
    title: 'Announcements',
    value: 'N/A',
    path: '/Announcements',
    subtitle: 'Unavailable',
    icon: <CampaignIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    disabled: true
  },
];

export default scheduleCardsDisabled;