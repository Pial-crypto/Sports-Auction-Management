  import { SportsCricket,Event,CheckCircle,FitnessCenter } from "@mui/icons-material";
  
  export const navigationConfig = [
    { 
      id: 'live',
      icon: <SportsCricket />,
      label: 'Live Matches',
      color: '#FF9800'
    },
    { 
      id: 'upcoming',
      icon: <Event />,
      label: 'Upcoming Matches',
      color: '#2196F3'
    },
    { 
      id: 'completed',
      icon: <CheckCircle />,
      label: 'Completed',
      color: '#4CAF50'
    },
    { 
      id: 'practice',
      icon: <FitnessCenter />,
      label: 'Practice Sessions',
      color: '#9C27B0'
    },
  ];