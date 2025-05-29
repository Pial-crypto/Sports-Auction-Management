"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Fab
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  CalendarToday,
  AccessTime,
  LocationOn,
  SportsCricket,
  Edit,
  Event,
  CheckCircle,
  Cancel,
  FitnessCenter,
  Add,
  Delete
} from '@mui/icons-material';
import { EditDialog } from '@/components/TeamSchedule/EditDialogue';
import { MatchCard } from '@/components/TeamSchedule/MatchCard';
import { GlassCard } from '@/style/TeamSchedule';
import { Header } from '@/components/TeamSchedule/Header';
import { AddSessionButton } from '@/components/TeamSchedule/AddSessionButton';
import { TabSchedule } from '@/components/TeamSchedule/Tab';
import storage from '@/class/storage';
import useFetchLatestApprovedTournamentHook from '@/hook/fetchLatestApprovedTournamentHook';
import { getFilteredEvents, handleEditPractice, handleSavePractice } from '@/function/handleTeamSchedule';
import { navigationConfig } from '@/constants/TeamSchedule/NavigationConfig';
import { fetchCurrentTournamentMatchesHook } from '@/hook/fetchCurrentTournamentMatchesHook';
import { MainContainer } from '@/style/TeamSchedule';
import { useEffect } from 'react';
import fetchAllTeamReq from '@/function/getAllTeamReq';
import { fetchCurrentTeamForManagerHook } from '@/hook/fetchCurrentTeamForManagerHook';
import { SessionCard } from '@/components/TeamSchedule/SessionCard';

const mockPracticeSessions = [
  {
    id: 1,
    type: 'practice',
    title: 'Batting Practice',
    date: '2025-05-28',
    time: '09:00 AM',
    venue: 'Main Ground',
    status: 'upcoming',
    duration: '2 hours',
    focus: 'Power Hitting',
    coach: 'John Smith'
  },
  {
    id: 2,
    type: 'practice',
    title: 'Bowling Practice',
    date: '2025-05-29',
    time: '02:00 PM',
    venue: 'Net Practice Area',
    status: 'upcoming',
    duration: '3 hours',
    focus: 'Yorkers & Variations',
    coach: 'Michael Johnson'
  }
];

const TeamSchedule = () => {

  const user=storage.get("user");
  const [selectedSection, setSelectedSection] = useState('live'); // Add this state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [tournament,setTournament]=useState(null)
  const [myTeam,setMyTeam]=useState(null)


  const [matches,setMatches]=useState([])

  const [practiceSessions, setPracticeSessions] = useState(mockPracticeSessions);




   if(storage.get("user").role==="player" || storage.get("user").role==="manager"){
  useFetchLatestApprovedTournamentHook(undefined,storage.get("user").role,setTournament)
  }

  fetchCurrentTournamentMatchesHook(tournament,setMatches)

   fetchCurrentTeamForManagerHook(tournament,setMyTeam)


  // Add new state for scheduleData
  const [scheduleData, setSchedulData] = useState({
    upcoming: [
      {
        id: 1,
        type: 'match',
        title: 'Quarter Final',
        opponent: 'Thunder Kings',
        date: '2024-01-25',
        time: '14:30',
        venue: 'Central Stadium',
        status: 'upcoming',
        opponentLogo: '/team2-logo.png',
        ticketStatus: 'Available',
        broadcast: 'Sports Live HD',
        matchDetails: {
          format: 'T20',
          umpires: ['John Smith', 'Mike Brown'],
          referee: 'David Wilson',
          weatherForecast: 'Sunny, 25°C'
        }
      },
      {
        id: 2,
        type: 'practice',
        title: 'Team Practice',
        date: '2024-01-23',
        time: '09:00',
        venue: 'Training Ground',
        status: 'upcoming',
        duration: '3 hours',
        focus: 'Batting & Fielding',
        coach: 'Mike Smith',
        attendees: 'All Players'
      },
      {
        id: 3,
        type: 'match',
        title: 'Semi Final',
        opponent: 'Royal Challengers',
        date: '2024-01-28',
        time: '15:00',
        venue: 'Sports Complex',
        status: 'upcoming',
        opponentLogo: '/team3-logo.png',
        ticketStatus: 'Selling Fast',
        broadcast: 'Sports Live HD',
        matchDetails: {
          format: 'T20',
          umpires: ['Steve Davis', 'James Wilson'],
          referee: 'Robert Brown',
          weatherForecast: 'Partly Cloudy, 23°C'
        }
      }
    ],
    completed: [
      {
        id: 4,
        type: 'match',
        title: 'League Match',
        opponent: 'Eagle Warriors',
        date: '2024-01-15',
        time: '14:00',
        venue: 'City Stadium',
        status: 'completed',
        result: 'Won by 5 wickets',
        score: {
          team: '186/5',
          opponent: '182/8'
        },
        highlights: ['Century by John Doe', '5 wickets by Mike Wilson'],
        matchStats: {
          bestBatsman: 'John Doe (102 runs)',
          bestBowler: 'Mike Wilson (5/25)'
        }
      }
    ],
    cancelled: [
      {
        id: 5,
        type: 'practice',
        title: 'Net Practice',
        date: '2024-01-18',
        time: '10:00',
        venue: 'Training Ground',
        status: 'cancelled',
        reason: 'Heavy Rain',
        rescheduledTo: '2024-01-20'
      }
    ]
  });
  
  









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
              setPracticeSessions, // Pass setPracticeSessions instead of setSchedulData
              selectedPractice,
              setEditDialogOpen,
              setSelectedPractice
            );
          }}
        />
      </Box>
    </MainContainer>
  );
};

export default TeamSchedule;