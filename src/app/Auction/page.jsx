"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Avatar,
  IconButton,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Stepper,
  Step,
  StepLabel,
  Tooltip,
  Badge,
  Divider,
  Zoom,
  Fade,
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  History,
  Timeline,
  SportsCricket,
  Notifications,
  Timer,
  Gavel,
  Person,
  EmojiEvents,
  Groups,
  Assessment,
  MonetizationOn,
  AccessTime,
  PersonAdd,
  TrendingUp,
  Star,
  Info as InfoIcon,
  ArrowForward,
  ArrowBack,
  CheckCircle,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement
);

// Role constants
const ROLES = {
  PLAYER: 'player',
  TEAM_MANAGER: 'team_manager',
  TOURNAMENT_MANAGER: 'tournament_manager'
};

// Colors
const COLORS = {
  primary: '#4F46E5',    // Indigo (main brand color)
  secondary: '#3B82F6',  // Blue (complementary)
  success: '#10B981',    // Emerald (softer green)
  warning: '#F59E0B',    // Warm Amber
  error: '#EF4444',      // Softer Red
  info: '#06B6D4',       // Cyan
  background: '#F8FAFC', // Cool Light Gray
  paper: '#FFFFFF',      // Pure White
  border: '#E2E8F0',     // Subtle Border
  accent: '#8B5CF6',     // Purple (for highlights)
  text: {
    primary: '#1E293B',   // Dark Blue Gray
    secondary: '#64748B', // Medium Blue Gray
    title: '#312E81',     // Deep Indigo
    light: '#F1F5F9',    // Light Gray (for dark backgrounds)
  },
  chart: {
    gradient1: '#818CF8', // Light Indigo
    gradient2: '#6366F1', // Mid Indigo
    gradient3: '#4F46E5', // Dark Indigo
    highlight: '#C7D2FE', // Very Light Indigo
  }
};

// Dummy data
const DUMMY_PLAYERS = [
  {
    id: 1,
    name: "Shakib Al Hasan",
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316568.png",
    basePrice: 50000,
    stats: {
      matches: 215,
      runs: 6436,
      wickets: 285,
      average: 31.5,
      economy: 4.12,
      strikeRate: 82.3,
    },
    achievements: [
      "ICC All-Rounder #1",
      "Player of the Tournament 2019",
      "5 World Cup Appearances"
    ],
    status: 'active',
    currentBid: 75000,
    highestBidder: 'Dhaka Dynamites'
  },
  {
    id: 2,
    name: "Tamim Iqbal",
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316569.png",
    basePrice: 45000,
    stats: {
      matches: 230,
      runs: 8500,
      centuries: 14,
      average: 37.2,
      strikeRate: 78.5,
    },
    achievements: [
      "Highest Run Scorer for Bangladesh",
      "14 ODI Centuries",
      "Multiple Match-winning Innings"
    ],
    status: 'pending',
    currentBid: 0,
    highestBidder: null
  },
  {
    id: 3,
    name: "Mushfiqur Rahim",
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316571.png",
    basePrice: 40000,
    stats: {
      matches: 242,
      runs: 6945,
      centuries: 8,
      average: 34.2,
      strikeRate: 79.5,
    },
    achievements: [
      "Most Dismissals by BD Keeper",
      "First Double Century in Tests",
      "Most Runs in a Single WC"
    ],
    status: 'active',
    currentBid: 0,
    highestBidder: null
  },
  {
    id: 4,
    name: "Mahmudullah Riyad",
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316572.png",
    basePrice: 35000,
    stats: {
      matches: 218,
      runs: 4950,
      wickets: 82,
      average: 33.8,
      strikeRate: 75.5,
    },
    achievements: [
      "First WC Century for Bangladesh",
      "Most T20I Runs for Bangladesh",
      "Multiple Match-winning Knocks"
    ],
    status: 'pending',
    currentBid: 0,
    highestBidder: null
  },
  {
    id: 5,
    name: "Mustafizur Rahman",
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316573.png",
    basePrice: 42000,
    stats: {
      matches: 125,
      wickets: 165,
      economy: 5.32,
      average: 23.5,
      bestFigures: "6/43",
    },
    achievements: [
      "Best Figures in ODI Debut",
      "IPL Purple Cap Contender",
      "Most 5-wicket Hauls in a Series"
    ],
    status: 'active',
    currentBid: 0,
    highestBidder: null
  },
  {
    id: 6,
    name: "Litton Das",
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316574.png",
    basePrice: 38000,
    stats: {
      matches: 135,
      runs: 3850,
      centuries: 5,
      average: 33.5,
      strikeRate: 82.8,
    },
    achievements: [
      "Fastest Century in BPL",
      "Record Partnership vs India",
      "Multiple Match-winning Innings"
    ],
    status: 'pending',
    currentBid: 0,
    highestBidder: null
  },
  {
    id: 7,
    name: "Mehidy Hasan Miraz",
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316575.png",
    basePrice: 36000,
    stats: {
      matches: 145,
      wickets: 155,
      runs: 1850,
      economy: 4.45,
      average: 28.5,
    },
    achievements: [
      "Best All-rounder in Tests 2022",
      "Youngest Test 12-wicket Haul",
      "Match-winning Partnership vs India"
    ],
    status: 'active',
    currentBid: 0,
    highestBidder: null
  },
  {
    id: 8,
    name: "Taskin Ahmed",
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316576.png",
    basePrice: 34000,
    stats: {
      matches: 112,
      wickets: 128,
      economy: 5.78,
      average: 32.4,
      bestFigures: "5/28",
    },
    achievements: [
      "Hat-trick in ODI Cricket",
      "Best Bowler in BPL 2022",
      "Fastest Ball by BD Bowler"
    ],
    status: 'pending',
    currentBid: 0,
    highestBidder: null
  }
];

