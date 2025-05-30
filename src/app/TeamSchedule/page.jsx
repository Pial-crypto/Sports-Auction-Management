"use client";

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import { EditDialog } from '@/components/TeamSchedule/EditDialogue';
import { MatchCard } from '@/components/TeamSchedule/MatchCard';
import { Header } from '@/components/TeamSchedule/Header';
import { AddSessionButton } from '@/components/TeamSchedule/AddSessionButton';
import { TabSchedule } from '@/components/TeamSchedule/Tab';
import storage from '@/class/storage';
import useFetchLatestApprovedTournamentHook from '@/hook/fetchLatestApprovedTournamentHook';
import { getFilteredEvents, handleDeleteSession, handleSavePractice ,handleConfirmDelete} from '@/function/handleTeamSchedule';
import { navigationConfig } from '@/constants/TeamSchedule/NavigationConfig';
import { fetchCurrentTournamentMatchesHook } from '@/hook/fetchCurrentTournamentMatchesHook';
import { MainContainer } from '@/style/TeamSchedule';
import { fetchCurrentTeamForManagerHook } from '@/hook/fetchCurrentTeamForManagerHook';
import { SessionCard } from '@/components/TeamSchedule/SessionCard';
import { fetchPracticeSessionsForTeamTheTournamentAndTeamHook } from '@/hook/fetchPracticeSessionForTheTournamentAndTeamHook';
import { DeleteConfirmDialog } from '@/components/TeamSchedule/DeleteConfirmDialog';


const TeamSchedule = () => {

  const [selectedSection, setSelectedSection] = useState('live'); // Add this state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [tournament,setTournament]=useState(null)
  const [myTeam,setMyTeam]=useState(null)


  const [matches,setMatches]=useState([])

  const [practiceSessions, setPracticeSessions] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });



   if(storage.get("user").role==="player" || storage.get("user").role==="manager"){
  useFetchLatestApprovedTournamentHook(undefined,storage.get("user").role,setTournament)
  }

  fetchCurrentTournamentMatchesHook(tournament,setMatches)

   fetchCurrentTeamForManagerHook(tournament,setMyTeam)

   fetchPracticeSessionsForTeamTheTournamentAndTeamHook(tournament, myTeam, setPracticeSessions);


  
  







  return (

    matches.length>0 && tournament && myTeam &&
    <MainContainer>
      <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
       <Header></Header>
        
      <TabSchedule setSelectedSection={setSelectedSection}
      selectedSection={selectedSection}
      navigationConfig={navigationConfig}
      ></TabSchedule>

        <Grid container spacing={3}>
          {selectedSection === 'practice' 
            ? practiceSessions.map((session) => (
                <Grid item xs={12} md={6} key={session.id}>
                  <SessionCard 
                    session={session}
                    onEdit={() => {
                      setSelectedPractice(session);
                      setEditDialogOpen(true);
                    }}
                    onDelete={() => handleDeleteSession(session, setSessionToDelete, setDeleteDialogOpen)}
                  />
                </Grid>
              ))
            : getFilteredEvents(selectedSection,matches,myTeam).map((event) => (
                <Grid item xs={12} md={6} key={event.id}>
                  <MatchCard match={event} />
                </Grid>
              ))
          }
        </Grid>

        {selectedSection === 'practice' && (
          <AddSessionButton 
            setEditDialogOpen={setEditDialogOpen} 
            setSelectedPractice={setSelectedPractice}
          />
        )}

        <EditDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          practice={selectedPractice}
          onSave={(editedPractice) => {
            handleSavePractice(
              editedPractice,
              setPracticeSessions, 
              selectedPractice,
              setEditDialogOpen,
              setSelectedPractice,
              tournament,
              myTeam,
              setSnackbar
            );
          }}
        />

        <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => handleConfirmDelete(setPracticeSessions,setDeleteDialogOpen,setSnackbar
          ,sessionToDelete
        )}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      </Box>
    </MainContainer>
  );
};

export default TeamSchedule;