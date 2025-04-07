"use client";

import React, { use, useEffect, useState } from 'react';
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
import storage from '@/class/storage';
import playerCardInactive from '@/constants/TournamentManagement/playerCardsInactive';
import scheduleCardsDisabled from '@/constants/TournamentManagement/scheduleCardsDisabled';
import Footer from '@/components/Footer/Footer';
import useFetchLatestApprovedTournamentHook from '@/hook/fetchLatestApprovedTournamentHook';

const TournamentManagement = () => {
  const user=storage.get("user")
  const {role}=user
  //const {activeStatus}=user
  const [activeStatus,setActiveStatus]=useState(user.activeStatus);
 
  if(role==="player"){

useFetchLatestApprovedTournamentHook(setActiveStatus)
  }

  console.log("activeStatus",activeStatus);
  console.log(user,"I am the user","My role is ",role)
  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const getCardItems = (role) => {
    switch (role) {
      case "player":
        return activeStatus ? playerTournamentCards : playerCardInactive;
      case "manager":
        return teamManagerCards;
      default:
        return activeStatus?scheduleCards:scheduleCardsDisabled;
    }
  };
  
  const cardItems = getCardItems(role);
  


  return (
  <>
  <StyledContainer>
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
         <StatsCards activeStatus={activeStatus} cardItems={cardItems}></StatsCards>

            {/* Player Cards */}
           <PlayerCards></PlayerCards>
          </motion.div>
        </Container>
    
    </Box>
    </ContentWrapper>
    </Container>
    </StyledContainer>
    <Footer></Footer>
    </>
  );
};

export default TournamentManagement;