// Auction phases
const AUCTION_PHASES = [
  'Registration',
  'Player Selection',
  'Bidding',
  'Confirmation',
  'Complete'
];

// Add phase descriptions
const PHASE_DETAILS = {
  Registration: {
    title: 'Player Registration',
    description: 'Players are being registered for the auction',
    icon: <PersonAdd />,
    color: COLORS.info
  },
  'Player Selection': {
    title: 'Player Selection',
    description: 'Tournament manager selecting next player for auction',
    icon: <Groups />,
    color: COLORS.primary
  },
  Bidding: {
    title: 'Live Bidding',
    description: 'Active bidding in progress',
    icon: <Gavel />,
    color: COLORS.accent
  },
  Confirmation: {
    title: 'Bid Confirmation',
    description: 'Confirming final bid and team allocation',
    icon: <CheckCircle />,
    color: COLORS.success
  },
  Complete: {
    title: 'Auction Complete',
    description: 'Player has been successfully auctioned',
    icon: <EmojiEvents />,
    color: COLORS.secondary
  }
};

// Styled Components
const GlassCard = styled(Box)(({ theme }) => ({
  background: COLORS.paper,
  borderRadius: 16,
  padding: theme.spacing(3),
  border: `1px solid ${COLORS.border}`,
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
}));

const BidButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
  borderRadius: 8,
  color: COLORS.text.light,
  padding: '10px 24px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: `0 4px 6px -1px ${alpha(COLORS.primary, 0.2)}`,
  '&:hover': {
    background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.primary} 100%)`,
    boxShadow: `0 10px 15px -3px ${alpha(COLORS.primary, 0.3)}`,
  },
}));

const Jersey = styled(Box)(({ bgcolor = '#ffffff' }) => ({
  width: '100%',
  height: 140,
  background: `linear-gradient(145deg, ${bgcolor} 0%, ${alpha(bgcolor, 0.9)} 100%)`,
  borderRadius: 12,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
}));

const CircularProgressWithLabel = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  '& .MuiCircularProgress-root': {
    color: '#3b82f6',
  },
}));

const PlayerCard = ({ player }) => (
  <GlassCard>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
      <Avatar 
        src={player.image} 
        sx={{ 
          width: 100, 
          height: 100,
          border: `3px solid ${COLORS.primary}`,
          boxShadow: '0 4px 6px -1px rgb(37 99 235 / 0.2)',
        }} 
      />
      <Box>
        <Typography variant="h4" sx={{ color: COLORS.text.title, fontWeight: 700, mb: 1 }}>
          {player.name}
        </Typography>
        <Chip 
          label={`Base Price: ${player.basePrice}`}
          sx={{ 
            bgcolor: alpha(COLORS.primary, 0.1),
            color: COLORS.primary,
            fontWeight: 600,
          }}
        />
      </Box>
    </Box>
    
    <Grid container spacing={3}>
      {Object.entries(player.stats).map(([key, value]) => (
        <Grid item xs={6} sm={4} key={key}>
          <Box sx={{ 
            textAlign: 'center',
            p: 2,
            borderRadius: 2,
            bgcolor: alpha(COLORS.primary, 0.05),
            border: `1px solid ${alpha(COLORS.primary, 0.1)}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: alpha(COLORS.primary, 0.08),
              transform: 'translateY(-2px)',
            }
          }}>
            <Typography variant="h5" sx={{ color: COLORS.primary, fontWeight: 700, mb: 1 }}>
              {value}
            </Typography>
            <Typography sx={{ color: COLORS.text.secondary, fontWeight: 500 }}>
              {key.toUpperCase()}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </GlassCard>
);

