import { WorkOutline, HealthAndSafety, School } from '@mui/icons-material';

export const jobs = [
  {
    id: 1,
    title: "Sports Analytics Department",
    department: "Analytics",
    location: "New York",
    description: "Our analytics team develops and implements data-driven strategies for player performance optimization.",
    requirements: "Expertise in sports analytics, data science, and performance metrics"
  },
  {
    id: 2,
    title: "Player Development Division",
    department: "Training",
    location: "Los Angeles",
    description: "Focused on athlete development through advanced training methodologies and personalized programs.",
    requirements: "Specialization in sports science and athletic performance"
  },
  {
    id: 3,
    title: "Tournament Operations",
    department: "Events",
    location: "Chicago",
    description: "Manages all aspects of tournament organization and execution across multiple sports disciplines.",
    requirements: "Experience in sports event management and logistics"
  }
];

export const benefits = [
  {
    id: 1,
    title: "Professional Environment",
    description: "State-of-the-art facilities and equipment",
    icon: <WorkOutline sx={{ fontSize: 40, color: '#2196F3' }} />
  },
  {
    id: 2,
    title: "Expert Team",
    description: "Work alongside industry-leading professionals",
    icon: <HealthAndSafety sx={{ fontSize: 40, color: '#4CAF50' }} />
  },
  {
    id: 3,
    title: "Innovation Focus",
    description: "Cutting-edge approaches to sports management",
    icon: <School sx={{ fontSize: 40, color: '#FFC107' }} />
  }
]; 