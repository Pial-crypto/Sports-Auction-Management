"use client"

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Avatar,
  Button,
  IconButton,
  Grid,
  LinearProgress,
  Tooltip,
  Badge,
  Chip,
  Container,
  Tab,
  Tabs,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TimerIcon from '@mui/icons-material/Timer';
import { motion, AnimatePresence } from 'framer-motion';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Lightbulb as LightbulbIcon, Help, ArrowForward } from '@mui/icons-material';

// Styled components
const DarkCard = styled(Card)(({ theme }) => ({
  background: '#1a1f2e',
  color: 'white',
  borderRadius: 24,
  padding: theme.spacing(3),
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
  },
}));

const PlayerCard = styled(motion.div)(({ theme }) => ({
  background: '#242938',
  borderRadius: 16,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  '&:hover': {
    background: '#2a3142',
  },
}));

const SoccerField = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a472a 0%, #2a5338 100%)',
  borderRadius: 16,
  height: 500,
  position: 'relative',
  margin: theme.spacing(2, 0),
  border: '2px solid rgba(255,255,255,0.1)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const GoalNet = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '10px',
  height: '100%',
  background: 'repeating-linear-gradient(white, white 2px, transparent 2px, transparent 4px)',
  top: 0,
  left: 0,
  '&:last-child': {
    left: 'auto',
    right: 0,
  },
}));

const CenterCircle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '20%',
  height: '20%',
  borderRadius: '50%',
  border: '2px solid rgba(255,255,255,0.5)',
  top: '40%',
  left: '40%',
}));

const GoalPost = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '10%',
  height: '5%',
  border: '2px solid rgba(255,255,255,0.5)',
  top: '0',
  left: '45%',
  '&:last-child': {
    top: 'auto',
    bottom: 0,
  },
}));

const PlayerPosition = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#2a3142',
  borderRadius: 8,
  padding: theme.spacing(1),
  color: 'white',
  position: 'absolute',
}));

const StatCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a1f2e 0%, #2a3142 100%)',
  color: 'white',
  borderRadius: 16,
  padding: theme.spacing(2),
  height: '100%',
}));

const PlayerList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  background: '#242938',
  borderRadius: 16,
}));

const PlayerItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(1),
  background: '#2a3142',
  borderRadius: 8,
  cursor: 'pointer',
  '&:hover': {
    background: '#3a4152',
  },
}));

const ItemTypes = {
  PLAYER: 'player',
};

const DraggablePlayer = ({ player, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PLAYER,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Box
      ref={drag}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <Avatar
        src={player.image}
        sx={{
          width: 40,
          height: 40,
          position: 'absolute',
        }}
      />
    </Box>
  );
};

const DroppableField = ({ formations, setFormations }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const index = item.index;
      const newFormations = [...formations];
      newFormations[index] = {
        ...newFormations[index],
        x: newFormations[index].x + delta.x,
        y: newFormations[index].y + delta.y,
      };
      setFormations(newFormations);
    },
  }));

  return (
    <Box ref={drop} sx={{ height: '100%' }}>
      {formations.map((player, index) => (
        <DraggablePlayer key={player.id} player={player} index={index} />
      ))}
    </Box>
  );
};

