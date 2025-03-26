"use client";
import React from 'react';
import { Container, Grid } from '@mui/material';
import NewsHero from '@/components/News/NewsHero';
import NewsList from '@/components/News/NewsList';
import FeaturedNews from '@/components/News/FeaturedNews';

const NewsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <NewsHero />
        </Grid>
        <Grid item xs={12} md={8}>
          <NewsList />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeaturedNews />
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewsPage; 