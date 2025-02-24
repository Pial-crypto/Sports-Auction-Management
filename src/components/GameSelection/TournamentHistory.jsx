import React from 'react';
import PropTypes from 'prop-types';
import { Grid, CardMedia, CardContent, Typography, Box, Fade, Zoom } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { TournamentCard } from '@/style/GameSelection';
import { StatusChip } from '@/style/GameSelection';

const TournamentHistory = ({ tournamentHistory }) => {
  return (
    <Fade in={true} timeout={500}>
      <Grid container spacing={3}>
        {tournamentHistory.map((tournament, index) => (
          <Grid item xs={12} sm={6} md={4} key={tournament.id}>
            <Zoom in={true} timeout={500 + index * 100}>
              <TournamentCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={tournament.image}
                  alt={tournament.name}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {tournament.name}
                    </Typography>
                    <StatusChip
                      label={tournament.status}
                      status={tournament.status}
                      icon={tournament.status === 'COMPLETED' ? <CheckCircle /> : <Cancel />}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {tournament.date} • {tournament.teams}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Winner: {tournament.winner}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                    Prize Pool: {tournament.prize}
                  </Typography>
                </CardContent>
              </TournamentCard>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Fade>
  );
};

TournamentHistory.propTypes = {
  tournamentHistory: PropTypes.array.isRequired,
};

export default TournamentHistory;
