"use client";

import React from 'react';
import {
  Box,
  Container,
} from '@mui/material';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar/NavBar';
import PlayerCards from '@/components/TournamentManagement/PlayerCards';
import { StatsCards } from '@/components/TournamentManagement/StatsCards';
import { HeaderCard } from '@/components/TournamentManagement/HeaderCard';
import { ContentWrapper, StyledContainer } from '@/style/HomePage';
import teamManagerCards from '@/constants/TournamentManagement/TeamManagerCards';
import scheduleCards from '@/constants/TournamentManagement/scheduleCards';
import playerTournamentCards from '@/constants/TournamentManagement/PlayerCards';


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
         <StatsCards cardItems={playerTournamentCards}></StatsCards>

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