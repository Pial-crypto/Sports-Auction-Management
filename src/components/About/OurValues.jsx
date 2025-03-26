import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { values } from '@/constants/About/valuesData';

const OurValues = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
        Our Values
      </Typography>
      <Grid container spacing={3}>
        {values.map((value, index) => (
          <Grid item xs={12} sm={6} key={value.id}>
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
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    {value.icon}
                    <Typography variant="h5" fontWeight="bold">
                      {value.title}
                    </Typography>
                  </Box>
                  <Typography>
                    {value.description}
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

export default OurValues; 