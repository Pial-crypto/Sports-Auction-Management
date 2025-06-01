"use client";

import React, { useEffect, useState } from 'react';
import {
  Box,
} from '@mui/material';
import { Header } from '@/components/Matches/header';
import { MatchTab } from '@/components/Matches/Tabs';
import { MatchCard } from '@/components/Matches/matchesCard';
import { DetaisDialog } from '@/components/Matches/viewDetailsDialog';
import { EditDialog } from '@/components/Matches/EditDialog';
import { DeleteDialog } from '@/components/Matches/DeleteDialog';
import { MatchStatistics } from '@/components/Matches/MatchStatistics';
import { CreateNewMatchDialog } from '@/components/Matches/CreateNewMatchDialog';
import { MainContainer } from '@/style/Matches';
import { handleConfirmDelete, 
  handleCreateMatch, 
  handleDeleteMatch, 
  handleEditMatch, 
  handleMatchDetails, 
  handleSaveEdit, 
  handleViewDetails } from '@/function/handleMatchesPage';
import fetchAllTeamReq from '@/function/getAllTeamReq';
import { fetchCurrentTournamentHook } from '@/hook/fetchCurrentTournament';
import { fetchCurrentTournamentMatchesHook } from '@/hook/fetchCurrentTournamentMatchesHook';
import useFetchLatestApprovedTournamentHook from '@/hook/fetchLatestApprovedTournamentHook';
import storage from '@/class/storage';
import { getAllPlayerPerformance } from '@/function/fetchAllPlayerPerformance';
import { fetchPlayerPerformancesHook } from '@/hook/fetchPlayerPerformancesHook';










const MatchesPage = () => {
  // States
  const [matches, setMatches] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [editMatch, setEditMatch] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
const [tournament,setTournament] = useState(null);
const [tournamentTeams,setTournamentTeams] = useState(null);
const [playerPerformances,setPlayerPerformances]=useState([])
  // New Match Template
  const newMatchTemplate = {
    team1: {
      name: '',
      logo: '',
      score: '-',
      overs: '-',
      runRate: '-',
    },
    team2: {
      name: '',
      logo: '',
      score: '-',
      overs: '-',
      runRate: '-',
    },
    status: 'upcoming',
    date: '',
    time: '',
    venue: '',
    overs: '20',
    type: '',
    matchDetails: {
      tossWinner: '-',
      tossDecision: '-',
      umpires: ['', ''],
      referee: '',
    }
  };

  // Handlers
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  
  if(storage.get("user").role==="organizer"){
 fetchCurrentTournamentHook(setTournament)
  }

  if(storage.get("user").role==="player" || storage.get("user").role==="manager"){
  useFetchLatestApprovedTournamentHook(undefined,storage.get("user").role,setTournament)
  }
 // fetchCurrentTournamentHook(setTournament,undefined);

 fetchCurrentTournamentMatchesHook(tournament,setMatches,undefined);
   
  useEffect(() => {

      fetchAllTeamReq().then(teamData => 
        {
          console.log(teamData, "teamData from ");
      if(tournament){
      const thisTournamentTeam= teamData.allTeamReq.filter(team => team.tournamentId === tournament.id && team.approved  );
      console.log(thisTournamentTeam, "thisTournamentTeam");
      setTournamentTeams(thisTournamentTeam);
      }
    });
},[tournament]);


fetchPlayerPerformancesHook(setPlayerPerformances,tournament)

//console.log('Player performances',playerPerformances)



  



  return (

    tournament &&
    <MainContainer>
      <Box sx={{ mb: 4 }}>
      <Header handleCreateMatch={()=>handleCreateMatch(setEditMatch,setCreateDialogOpen,newMatchTemplate)}></Header>

        <MatchStatistics matches={matches} tournament={tournament}/>

<MatchTab handleTabChange={handleTabChange} tabValue={tabValue}></MatchTab>
      </Box>

<MatchCard tabValue={tabValue}
 matches={matches} 
 handleMatchDetails={handleMatchDetails} 
 handleViewDetails={(match)=>handleViewDetails(match,setSelectedMatch,setViewDialogOpen)}
handleDeleteMatch={(match)=>handleDeleteMatch(match,setSelectedMatch,setDeleteDialogOpen)}
playerPerformances={playerPerformances}
tournament={tournament}
handleEditMatch={(match)=>handleEditMatch(
  match,setEditMatch,setEditDialogOpen
)}
></MatchCard>
     

      {/* Dialogs will continue in the next part... */}

            {/* View Details Dialog */}
     <DetaisDialog setViewDialogOpen={setViewDialogOpen} 
     viewDialogOpen={viewDialogOpen} 
     handleMatchDetails={(match)=>handleMatchDetails(
      match,setSelectedMatch,setDetailsDialogOpen
     )}
    tournament={tournament}
     selectedMatch={selectedMatch}>
      
     </DetaisDialog>

      {/* Edit Match Dialog */}
      <EditDialog
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        setEditMatch={setEditMatch}
        editMatch={editMatch}
        tournament={tournament}
        handleSaveEdit={()=>handleSaveEdit(
          editMatch,matches,setMatches,setEditDialogOpen,
          tournament,
          
        )}
      ></EditDialog>
   {/* Delete match dialog */}
<DeleteDialog
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleConfirmDelete={()=>handleConfirmDelete(
          selectedMatch,matches,setMatches,setDeleteDialogOpen
        )}
></DeleteDialog>
  

     

      {/* Create New Match Dialog */}
  <CreateNewMatchDialog
        createDialogOpen={createDialogOpen}
        setCreateDialogOpen={setCreateDialogOpen}
        tournamentTeams={tournamentTeams}
        matches={matches}
        setMatches={setMatches}
       
  ></CreateNewMatchDialog>
    </MainContainer>
  );
};

export default MatchesPage;

