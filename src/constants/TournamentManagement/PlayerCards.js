import RuleIcon from '@mui/icons-material/Rule';
import TimelineIcon from '@mui/icons-material/Timeline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CampaignIcon from '@mui/icons-material/Campaign';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';

// const playerTournamentCards = [
//   { 
//     title: 'Team Schedule',
//     value: 'Next: 2d',
//     subtitle: 'vs Thunder Kings',
//     path: '/TeamSchedule',
//     icon: <CalendarTodayIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
//     color: '#2563eb',
//     viewOnly: true
//   },
//   { 
//     title: 'Team Statistics',
//     value: 'Rank 3',
//     subtitle: 'Win Rate: 75%',
//     path: '/TeamStats',
//     icon: <TimelineIcon sx={{ fontSize: 32, color: '#dc2626' }} />,
//     color: '#dc2626',
//     viewOnly: true
//   },
//   { 
//     title: 'Tournament Rules',
//     value: '15/15',
//     subtitle: 'Guidelines',
//     path: '/TournamentRules',
//     icon: <RuleIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
//     color: '#2563eb',
//     viewOnly: true
//   },
//   { 
//     title: 'Matches',
//     value: 'Today: 3',
//     subtitle: 'Next: 9:30',
//     path: '/Matches',
//     icon: <EmojiEventsIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
//     color: '#2563eb',
//     viewOnly: true
//   },
//   { 
//     title: 'Announcements',
//     value: 'New',
//     subtitle: 'Updates & Notices',
//     path: '/Announcements',
//     icon: <CampaignIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
//     color: '#2563eb',
//     viewOnly: true
//   }
// ];


const playerTournamentCards = [
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
    title: 'Rules',
    value: '📜 Standard',
    subtitle: 'Clear & fair tournament guidelines',
    path: '/TournamentRules',
    icon: <RuleIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb',
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
  title: 'Announcements',
  value: '📢 Alerts',
  subtitle: 'Latest updates and notifications',
  path: '/Announcements',
  icon: <CampaignIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
  color: '#2563eb',
  viewOnly: true
}
];


export default playerTournamentCards;