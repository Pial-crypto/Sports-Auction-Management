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

// const teamManagerCards = [

//   {
//     title: 'Tournament Status',
//     value: 'Ongoing',
//    // subtitle: 'Matches: 5/10',
//     path: '/Statistics',
//     icon: <EmojiEventsIcon sx={{ fontSize: 32, color: '#16a34a' }} />,
//     color: '#16a34a'
//   }
// ,  
//   { 
//     title: 'Matches',
//     value: 'Active',
//    // subtitle: 'Players: 15/15',
//     path: '/Matches',
//     icon: <GroupsIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
//     color: '#2563eb'
//   },

//   { 
//     title: 'Tournament Budget',
//     value: 'Active',
//     subtitle: 'Players: 15/15',
//     path: '/Budget',
//     icon: <GroupsIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
//     color: '#2563eb'
//   },
//   { 
//     title: 'Rules',
//     value: '15/15',
//     subtitle: 'Tournament Guidelines',
//     path: '/TournamentRules',
//     icon: <RuleIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
//     color: '#2563eb',
//     //viewOnly: true // Indicates this is view-only for team managers
//   },
//   { 
//     title: 'Team Schedule',
//     value: 'Next: 2d',
//     subtitle: 'vs Thunder Kings',
//     path: '/TeamSchedule',
//     icon: <CalendarTodayIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
//     color: '#2563eb'
//   },
//   { 
//     title: 'Team Statistics',
//     value: 'Rank 3',
//     subtitle: 'Win Rate: 75%',
//     path: '/TeamStats',
//     icon: <TimelineIcon sx={{ fontSize: 32, color: '#dc2626' }} />,
//     color: '#dc2626'
//   },

//   { 
//     title: 'Player Management',
//     value: '15',
//     subtitle: 'Active Players',
//     path: '/PlayerManagement',
//     icon: <PersonIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
//     color: '#2563eb'
//   },



//   { 
//     title: 'Announcements',
//     value: 'New',
//     subtitle: 'Team Updates',
//     path: '/Announcements',
//     icon: <CampaignIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
//     color: '#2563eb',
//     viewOnly: true
//   }
// ];

const teamManagerCards = [
  {
    title: 'Tournament Status',
    value: '🔥 Ongoing',
    subtitle: 'Smooth progress across all zones',
    path: '/Statistics',
    icon: <EmojiEventsIcon sx={{ fontSize: 32, color: '#16a34a' }} />,
    color: '#16a34a'
  },
{
  title: 'Matches',
  value: '⚡ Schedule',
  subtitle: 'All fixtures are set\nand get ready to roll again',
  path: '/Matches',
  icon: <GroupsIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
  color: '#2563eb'
},

  { 
    title: 'Tournament Budget',
    value: '💰 Allocated',
    subtitle: 'Budget spread wisely & transparently',
    path: '/Budget',
    icon: <GroupsIcon sx={{ fontSize: 32, color: '#f59e0b' }} />,
    color: '#f59e0b'
  },
  { 
    title: 'Rules',
    value: '📜 Standard',
    subtitle: 'Clear & fair tournament guidelines',
    path: '/TournamentRules',
    icon: <RuleIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
  },
  { 
    title: 'Team Schedule',
    value: '⏳ Upcoming',
    subtitle: 'Matches lined up for the season',
    path: '/TeamSchedule',
    icon: <CalendarTodayIcon sx={{ fontSize: 32, color: '#10b981' }} />,
    color: '#10b981'
  },
  { 
    title: 'Team Statistics',
    value: '🏅 Ranked',
    subtitle: 'Tracking wins & performance trends',
    path: '/TeamStats',
    icon: <TimelineIcon sx={{ fontSize: 32, color: '#dc2626' }} />,
    color: '#dc2626'
  },
{
  title: 'Player Management',
  value: '👥 Players',
  subtitle: 'Roster details and team management',
  path: '/PlayerManagement',
  icon: <PersonIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
  color: '#2563eb'
},
{
  title: 'Announcements',
  value: '📢 Alerts',
  subtitle: 'Latest updates and notifications',
  path: '/Announcements',
  icon: <CampaignIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
  color: '#2563eb',
  viewOnly: true
}



];




export default teamManagerCards;