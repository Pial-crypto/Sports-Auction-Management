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
  handleSaveNew, 
  handleViewDetails } from '@/function/handleMatchesPage';
import fetchCurrentTournament from '@/function/fetchCurrentTournament';
import fetchAllTeamReq from '@/function/getAllTeamReq';
import { fetchCurrentTournamentHook } from '@/hook/fetchCurrentTournament';
import { fetchTournamentMatchesHook } from '@/hook/fetchTournamentMatches';
import { fetchCurrentTournamentMatchesHook } from '@/hook/fetchCurrentTournamentMatchesHook';
import useFetchLatestApprovedTournamentHook from '@/hook/fetchLatestApprovedTournamentHook';
import storage from '@/class/storage';





// Mock Data
const initialMatches = [
  {
    id: 1,
    team1: {
      name: 'Royal Strikers',
      logo: '/team1-logo.png',
      score: '186/4',
      overs: '20.0',
      runRate: '9.30',
    },
    team2: {
      name: 'Thunder Kings',
      logo: '/team2-logo.png',
      score: '142/8',
      overs: '18.2',
      runRate: '7.75',
    },
    status: 'live',
    date: '2024-01-20',
    time: '14:30',
    venue: 'Central Stadium',
    overs: '20',
      teamName: '', // Changed from name to teamName to match
    type: 'Quarter Final',
    matchDetails: {
      tossWinner: 'Royal Strikers',
      tossDecision: 'Bat',
      umpires: ['John Doe', 'Jane Smith'],
      referee: 'Robert Brown',
      highlights: ['6 sixes in one over', 'Century by Smith'],
    }
  },
  {
    id: 2,
    team1: {
      name: 'Eagle Warriors',
      logo: '/team3-logo.png',
      score: '-',
      overs: '-',
      runRate: '-',
    },
    team2: {
      name: 'Lion Kings',
      logo: '/team4-logo.png',
      score: '-',
      overs: '-',
      runRate: '-',
    },
    status: 'upcoming',
    date: '2024-01-22',
    time: '15:00',
    venue: 'Sports Complex',
    overs: '20',
    type: 'Semi Final',
    matchDetails: {
      tossWinner: '-',
      tossDecision: '-',
      umpires: ['Mike Johnson', 'Steve Williams'],
      referee: 'James Wilson',
    }
  },
  {
    id: 3,
    team1: {
      name: 'Phoenix Riders',
      logo: '/team5-logo.png',
      score: '225/6',
      overs: '20.0',
      runRate: '11.25',
    },
    team2: {
      name: 'Dragon Force',
      logo: '/team6-logo.png',
      score: '198/9',
      overs: '20.0',
      runRate: '9.90',
    },
    status: 'completed',
    date: '2024-01-19',
    time: '14:00',
    venue: 'International Ground',
    overs: '20',
    type: 'Quarter Final',
    matchDetails: {
      tossWinner: 'Phoenix Riders',
      tossDecision: 'Bat',
      umpires: ['David Brown', 'Richard Davis'],
      referee: 'Thomas Anderson',
      result: 'Phoenix Riders won by 27 runs',
    }
  },
];




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





  



  return (
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
          tournament
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