const TeamFormation = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [auctionTime, setAuctionTime] = useState(300);
  const [isAuctionActive, setIsAuctionActive] = useState(false);
  const [currentBid, setCurrentBid] = useState(0);
  const [formations, setFormations] = useState([
    { id: 1, name: 'Player 1', image: 'https://via.placeholder.com/40', x: 50, y: 50 },
    { id: 2, name: 'Player 2', image: 'https://via.placeholder.com/40', x: 150, y: 150 },
    // Add more players...
  ]);
  const [notifications, setNotifications] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [marketValue, setMarketValue] = useState([]);
  const [teamComparison, setTeamComparison] = useState([]);
  const [playerDistribution, setPlayerDistribution] = useState([]);
  const [players, setPlayers] = useState([
    { id: 1, name: 'Donnarumma', image: 'https://via.placeholder.com/40', position: { top: '45%', left: '5%' } },
    { id: 2, name: 'Dumfries', image: 'https://via.placeholder.com/40', position: { top: '30%', left: '20%' } },
    { id: 3, name: 'Emre Can', image: 'https://via.placeholder.com/40', position: { top: '60%', left: '20%' } },
    { id: 4, name: 'Asencio', image: 'https://via.placeholder.com/40', position: { top: '45%', left: '40%' } },
    { id: 5, name: 'Nuno Mendes', image: 'https://via.placeholder.com/40', position: { top: '20%', left: '50%' } },
    { id: 6, name: 'De Paul', image: 'https://via.placeholder.com/40', position: { top: '70%', left: '50%' } },
    { id: 7, name: 'Asensio', image: 'https://via.placeholder.com/40', position: { top: '45%', left: '60%' } },
    { id: 8, name: 'Pedri', image: 'https://via.placeholder.com/40', position: { top: '30%', left: '80%' } },
    { id: 9, name: 'Sterling', image: 'https://via.placeholder.com/40', position: { top: '60%', left: '80%' } },
    { id: 10, name: 'Kane', image: 'https://via.placeholder.com/40', position: { top: '45%', left: '95%' } },
    { id: 11, name: 'Beier', image: 'https://via.placeholder.com/40', position: { top: '45%', left: '85%' } },
  ]);

  // Mock data generation
  useEffect(() => {
    generateMockData();
  }, []);

  const generateMockData = () => {
    // Performance data
    const performance = Array.from({ length: 12 }, (_, i) => ({
      month: `Month ${i + 1}`,
      wins: Math.floor(Math.random() * 5),
      losses: Math.floor(Math.random() * 3),
      draws: Math.floor(Math.random() * 2),
    }));

    // Market value
    const market = Array.from({ length: 24 }, (_, i) => ({
      day: i + 1,
      value: 50 + Math.random() * 30,
      prediction: 55 + Math.random() * 25,
    }));

    // Team comparison
    const comparison = [
      { attribute: 'Attack', A: 120, B: 110 },
      { attribute: 'Defense', A: 98, B: 130 },
      { attribute: 'Speed', A: 86, B: 130 },
      { attribute: 'Technique', A: 99, B: 100 },
      { attribute: 'Teamwork', A: 85, B: 90 },
    ];

    // Player distribution
    const distribution = [
      { name: 'Forwards', value: 25 },
      { name: 'Midfielders', value: 35 },
      { name: 'Defenders', value: 30 },
      { name: 'Goalkeepers', value: 10 },
    ];

    setPerformanceData(performance);
    setMarketValue(market);
    setTeamComparison(comparison);
    setPlayerDistribution(distribution);
  };

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
    addNotification(`Selected ${player.name}`);
  };

  const handleBid = (playerId, amount) => {
    setCurrentBid(amount);
    addNotification(`New bid: $${amount}M for Player #${playerId}`);
  };

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 5));
  };

  const handleHelpClick = () => {
    alert('This section provides detailed statistics about the team formation.');
  };

  const handleNextClick = () => {
    alert('Navigating to the next team formation...');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth={false} sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', py: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <IconButton sx={{ bgcolor: '#06b6d4' }}>
                <SportsSoccerIcon sx={{ color: 'white' }} />
              </IconButton>
            </motion.div>
            <Typography variant="h5">Team Formation & Auction Dashboard</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton sx={{ color: '#06b6d4' }} onClick={handleHelpClick}><Help /></IconButton>
            <IconButton sx={{ color: '#06b6d4' }} onClick={handleNextClick}><ArrowForward /></IconButton>
            {isAuctionActive && (
              <Chip
                icon={<TimerIcon />}
                label={`${Math.floor(auctionTime / 60)}:${(auctionTime % 60)
                  .toString()
                  .padStart(2, '0')}`}
                color="primary"
              />
            )}
            <Badge badgeContent={notifications.length} color="error">
              <IconButton>
                <NotificationsIcon />
              </IconButton>
            </Badge>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label="Team Formation" />
          <Tab label="Auction" />
          <Tab label="Analytics" />
        </Tabs>

        {/* Content */}
        <Box sx={{ mt: 3 }}>
          {selectedTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DarkCard>
                  <Typography variant="h6" gutterBottom>
                    Last Match Playing XI
                  </Typography>
                  <SoccerField>
                    <GoalNet />
                    <CenterCircle />
                    {players.map((player) => (
                      <PlayerPosition key={player.id} sx={{ top: player.position.top, left: player.position.left }}>
                        <Avatar src={player.image} />
                        <Typography variant="body2">{player.name}</Typography>
                      </PlayerPosition>
                    ))}
                    <GoalNet />
                  </SoccerField>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="contained"
                      startIcon={<LightbulbIcon />}
                      sx={{
                        mt: 2,
                        bgcolor: '#ff9800',
                        color: 'white',
                        '&:hover': {
                          bgcolor: '#e68900',
                        },
                      }}
                    >
                      AI Recommendation
                    </Button>
                  </motion.div>
                </DarkCard>
              </Grid>
            </Grid>
          )}

          {selectedTab === 1 && (
            <Grid container spacing={3}>
              {/* Auction content */}
              <Grid item xs={12}>
                <DarkCard>
                  <Typography variant="h6" gutterBottom>
                    Active Auctions
                  </Typography>
                  <Grid container spacing={2}>
                    {players.map((player) => (
                      <Grid item xs={12} sm={6} md={3} key={player.id}>
                        <PlayerCard
                          onClick={() => handlePlayerSelect(player)}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Avatar sx={{ width: 80, height: 80 }} />
                          <Typography variant="h6">{player.name}</Typography>
                          <Typography color="primary" variant="h5">
                            ${player.price}M
                          </Typography>
                          <Button
                            variant="contained"
                            fullWidth
                            onClick={() => handleBid(player.id, parseFloat(player.price) + 0.5)}
                            sx={{ mt: 2 }}
                          >
                            Place Bid
                          </Button>
                        </PlayerCard>
                      </Grid>
                    ))}
                  </Grid>
                </DarkCard>
              </Grid>

              <Grid item xs={12}>
                <DarkCard>
                  <Typography variant="h6" gutterBottom>
                    Past Auctions
                  </Typography>
                  <Box>
                    <Typography>Player A - $30M</Typography>
                    <Typography>Player B - $25M</Typography>
                    <Typography>Player C - $20M</Typography>
                  </Box>
                </DarkCard>
              </Grid>
            </Grid>
          )}

          {selectedTab === 2 && (
            <Grid container spacing={3}>
              {/* Analytics content */}
              <Grid item xs={12} md={6}>
                <StatCard>
                  <Typography variant="h6" gutterBottom>
                    Performance Trend
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Area
                        type="monotone"
                        dataKey="wins"
                        stackId="1"
                        stroke="#06b6d4"
                        fill="#06b6d4"
                      />
                      <Area
                        type="monotone"
                        dataKey="draws"
                        stackId="1"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                      />
                      <Area
                        type="monotone"
                        dataKey="losses"
                        stackId="1"
                        stroke="#ef4444"
                        fill="#ef4444"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </StatCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <StatCard>
                  <Typography variant="h6" gutterBottom>
                    Market Value Prediction
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={marketValue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <RechartsTooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#06b6d4"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="prediction"
                        stroke="#8b5cf6"
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </StatCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <StatCard>
                  <Typography variant="h6" gutterBottom>
                    Team Comparison
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={teamComparison}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="attribute" />
                      <Radar
                        name="Team A"
                        dataKey="A"
                        stroke="#06b6d4"
                        fill="#06b6d4"
                        fillOpacity={0.6}
                      />
                      <Radar
                        name="Team B"
                        dataKey="B"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.6}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </StatCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <StatCard>
                  <Typography variant="h6" gutterBottom>
                    Squad Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={playerDistribution}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {playerDistribution.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={[
                              '#06b6d4',
                              '#8b5cf6',
                              '#4CAF50',
                              '#FFC107',
                            ][index % 4]}
                          />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </StatCard>
              </Grid>
            </Grid>
          )}
        </Box>

        {/* Notifications */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            maxWidth: 300,
            zIndex: 1000,
          }}
        >
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <Card sx={{ mb: 1, p: 2, bgcolor: '#1a1f2e', color: 'white' }}>
                  <Typography variant="body2">{notification.message}</Typography>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>
      </Container>
    </DndProvider>
  );
};

export default TeamFormation;