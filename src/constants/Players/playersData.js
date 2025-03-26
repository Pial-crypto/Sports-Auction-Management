import { EmojiEvents, Speed, Group, Timeline } from '@mui/icons-material';

export const players = [
  {
    id: 1,
    name: "John Smith",
    position: "Forward",
    description: "Top scorer with exceptional field vision and leadership skills.",
    image: "/players/player1.jpg"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    position: "Midfielder",
    description: "Creative playmaker known for precise passing and game control.",
    image: "/players/player2.jpg"
  },
  {
    id: 3,
    name: "Mike Wilson",
    position: "Defender",
    description: "Solid defender with excellent tactical understanding.",
    image: "/players/player3.jpg"
  }
];

export const stats = [
  {
    id: 1,
    title: "Tournaments Won",
    value: "32",
    icon: <EmojiEvents sx={{ fontSize: 40, color: '#FFC107' }} />
  },
  {
    id: 2,
    title: "Active Players",
    value: "150+",
    icon: <Group sx={{ fontSize: 40, color: '#2196F3' }} />
  },
  {
    id: 3,
    title: "Success Rate",
    value: "89%",
    icon: <Speed sx={{ fontSize: 40, color: '#4CAF50' }} />
  },
  {
    id: 4,
    title: "Years Active",
    value: "15+",
    icon: <Timeline sx={{ fontSize: 40, color: '#F44336' }} />
  }
]; 