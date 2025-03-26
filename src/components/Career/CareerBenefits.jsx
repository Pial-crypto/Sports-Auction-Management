import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { benefits } from '@/constants/Career/careerData';

const CareerBenefits = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
        Why Work With Us
      </Typography>
      <Grid container spacing={3}>
        {benefits.map((benefit, index) => (
          <Grid item xs={12} sm={6} md={4} key={benefit.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card
                component={motion.div}
                whileHover={{ y: -5 }}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    {benefit.icon}
                    <Typography variant="h6" fontWeight="bold">
                      {benefit.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CareerBenefits; 