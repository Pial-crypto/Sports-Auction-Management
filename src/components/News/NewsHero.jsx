import React from 'react';
import { Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const NewsHero = () => {
  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
        color: 'white',
        textAlign: 'center'
      }}
    >
      <Typography variant="h2" gutterBottom fontWeight="bold">
        Latest News
      </Typography>
      <Typography variant="h5">
        Stay updated with the latest sports management news
      </Typography>
    </Paper>
  );
};

export default NewsHero; 