const BidHistory = ({ history }) => (
  <GlassCard>
    <Typography variant="h6" sx={{ color: COLORS.text.title, fontWeight: 600, mb: 3 }}>
      Bid History
    </Typography>
    <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
      {history.map((bid, index) => (
        <Box 
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            mb: 1,
            borderRadius: 1,
            bgcolor: index === 0 ? alpha(COLORS.accent, 0.1) : 'transparent',
            border: `1px solid ${index === 0 ? alpha(COLORS.accent, 0.2) : COLORS.border}`,
          }}
        >
          <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
            {bid.team}
          </Typography>
          <Typography sx={{ 
            color: COLORS.primary, 
            fontWeight: 600,
            fontSize: '1.1rem'
          }}>
            ${bid.amount}
          </Typography>
          <Typography sx={{ color: COLORS.text.secondary }}>
            {bid.time}
          </Typography>
        </Box>
      ))}
    </Box>
  </GlassCard>
);

// Timer Component
const AuctionTimer = ({ timeLeft, maxTime }) => (
  <Box sx={{ 
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center'
  }}>
    <CircularProgress
      variant="determinate"
      value={(timeLeft / maxTime) * 100}
      size={120}
      thickness={4}
      sx={{
        color: timeLeft < 10 ? COLORS.error : COLORS.accent,
        '& .MuiCircularProgress-circle': {
          strokeLinecap: 'round',
        },
      }}
    />
    <Box sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Typography
        variant="h3"
        sx={{
          color: timeLeft < 10 ? COLORS.error : COLORS.text.primary,
          fontWeight: 700,
        }}
      >
        {timeLeft}
      </Typography>
    </Box>
  </Box>
);

// Player Stats Chart
const PlayerStatsChart = ({ stats }) => {
  const data = {
    labels: Object.keys(stats),
    datasets: [{
      label: 'Player Statistics',
      data: Object.values(stats),
      backgroundColor: `linear-gradient(180deg, ${alpha(COLORS.chart.gradient1, 0.2)} 0%, ${alpha(COLORS.chart.gradient3, 0.05)} 100%)`,
      borderColor: COLORS.chart.gradient2,
      borderWidth: 2,
      pointBackgroundColor: COLORS.chart.gradient1,
      pointBorderColor: COLORS.chart.gradient3,
      fill: true,
    }]
  };

  return (
    <Box sx={{ height: 200, mt: 3 }}>
      <Line data={data} options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }} />
    </Box>
  );
};

// Bidding Trends Chart
const BiddingTrendsChart = ({ bidHistory }) => {
  const data = {
    labels: bidHistory.map(bid => bid.time),
    datasets: [{
      label: 'Bid Amount Trend',
      data: bidHistory.map(bid => bid.amount),
      backgroundColor: `linear-gradient(180deg, ${alpha(COLORS.chart.gradient1, 0.2)} 0%, ${alpha(COLORS.chart.gradient3, 0.05)} 100%)`,
      borderColor: COLORS.chart.gradient2,
      borderWidth: 2,
    }]
  };

  return (
    <Box sx={{ height: 200 }}>
      <Bar data={data} options={{
        responsive: true,
        maintainAspectRatio: false,
      }} />
    </Box>
  );
};

