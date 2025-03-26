import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { services } from '@/constants/Services/servicesData';

const ServicesList = () => {
  return (
    <Grid container spacing={3}>
      {services.map((service, index) => (
        <Grid item xs={12} md={4} key={service.id}>
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
                  {service.icon}
                  <Typography variant="h6" fontWeight="bold">
                    {service.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ServicesList; 