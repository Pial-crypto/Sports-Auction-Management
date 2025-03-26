import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { LocationOn, Phone, Email } from '@mui/icons-material';

const ContactForm = () => {
  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{ height: '100%' }}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Our Offices
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <LocationOn color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Main Office
                </Typography>
                <Typography>
                  123 Sports Avenue, New York, NY 10001
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Phone color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Phone
                </Typography>
                <Typography>
                  +1 (555) 123-4567
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2}>
              <Email color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Email
                </Typography>
                <Typography>
                  contact@playermanagement.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ContactForm; 