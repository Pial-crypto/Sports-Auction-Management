import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { stats } from '@/constants/Players/playersData';

const PlayerStats = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
        Performance Statistics
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={stat.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card
                component={motion.div}
                whileHover={{ y: -5 }}
                sx={{ height: '100%', textAlign: 'center' }}
              >
                <CardContent>
                  {stat.icon}
                  <Typography variant="h3" color="primary" gutterBottom>
                    {stat.value}
                  </Typography>
                  <Typography variant="h6">
                    {stat.title}
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

export default PlayerStats; 