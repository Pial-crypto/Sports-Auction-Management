import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { features } from '@/constants/Services/servicesData';

const ServiceFeatures = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
        Why Choose Us
      </Typography>
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} key={feature.id}>
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card
                component={motion.div}
                whileHover={{ y: -5 }}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    {feature.icon}
                    <Typography variant="h6" fontWeight="bold">
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {feature.description}
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

export default ServiceFeatures; 