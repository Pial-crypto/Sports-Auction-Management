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
      icon: <EmojiEventsIcon sx={{ fontSize: 32, color: '#9ca3af' }} />,
      color: '#9ca3af',
    },
    { 
      title: 'Team Details',
      value: 'N/A',
      subtitle: 'No active players',
      path: '/TeamDetails',
      icon: <GroupsIcon sx={{ fontSize: 32, color: '#9ca3af' }} />,
      color: '#9ca3af',
    },
    { 
      title: 'Rules',
      value: 'N/A',
      subtitle: 'No rules available',
      path: '/TournamentRules',
      icon: <RuleIcon sx={{ fontSize: 32, color: '#9ca3af' }} />,
      color: '#9ca3af',
    },
    { 
      title: 'Team Schedule',
      value: 'N/A',
      subtitle: 'No scheduled matches',
      path: '/TeamSchedule',
      icon: <CalendarTodayIcon sx={{ fontSize: 32, color: '#9ca3af' }} />,
      color: '#9ca3af',
    },
    { 
      title: 'Team Statistics',
      value: 'N/A',
      subtitle: 'No stats available',
      path: '/TeamStats',
      icon: <TimelineIcon sx={{ fontSize: 32, color: '#9ca3af' }} />,
      color: '#9ca3af',
    },
    { 
      title: 'Player Management',
      value: 'N/A',
      subtitle: 'No active players',
      path: '/PlayerManagement',
      icon: <PersonIcon sx={{ fontSize: 32, color: '#9ca3af' }} />,
      color: '#9ca3af',
    },
    { 
      title: 'Announcements',
      value: 'N/A',
      subtitle: 'No announcements yet',
      path: '/Announcements',
      icon: <CampaignIcon sx={{ fontSize: 32, color: '#9ca3af' }} />,
      color: '#9ca3af',
      viewOnly: true,
    }
  ];
  
  export default teamManagerCardInactive;
  