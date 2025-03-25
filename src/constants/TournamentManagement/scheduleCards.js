import GroupsIcon from '@mui/icons-material/Groups';
import RuleIcon from '@mui/icons-material/Rule';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TimelineIcon from '@mui/icons-material/Timeline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VerifiedIcon from '@mui/icons-material/Verified';
import CampaignIcon from '@mui/icons-material/Campaign';
import SportsScoreIcon from '@mui/icons-material/SportsScore';

import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
const scheduleCards = [
  /* { 
    title: 'Create Team',
    value: '2.0',
    subtitle: 'Player Management',
    icon: <GroupsIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb'
  }, */
  { 
    title: 'Current Tournament',
    path:'/GameSelection',
    value: 'Ready', // বা 'Active' যখন টুর্নামেন্ট চলবে
    subtitle: 'See all tournamets', // বা 'Tournament in progress' যখন চলবে
    icon: <EmojiEventsIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    disabled: false // টুর্নামেন্ট চলাকালীন true হবে
  },
  /* { 
    title: 'Rules',
    value: '2.0',
    subtitle: 'Tournament Rules',
    icon: <RuleIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb'
  }, */
  { 
    title: 'Rules',
    value: '15/15',
    subtitle: 'Updated: 2hrs ago',
    path:'/TournamentRules',
    icon: <RuleIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb'
  },
  /* { 
    title: 'Budget',
    value: '2:10',
    subtitle: 'Team Budget',
    icon: <MonetizationOnIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb'
  }, */
  { 
    title: 'Budget',
    value: '৳50K',
    subtitle: 'Expense: 60%',
    path:'/Budget',
    icon: <MonetizationOnIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb'
  },
  /* { 
    title: 'Statistics',
    value: '15.10',
    subtitle: 'Team Stats',
    icon: <TimelineIcon sx={{ fontSize: 32, color: '#dc2626' }} />,
    color: '#dc2626'
  }, */
  { 
    title: 'Statistics',
    value: 'Quarter',
    path:'/Statistics',
    subtitle: 'Progress: 45%',
    icon: <TimelineIcon sx={{ fontSize: 32, color: '#dc2626' }} />,
    color: '#dc2626'
  },
  /* { 
    title: 'Matches',
    value: '9:30',
    subtitle: 'Tournament Matches',
    icon: <EmojiEventsIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb'
  }, */
  { 
    title: 'Matches',
    path:'/Matches',
    value: 'Today: 3',
    subtitle: 'Next: 9:30',
    icon: <EmojiEventsIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb'
  },


    { 
    title: 'Overview',
    path:'/Overview',
    value: 'Live',
    subtitle: 'Quick Access Dashboard',
    icon: <DashboardIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb'
  },
  { 
    title: 'Approval System',
    path:'/Approval',
    value: '⌛ 5' ,// (Hourglass emoji with number)
    subtitle: 'Teams & Scores',
    icon: <VerifiedIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb'
  },
  { 
    title: 'Announcements',
    value: 'New',
    path:'/Announcements',
    subtitle: 'Updates & Notices',
    icon: <CampaignIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb'
  },
];

export default scheduleCards;