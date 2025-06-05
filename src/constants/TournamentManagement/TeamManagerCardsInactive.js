import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import RuleIcon from '@mui/icons-material/Rule';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TimelineIcon from '@mui/icons-material/Timeline';
import PersonIcon from '@mui/icons-material/Person';
import CampaignIcon from '@mui/icons-material/Campaign';

const teamManagerCardInactive = [
  {
    title: 'Join Tournament',
    value: 'N/A',
    subtitle: 'Not yet joined',
    path: '/JoinTournament',
    icon: <EmojiEventsIcon sx={{ fontSize: 32, color: '#2563eb' }} />, // Blue
    color: '#2563eb',
  },
  {
    title: 'Team Details',
    value: 'N/A',
    subtitle: 'No active players',
    path: '/TeamDetails',
    icon: <GroupsIcon sx={{ fontSize: 32, color: '#10b981' }} />, // Emerald
    color: '#10b981',
  },
  {
    title: 'Rules',
    value: 'N/A',
    subtitle: 'No rules available',
    path: '/TournamentRules',
    icon: <RuleIcon sx={{ fontSize: 32, color: '#f59e0b' }} />, // Amber
    color: '#f59e0b',
  },
  {
    title: 'Team Schedule',
    value: 'N/A',
    subtitle: 'No scheduled matches',
    path: '/TeamSchedule',
    icon: <CalendarTodayIcon sx={{ fontSize: 32, color: '#2563eb' }} />, // Blue
    color: '#2563eb',
  },
  {
    title: 'Team Statistics',
    value: 'N/A',
    subtitle: 'No stats available',
    path: '/TeamStats',
    icon: <TimelineIcon sx={{ fontSize: 32, color: '#dc2626' }} />, // Red
    color: '#dc2626',
  },
  {
    title: 'Player Management',
    value: 'N/A',
    subtitle: 'No active players',
    path: '/PlayerManagement',
    icon: <PersonIcon sx={{ fontSize: 32, color: '#9333ea' }} />, // Purple
    color: '#9333ea',
  },
  {
    title: 'Announcements',
    value: 'N/A',
    subtitle: 'No announcements yet',
    path: '/Announcements',
    icon: <CampaignIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
    viewOnly: true,
  }
];

  
  export default teamManagerCardInactive;
  