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
import teamManagerCardInactive from '@/constants/TournamentManagement/TeamManagerCardsInactive';
import Footer from '@/components/Footer/Footer';
import useFetchLatestApprovedTournamentHook from '@/hook/fetchLatestApprovedTournamentHook';
import fetchCurrentTournament from '@/function/fetchCurrentTournament';
import { fetchCurrentTournamentHook } from '@/hook/fetchCurrentTournament';
import { updateTournamentInfo } from '@/function/updateTournamentInfo';

const TournamentManagement = () => {
  const user=storage.get("user")
  const {role}=user
  //const {activeStatus}=user
  const [activeStatus,setActiveStatus]=useState(user.activeStatus);
 
  const [tournament,setTournament]=useState(null)

  if(role==='manager')
fetchCurrentTournamentHook(setTournament)

   if(storage.get("user").role==="player" || storage.get("user").role==="manager"){
  useFetchLatestApprovedTournamentHook(undefined,role,setTournament)
  }


  storage.set('user',{...user,activeStatus:activeStatus})



  if(role==="player"){

useFetchLatestApprovedTournamentHook(setActiveStatus,role)
  }

  if(role==="manager"){
    useFetchLatestApprovedTournamentHook(setActiveStatus,role)
  }
if(tournament && new Date(tournament.tournamentDate)>=new Date() && tournament.status.toLowerCase()!='completed'){
  tournament && updateTournamentInfo({...tournament,status:'live'})
}
//if(tournament){
  useEffect(()=>{
 tournament && setActiveStatus(tournament.status.toLowerCase()==='completed'?false:true)
  },[tournament])
  
//}
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
        return activeStatus ? teamManagerCards : teamManagerCardInactive;
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