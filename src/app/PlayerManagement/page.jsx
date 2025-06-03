"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Fade,
} from '@mui/material';
import { Header } from '@/components/PlayerManagement/Header';
import { setAllPlayersNameFromIdHook } from '@/hook/setAllPlayersNameFromIdHook';
import { fetchPlayerFilteringUserForTeam } from '@/hook/fetchTeamPlayerHook';
import { fetchPlayerForSpecificTeamHook } from '@/hook/fetchSpecificTeamPlayersHook';
import useFetchLatestApprovedTournamentHook from '@/hook/fetchLatestApprovedTournamentHook';
import { fetchCurrentTeamForManagerHook } from '@/hook/fetchCurrentTeamForManagerHook';
import storage from '@/class/storage';
import { fetchPlayerPerformancesHook } from '@/hook/fetchPlayerPerformancesHook';
import { getFinalPlayerObjArray, myTeamPlayerPerformances } from '@/function/handlePlayerManagement';
import { PlayersGrid } from '@/components/PlayerManagement/PlayersGrid';
import { MainContainer } from '@/style/PlayerManagement';
import { LoadingState } from '@/components/PlayerManagement/LoadingState';


// Expanded Mock Data

const PlayerManagement = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
   const [auctionTeam,setAuctionTeam]=useState([])
       const [myTeam,setMyTeam]=useState(null)
  const [tournament,setTournament]=useState(null);

const [playerPerformances,setPlayerPerformances]=useState([]);

     useFetchLatestApprovedTournamentHook(undefined,storage.get("user").role,setTournament)
  fetchCurrentTeamForManagerHook(tournament,setMyTeam)
     setAllPlayersNameFromIdHook(playerPerformances,setPlayerPerformances)
 
  fetchPlayerFilteringUserForTeam(auctionTeam,setPlayers)
  
  fetchPlayerForSpecificTeamHook(myTeam?.teamName, myTeam?.id, tournament, setAuctionTeam);

 
 // const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

 fetchPlayerPerformancesHook(setPlayerPerformances,tournament)


// console.log("player perf",playerPerformances)
// console.log("our players",players)

const myPlayersPerformances = myTeamPlayerPerformances(playerPerformances, players);
//console.log("my team player perf", myPlayersPerformances);


const finalPlayers=getFinalPlayerObjArray(myPlayersPerformances,players)

//console.log("The final Players",finalPlayers)







  

  return (
    tournament &&
    <MainContainer>
      <Fade in={!loading} timeout={1000}>
        <Box>
          {/* Header */}
        
<Header></Header>
       

          {/* Modified Players Grid */}
       <PlayersGrid finalPlayers={finalPlayers} tournament={tournament}></PlayersGrid>

     

      

       

          {/* Loading State */}
          {loading && (
       <LoadingState></LoadingState>
          )}
        </Box>
      </Fade>
    </MainContainer>
  );
};

export default PlayerManagement;