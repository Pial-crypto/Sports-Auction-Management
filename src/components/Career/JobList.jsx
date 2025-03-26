import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { jobs } from '@/constants/Career/careerData';

const JobList = () => {
  return (
    <Grid container spacing={3}>
      {jobs.map((job, index) => (
        <Grid item xs={12} md={6} key={job.id}>
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
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  {job.title}
                </Typography>
                <Box display="flex" gap={1} mb={2}>
                  <Chip label={job.department} color="primary" size="small" />
                  <Chip label={job.location} color="secondary" size="small" />
                </Box>
                <Typography variant="body1">
                  {job.description}
                </Typography>
                <Box mt={2}>
                  <Typography variant="body2" color="text.secondary">
                    {job.requirements}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default JobList; 