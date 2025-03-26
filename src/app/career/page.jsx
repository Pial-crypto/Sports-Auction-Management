"use client";
import React from 'react';
import { Container, Grid } from '@mui/material';
import CareerHero from '@/components/Career/CareerHero';
import JobList from '@/components/Career/JobList';
import CareerBenefits from '@/components/Career/CareerBenefits';

const CareerPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <CareerHero />
        </Grid>
        <Grid item xs={12}>
          <JobList />
        </Grid>
        <Grid item xs={12}>
          <CareerBenefits />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CareerPage; 