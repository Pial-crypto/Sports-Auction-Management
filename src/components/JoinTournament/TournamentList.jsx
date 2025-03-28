import React from 'react';
import { Grid } from '@mui/material';
import TournamentCard from './TournamentCard';

const TournamentList = ({ tournaments, onJoinRequest }) => {
  return (
    <Grid container spacing={3}>
      {tournaments.map((tournament) => (
        <Grid item xs={12} md={6} key={tournament.id}>
          <TournamentCard 
            tournament={tournament}
            onJoinRequest={onJoinRequest}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TournamentList; 