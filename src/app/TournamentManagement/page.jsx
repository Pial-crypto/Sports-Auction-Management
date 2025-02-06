"use client";

import React from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Avatar,
  IconButton,
  Container,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import RuleIcon from '@mui/icons-material/Rule';
import TimelineIcon from '@mui/icons-material/Timeline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import NavBar from '@/components/NavBar/NavBar';

// Styled Components
const PageWrapper = styled(Box)({
  paddingTop: '80px', // Space for NavBar
  minWidth: '100%',
  background: '#f8fafc',
  minHeight: '100vh',
  position: 'relative',
  zIndex: 1
});

const MainCard = styled(motion(Card))(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  color: 'white',
  boxShadow: '0 10px 30px rgba(30, 58, 138, 0.1)',
  marginTop: theme.spacing(2),
}));

const StatsCard = styled(motion(Card))(({ theme }) => ({
  background: '#ffffff',
  borderRadius: '16px',
  padding: theme.spacing(3),
  textAlign: 'center',
  position: 'relative',
  overflow: 'visible',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
  },
}));

const PlayerCard = styled(motion(Card))(({ theme }) => ({
  padding: theme.spacing(2.5),
  textAlign: 'center',
  background: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  '& .MuiAvatar-root': {
    width: 70,
    height: 70,
    margin: '0 auto',
    background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
  },
}));

const GradientButton = styled(Button)(({ theme, color = '#2563eb' }) => ({
  background: `linear-gradient(45deg, ${color}, ${color}CC)`,
  borderRadius: '12px',
  color: 'white',
  padding: '8px 24px',
  transition: 'all 0.3s ease',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px ${color}40`,
  },
}));

const scheduleCards = [
  { 
    title: 'Create Team',
    value: '2.0',
    subtitle: 'Player Management',
    icon: <GroupsIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb'
  },
  { 
    title: 'Rules',
    value: '2.0',
    subtitle: 'Tournament Rules',
    icon: <RuleIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb'
  },
  { 
    title: 'Budget',
    value: '2:10',
    subtitle: 'Team Budget',
    icon: <MonetizationOnIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb'
  },
  { 
    title: 'Statistics',
    value: '15.10',
    subtitle: 'Team Stats',
    icon: <TimelineIcon sx={{ fontSize: 32, color: '#dc2626' }} />,
    color: '#dc2626'
  },
  { 
    title: 'Matches',
    value: '9:30',
    subtitle: 'Tournament Matches',
    icon: <EmojiEventsIcon sx={{ fontSize: 32, color: '#2563eb' }} />,
    color: '#2563eb'
  },
];

const TournamentManagement = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <NavBar />
      <PageWrapper>
        <Container maxWidth="xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header Card */}
            <MainCard 
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={2}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Box sx={{ bgcolor: '#3b82f6', borderRadius: '50%', p: 1 }}>
                      <SportsSoccerIcon sx={{ fontSize: 32, color: 'white' }} />
                    </Box>
                  </motion.div>
                  <Typography variant="h4" fontWeight="bold">
                    TOURNAMENT MANAGEMENT
                  </Typography>
                </Box>
                <Box>
                  <Tooltip title="Settings">
                    <IconButton 
                      sx={{ color: 'white' }}
                      component={motion.button}
                      whileHover={{ scale: 1.1 }}
                    >
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Close">
                    <IconButton 
                      sx={{ color: '#f87171' }}
                      component={motion.button}
                      whileHover={{ scale: 1.1 }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </MainCard>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mt: 3, mb: 5 }}>
              {scheduleCards.map((card, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <StatsCard
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      {card.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold" color="#1e293b">
                      {card.title}
                    </Typography>
                    <Typography variant="h3" sx={{ color: card.color, my: 2 }}>
                      {card.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {card.subtitle}
                    </Typography>
                    <GradientButton
                      fullWidth
                      color={card.color}
                      component={motion.button}
                      whileTap={{ scale: 0.98 }}
                    >
                      {index === 4 ? 'SETTLE' : 'MANAGE'}
                    </GradientButton>
                  </StatsCard>
                </Grid>
              ))}
            </Grid>

            {/* Player Cards */}
            <Grid container spacing={3}>
              {[...Array(6)].map((_, index) => (
                <Grid item xs={6} sm={4} md={2} key={index}>
                  <PlayerCard
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 12px 30px rgba(0,0,0,0.1)'
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Avatar>
                        <AccountCircleIcon />
                      </Avatar>
                    </motion.div>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 600,
                        color: '#1e293b',
                        my: 2
                      }}
                    >
                      Player {index + 1}
                    </Typography>
                    <GradientButton
                      size="small"
                      fullWidth
                      color={index > 2 ? '#dc2626' : '#2563eb'}
                      component={motion.button}
                      whileTap={{ scale: 0.98 }}
                    >
                      {`${(index + 1) * 1000}`}
                    </GradientButton>
                  </PlayerCard>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </PageWrapper>
    </Box>
  );
};

export default TournamentManagement;