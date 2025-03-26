"use client";
import React from 'react';
import { Container, Grid } from '@mui/material';
import PlayersHero from '@/components/Players/PlayersHero';
import PlayersList from '@/components/Players/PlayersList';
import PlayerStats from '@/components/Players/PlayerStats';

const PlayersPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <PlayersHero />
        </Grid>
        <Grid item xs={12}>
          <PlayersList />
        </Grid>
        <Grid item xs={12}>
          <PlayerStats />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlayersPage; 