import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { teamMembers } from '@/constants/About/teamData';

const OurTeam = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
        Our Team
      </Typography>
      <Grid container spacing={3}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={member.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card
                component={motion.div}
                whileHover={{ y: -5 }}
                sx={{ 
                  borderRadius: 4,
                  textAlign: 'center',
                  height: '100%'
                }}
              >
                <CardContent>
                  <Avatar
                    src={member.image}
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      margin: '0 auto 16px',
                      border: '4px solid #4FC3F7'
                    }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {member.position}
                  </Typography>
                  <Typography variant="body2">
                    {member.description}
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

export default OurTeam; 