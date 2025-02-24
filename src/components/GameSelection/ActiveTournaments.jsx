import React from 'react';
import PropTypes from 'prop-types';
import { Grid, CardMedia, CardContent, Typography, Box, Fade, Zoom } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import { TournamentCard } from '@/style/GameSelection';
import { StatusChip } from '@/style/GameSelection';

const ActiveTournaments = ({ activeTournaments, sportType }) => {
  return (
    <Fade in={true} timeout={500}>
      <Grid container spacing={3}>
        {activeTournaments[sportType]?.map((tournament, index) => (
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
                      icon={tournament.status === 'LIVE' ? <AccessTime /> : undefined}
                    />
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">Teams</Typography>
                      <Typography variant="body1" fontWeight="bold">{tournament.stats.teams}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">Matches</Typography>
                      <Typography variant="body1" fontWeight="bold">{tournament.stats.matches}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">Prize</Typography>
                      <Typography variant="body1" fontWeight="bold">{tournament.stats.prize}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </TournamentCard>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Fade>
  );
};

ActiveTournaments.propTypes = {
  activeTournaments: PropTypes.object.isRequired,
  sportType: PropTypes.string.isRequired,
};

export default ActiveTournaments;
