import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { officeHours } from '@/constants/Contact/contactData';

const ContactInfo = () => {
  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      sx={{ height: '100%' }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Office Hours
        </Typography>
        {officeHours.map((schedule, index) => (
          <Box key={index} mb={2}>
            <Typography variant="h6" color="primary">
              {schedule.day}
            </Typography>
            <Typography>
              {schedule.hours}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default ContactInfo; 