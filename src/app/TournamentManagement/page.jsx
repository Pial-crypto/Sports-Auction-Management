"use client";

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Container,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavBar from '@/components/NavBar/NavBar';
import { PageWrapper, MainCard, PlayerCard, GradientButton } from '../../style/TournamentManagementStyle';
import PlayerCards from '@/components/TournamentManagement/PlayerCards';
import { StatsCards } from '@/components/TournamentManagement/StatsCards';
import { HeaderCard } from '@/components/TournamentManagement/HeaderCard';
import { ContentWrapper, StyledContainer } from '@/style/HomePage';


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


  return (<StyledContainer>
    <NavBar activePage={"Tournaments"}></NavBar>
    <Container>
      <ContentWrapper>
    <Box sx={{ position: 'relative' }}>
     
      
        <Container maxWidth="xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header Card */}
          <HeaderCard></HeaderCard>

            {/* Stats Cards */}
         <StatsCards></StatsCards>

            {/* Player Cards */}
           <PlayerCards></PlayerCards>
          </motion.div>
        </Container>
    
    </Box>
    </ContentWrapper>
    </Container>
    </StyledContainer>
  );
};

export default TournamentManagement;