const AuctionDashboard = () => {
  // Move all hooks inside the component
  const [userRole, setUserRole] = useState(ROLES.TEAM_MANAGER);
  const [currentBid, setCurrentBid] = useState(30);
  const [bidAmount, setBidAmount] = useState('');
  const [bidDialog, setBidDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [selectedPlayer, setSelectedPlayer] = useState({
    id: 1,
    name: "John Doe",
    basePrice: 20,
    stats: {
      matches: 45,
      runs: 1200,
      wickets: 30,
      average: 35.5,
      strikeRate: 145.8
    },
    status: 'active',
    currentBid: 30,
    highestBidder: 'Team A'
  });

  const [bidHistory, setBidHistory] = useState([
    { team: 'Team A', amount: 30, time: '10:30:15' },
    { team: 'Team B', amount: 25, time: '10:30:00' },
    { team: 'Team C', amount: 20, time: '10:29:45' },
  ]);

  // Add timer state
  const [timeLeft, setTimeLeft] = useState(30);

  // Add timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Add new states
  const [currentPhase, setCurrentPhase] = useState('Bidding');
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [players, setPlayers] = useState(DUMMY_PLAYERS);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // Add phase transition logic
  const moveToNextPhase = () => {
    const currentIndex = AUCTION_PHASES.indexOf(currentPhase);
    if (currentIndex < AUCTION_PHASES.length - 1) {
      setCurrentPhase(AUCTION_PHASES[currentIndex + 1]);
      setPhaseProgress(0);
    }
  };

  // Add phase specific handlers
  const handlePhaseAction = () => {
    switch (currentPhase) {
      case 'Registration':
        // Start player selection when registration is complete
        if (players.length > 0) {
          moveToNextPhase();
        }
        break;

      case 'Player Selection':
        // Move to bidding phase when a player is selected
        if (currentPlayerIndex >= 0) {
          moveToNextPhase();
          setTimeLeft(30); // Start bidding timer
        }
        break;

      case 'Bidding':
        // Move to confirmation when timer ends or final bid is made
        if (timeLeft === 0 || bidHistory.length > 0) {
          moveToNextPhase();
        }
        break;

      case 'Confirmation':
        // Complete the auction for current player
        const updatedPlayers = [...players];
        updatedPlayers[currentPlayerIndex] = {
          ...updatedPlayers[currentPlayerIndex],
          status: 'sold',
          finalBid: currentBid,
          soldTo: bidHistory[0]?.team
        };
        setPlayers(updatedPlayers);
        moveToNextPhase();
        break;

      case 'Complete':
        // Reset for next player
        if (currentPlayerIndex < players.length - 1) {
          setCurrentPlayerIndex(prev => prev + 1);
          setCurrentPhase('Player Selection');
          setCurrentBid(players[currentPlayerIndex + 1].basePrice);
          setBidHistory([]);
        }
        break;
    }
  };

  const handleBid = () => {
    if (userRole !== ROLES.TEAM_MANAGER) {
      setSnackbar({
        open: true,
        message: 'Only Team Managers can place bids',
        severity: 'error'
      });
      return;
    }

    const bidValue = Number(bidAmount);
    if (bidValue <= currentBid) {
      setSnackbar({
        open: true,
        message: 'Bid amount must be higher than current bid',
        severity: 'error'
      });
      return;
    }

    setCurrentBid(bidValue);
    setBidHistory([
      { team: 'Your Team', amount: bidValue, time: new Date().toLocaleTimeString() },
      ...bidHistory
    ]);
    setBidDialog(false);
    setTimeLeft(30); // Reset timer
    setSnackbar({
      open: true,
      message: 'Bid placed successfully!',
      severity: 'success'
    });
  };

  const jerseys = [
    { number: '21', color: '#1e40af', status: 'active' },
    { number: '23', color: '#ffffff', status: 'pending' },
    { number: '17', color: '#3b82f6', status: 'active' },
    { number: '8', color: '#ef4444', status: 'sold' },
    { number: '29', color: '#6b7280', status: 'active' },
    { number: '1', color: '#ef4444', status: 'pending' },
  ];

  const playerStats = [
    { label: 'Goals', value: '5.0.2.90' },
    { label: 'Assists', value: '3.10' },
    { label: 'Rating', value: '$10.9.90' },
  ];

  // Add new handlers
  const handleNextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
      setTimeLeft(30);
      setCurrentBid(players[currentPlayerIndex + 1].basePrice);
    }
  };

  const handleCallPlayer = () => {
    setSnackbar({
      open: true,
      message: 'Player has been notified to join the auction',
      severity: 'success'
    });
  };

  return (
    <Box sx={{ 
      p: 4, 
      background: COLORS.background,
      minHeight: '100vh'
    }}>
      {/* Add Stepper */}
      <Box sx={{ mb: 4 }}>
        <Stepper activeStep={AUCTION_PHASES.indexOf(currentPhase)}>
          {AUCTION_PHASES.map((phase) => (
            <Step key={phase}>
              <StepLabel
                StepIconProps={{
                  sx: {
                    color: PHASE_DETAILS[phase].color,
                  }
                }}
              >
                <Typography sx={{ color: COLORS.text.primary }}>
                  {PHASE_DETAILS[phase].title}
                </Typography>
                <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
                  {PHASE_DETAILS[phase].description}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {/* Phase Progress */}
        <LinearProgress 
          variant="determinate" 
          value={phaseProgress}
          sx={{
            mt: 2,
            height: 6,
            borderRadius: 3,
            bgcolor: alpha(PHASE_DETAILS[currentPhase].color, 0.1),
            '& .MuiLinearProgress-bar': {
              bgcolor: PHASE_DETAILS[currentPhase].color,
            }
          }}
        />
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Section - Player Queue */}
        <Grid item xs={12} md={3}>
          <GlassCard>
            <Typography variant="h6" sx={{ mb: 2 }}>Player Queue</Typography>
            <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
              {players.map((player, index) => (
                <Box
                  key={player.id}
                  sx={{
                    p: 2,
                    mb: 1,
                    borderRadius: 1,
                    bgcolor: currentPlayerIndex === index ? alpha(COLORS.primary, 0.1) : 'transparent',
                    border: `1px solid ${COLORS.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <Avatar src={player.image} />
                  <Box>
                    <Typography variant="subtitle1">{player.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Base Price: ${player.basePrice}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </GlassCard>
        </Grid>

        {/* Center Section - Current Player */}
        <Grid item xs={12} md={6}>
          <GlassCard>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <AuctionTimer timeLeft={timeLeft} maxTime={30} />
              {userRole === ROLES.TEAM_MANAGER && (
                <Button
                  variant="contained"
                  startIcon={<Gavel />}
                  onClick={() => setBidDialog(true)}
                >
                  Place Bid
                </Button>
              )}
            </Box>
            
            <Tabs 
              value={selectedTab} 
              onChange={(e, v) => setSelectedTab(v)} 
              sx={{ 
                mb: 3,
                '& .MuiTab-root': {
                  color: COLORS.text.secondary,
                  '&.Mui-selected': {
                    color: COLORS.primary,
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: COLORS.primary,
                }
              }}
            >
              <Tab label="Info" icon={<InfoIcon />} />
              <Tab label="Statistics" icon={<Assessment />} />
              <Tab label="Achievements" icon={<EmojiEvents />} />
            </Tabs>

            {selectedTab === 0 && (
              <PlayerCard player={players[currentPlayerIndex]} />
            )}
            {selectedTab === 1 && (
              <PlayerStatsChart stats={players[currentPlayerIndex].stats} />
            )}
            {selectedTab === 2 && (
              <Box>
                {players[currentPlayerIndex].achievements.map((achievement, index) => (
                  <Chip
                    key={index}
                    icon={<Star />}
                    label={achievement}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            )}
          </GlassCard>
        </Grid>

        {/* Right Section - Bidding Info */}
        <Grid item xs={12} md={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <GlassCard>
                <Typography variant="h6" gutterBottom>Current Bid</Typography>
                <Typography variant="h2" sx={{ color: COLORS.primary }}>
                  ${currentBid}
                </Typography>
                <Typography color="text.secondary">
                  Highest Bidder: {selectedPlayer.highestBidder}
                </Typography>
                <BiddingTrendsChart bidHistory={bidHistory} />
              </GlassCard>
            </Grid>
            <Grid item xs={12}>
              <BidHistory history={bidHistory} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Manager Controls */}
      {userRole === ROLES.TOURNAMENT_MANAGER && (
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={handleCallPlayer}
          >
            Call Next Player
          </Button>
          <Button
            variant="contained"
            startIcon={<ArrowForward />}
            onClick={handleNextPlayer}
          >
            Next Player
          </Button>
        </Box>
      )}

      {/* Bid Dialog */}
      <Dialog open={bidDialog} onClose={() => setBidDialog(false)}>
        <DialogTitle>Place Your Bid</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Bid Amount"
            type="number"
            fullWidth
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBidDialog(false)}>Cancel</Button>
          <Button onClick={handleBid} variant="contained">
            Confirm Bid
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AuctionDashboard;