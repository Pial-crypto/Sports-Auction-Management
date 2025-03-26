"use client";
import React from 'react';
import { Container, Grid } from '@mui/material';
import AboutHero from '@/components/About/AboutHero';
import OurMission from '@/components/About/OurMission';
import OurTeam from '@/components/About/OurTeam';
import OurValues from '@/components/About/OurValues';

const AboutPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <AboutHero />
        </Grid>
        <Grid item xs={12}>
          <OurMission />
        </Grid>
        <Grid item xs={12}>
          <OurValues />
        </Grid>
        <Grid item xs={12}>
          <OurTeam />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage; 