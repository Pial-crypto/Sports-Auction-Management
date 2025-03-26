"use client";
import React from 'react';
import { Container, Grid } from '@mui/material';
import ServicesHero from '@/components/Services/ServicesHero';
import ServicesList from '@/components/Services/ServicesList';
import ServiceFeatures from '@/components/Services/ServiceFeatures';

const ServicesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ServicesHero />
        </Grid>
        <Grid item xs={12}>
          <ServicesList />
        </Grid>
        <Grid item xs={12}>
          <ServiceFeatures />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServicesPage; 