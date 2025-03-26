import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Flag } from '@mui/icons-material';
import { motion } from 'framer-motion';

const OurMission = () => {
  return (
    <Card
      component={motion.div}
      whileHover={{ y: -5 }}
      sx={{ 
        borderRadius: 4,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Flag color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h4" fontWeight="bold">
            Our Mission
          </Typography>
        </Box>
        <Typography variant="body1">
          To revolutionize sports management through innovative technology and 
          comprehensive solutions that empower athletes, teams, and organizations 
          to achieve their full potential.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OurMission; 