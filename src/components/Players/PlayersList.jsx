import React from 'react';
import { Grid, Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { players } from '@/constants/Players/playersData';

const PlayersList = () => {
  return (
    <Grid container spacing={3}>
      {players.map((player, index) => (
        <Grid item xs={12} sm={6} md={4} key={player.id}>
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
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar
                    src={player.image}
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {player.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {player.position}
                  </Typography>
                  <Typography variant="body2" textAlign="center">
                    {player.description}
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

export default PlayersList; 