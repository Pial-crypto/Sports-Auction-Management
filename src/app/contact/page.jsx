"use client";
import React from 'react';
import { Container, Grid } from '@mui/material';
import ContactHero from '@/components/Contact/ContactHero';
import ContactForm from '@/components/Contact/ContactForm';
import ContactInfo from '@/components/Contact/ContactInfo';

const ContactPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ContactHero />
        </Grid>
        <Grid item xs={12} md={8}>
          <ContactForm />
        </Grid>
        <Grid item xs={12} md={4}>
          <ContactInfo />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage; 