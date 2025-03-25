import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, CardMedia, CardContent, Typography, Box, Fade, Zoom } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { TournamentCard } from '@/style/GameSelection';
import { StatusChip } from '@/style/GameSelection';
import fetchAllTournamentsHook from '@/hook/fetchTournament';
import format from 'date-fns/format';
const TournamentHistory = ({ tournamentHistory }) => {
  const [allTournamentHistory,setAllTournamentHistory]=useState(tournamentHistory)
  fetchAllTournamentsHook(setAllTournamentHistory,undefined,allTournamentHistory)

  console.log(allTournamentHistory,"i am inside my tournament history")
  return (
    <Fade in={true} timeout={500}>
      <Grid container spacing={3}>
        {allTournamentHistory.map((tournament, index) => (
          <Grid item xs={12} sm={6} md={4} key={tournament.id}>
            <Zoom in={true} timeout={500 + index * 100}>
              <TournamentCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={tournament.image ?? 
                    (tournament.tournamentIcon && tournament.tournamentIcon !== 'https://example.com/icon.png' 
                     ? tournament.tournamentIcon 
                     : 'https://images.unsplash.com/photo-1522778119026-d647f0596c20') 
                    }
                  alt={tournament.name}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {tournament.name}
                    </Typography>
                    <StatusChip
                      label={tournament.status}
                      status={tournament.status}
                      icon={tournament.status === 'COMPLETED' ? <CheckCircle /> : <Cancel />}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {tournament.date || format(new Date(tournament.tournamentDate),'MMMM dd, yyyy')} • {tournament.teams || tournament.numberOfTeams +" Teams"}  
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Winner: {tournament.winner}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                    Prize Pool: {tournament.prize || tournament.prizeMoney}
                  </Typography>
                </CardContent>
              </TournamentCard>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Fade>
  );
};

TournamentHistory.propTypes = {
  tournamentHistory: PropTypes.array.isRequired,
};

export default TournamentHistory;
