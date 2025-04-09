"use client";

import React, { useState } from 'react';
import { Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import TournamentList from '@/components/JoinTournament/TournamentList';
import TournamentFilters from '@/components/JoinTournament/TournamentFilters';
import PlayerInfoDialog from '@/components/JoinTournament/PlayerInfoDialog';
import { LoadingState, ErrorState } from '@/components/Common/States';
import { mockTournaments } from '@/constants/JoinTournament/mockData';
import { fetchAllTournamentsforjoininghook } from '@/hook/fetchAllTournamentsforjoininghook';
import { handleJoinRequest, handleSubmitRequest,handleSubmitTeamRequest } from '@/function/handleJoinTournament';
import storage from '@/class/storage';
import TeamInfoDialog from '@/components/JoinTournament/TeamInfoDialog';
import { fetchAllTournamentForManagerForJoiningHook } from '@/hook/fetchAllTournamentForManagerForJoiningHook';

const MotionContainer = motion(Container);
const MotionTypography = motion(Typography);

const JoinTournament = () => {
  const [tournaments, setTournaments] = useState(mockTournaments);
  const [filteredTournaments, setFilteredTournaments] = useState(
    mockTournaments.filter(t => t.status === 'active')
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('active');
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const role=storage.get('user').role;
  //console.log(role,"role")
  // Fetch tournaments
  if(role==='player'){
    fetchAllTournamentsforjoininghook(setTournaments, setFilteredTournaments, setIsLoading, filterStatus);
  }
  if(role==='manager'){
    fetchAllTournamentForManagerForJoiningHook(setTournaments, setFilteredTournaments, setIsLoading, filterStatus);
  }

  // Handle filter change
  const handleFilterChange = (status) => {
    setFilterStatus(status);
    const filtered = tournaments.filter(tournament => tournament.status === status);
    setFilteredTournaments(filtered);
  };

  return (
    <MotionContainer 
      maxWidth="lg" 
      sx={{ 
        py: 4,
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        minHeight: '100vh',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MotionTypography 
        variant="h3" 
        sx={{
          mb: 4,
          fontWeight: 800,
          background: 'linear-gradient(45deg, #1e40af, #3b82f6)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Join Tournament
      </MotionTypography>

      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <TournamentFilters 
          currentFilter={filterStatus}
          onFilterChange={handleFilterChange}
        />
      </motion.div>

      {isLoading ? (
        <LoadingState message="Loading tournaments..." />
      ) : error ? (
        <ErrorState message={error} />
      ) : (
        <TournamentList 
          tournaments={filteredTournaments}
          onJoinRequest={(tournamentId) => 
            handleJoinRequest(
              tournamentId,
              tournaments,
              setSelectedTournament,
              setOpenDialog
            )
          }
        />
      )}

     {role==='manager'?
      (<TeamInfoDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedTournament(null);
        }}
        onSubmit={(teamData) => 
          handleSubmitTeamRequest(
            teamData,
            selectedTournament,
            setTournaments,
            setFilteredTournaments,
            setOpenDialog,
            setSelectedTournament,
            setError
          )
        }
        tournament={selectedTournament}
      />):
      (
        <PlayerInfoDialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
            setSelectedTournament(null);
          }}
          onSubmit={(playerData) => 
            handleSubmitRequest(
              playerData,
              selectedTournament,
              setTournaments,
              setFilteredTournaments,
              setOpenDialog,
              setSelectedTournament,
              setError
            )
          }
          tournament={selectedTournament}
        />
      )
      }
    </MotionContainer>
  );
};

export default JoinTournament;
