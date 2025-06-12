"use client";

import React, { useEffect, useState } from 'react';
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
import { fetchCurrentTournamentHook } from '@/hook/fetchCurrentTournament';
import { updateTournamentInfo } from '@/function/updateTournamentInfo';
import { formatDateOnly } from '@/function/formatDateOnly';

const TournamentManagement = () => {
  const user = storage.get("user");
  const { role } = user;

  const [tournament, setTournament] = useState(null);
  const [activeStatus, setActiveStatus] = useState(user.activeStatus);

  // ✅ Use effect to fetch tournament
 // useEffect(() => {

    if(role=='organizer'){
       fetchCurrentTournamentHook(setTournament);
    }
  else  if (role === "manager") {
     
      useFetchLatestApprovedTournamentHook(undefined, role, setTournament);
    }

  else  if (role === "player") {
      useFetchLatestApprovedTournamentHook(undefined, role, setTournament);
    }

 // }, [role]);

  // ✅ Update activeStatus from role
 // useEffect(() => {
  //  if (role === "player" || role === "manager") {
     // useFetchLatestApprovedTournamentHook(setActiveStatus, role);
   // }
  //}, [role]);

  tournament && console.log("tournamet",tournament)

  // ✅ Tournament status logic
  useEffect(() => {
    if (!tournament) return;

    //console.log("Balllllldsfasdfasdfsadfdsfa");
    
    const tournamentDate =    new Date(tournament.tournamentDate)
    const now = new Date();
    const isTournamentStarted = !isNaN(tournamentDate) && tournamentDate <= now;

    console.log("IS started", isTournamentStarted);

    if (!isTournamentStarted && tournament.status.toLowerCase() !== 'completed' && tournament.status.toLowerCase() !== 'upcoming') {
      updateTournamentInfo({ ...tournament, status: 'UPCOMING' });
    }

    if (isTournamentStarted && tournament.status.toLowerCase() !== 'completed' && tournament.status.toLowerCase()!='live') {
      console.log("Bal falai");
      updateTournamentInfo({ ...tournament, status: 'LIVE' });
    }

    setActiveStatus(tournament.status.toLowerCase() !== 'completed');

  }, [tournament]);

  // ✅ Update local storage when activeStatus changes
  useEffect(() => {
    storage.set('user', { ...user, activeStatus });
  }, [activeStatus]);

  // UI part
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
        return activeStatus ? scheduleCards : scheduleCardsDisabled;
    }
  };

  const cardItems = getCardItems(role);

  return (
    <>
      <StyledContainer>
        <NavBar activePage={"Tournaments"} />
        <Container>
          <ContentWrapper>
            <Box sx={{ position: 'relative' }}>
              <Container maxWidth="xl">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <HeaderCard />
                  <StatsCards activeStatus={activeStatus} cardItems={cardItems} />
                  <PlayerCards />
                </motion.div>
              </Container>
            </Box>
          </ContentWrapper>
        </Container>
      </StyledContainer>
      <Footer />
    </>
  );
};

export default TournamentManagement;
