import GroupsIcon from '@mui/icons-material/Groups';
import RuleIcon from '@mui/icons-material/Rule';
import TimelineIcon from '@mui/icons-material/Timeline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CampaignIcon from '@mui/icons-material/Campaign';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';

const teamManagerCards = [
  { 
    title: 'Team Details',
    value: 'Active',
    subtitle: 'Players: 15/15',
    path: '/TeamDetails',
    icon: <GroupsIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb'
  },
  { 
    title: 'Rules',
    value: '15/15',
    subtitle: 'Tournament Guidelines',
    path: '/TournamentRules',
    icon: <RuleIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    viewOnly: true // Indicates this is view-only for team managers
  },
  { 
    title: 'Team Schedule',
    value: 'Next: 2d',
    subtitle: 'vs Thunder Kings',
    path: '/TeamSchedule',
    icon: <CalendarTodayIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb'
  },
  { 
    title: 'Team Statistics',
    value: 'Rank 3',
    subtitle: 'Win Rate: 75%',
    path: '/TeamStats',
    icon: <TimelineIcon sx={{ fontSize: 32, color: '#dc2626' }} />,
    color: '#dc2626'
  },

  { 
    title: 'Player Management',
    value: '15',
    subtitle: 'Active Players',
    path: '/PlayerManagement',
    icon: <PersonIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb'
  },



  { 
    title: 'Announcements',
    value: 'New',
    subtitle: 'Team Updates',
    path: '/Announcements',
    icon: <CampaignIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    viewOnly: true
  }
];

export default teamManagerCards;