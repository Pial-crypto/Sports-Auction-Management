import React from 'react';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Score, Assessment, Person, CalendarToday } from '@mui/icons-material';

const RequestDetails = ({ match, score, umpire, matchDate }) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <List>
          <ListItem>
            <ListItemIcon><Score color="primary" /></ListItemIcon>
            <ListItemText 
              primary={
                <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                  Match
                </Typography>
              }
              secondary={
                <Typography sx={{ color: COLORS.text.secondary }}>
                  {match}
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon><Assessment color="primary" /></ListItemIcon>
            <ListItemText 
              primary={
                <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                  Final Score
                </Typography>
              }
              secondary={
                <Typography sx={{ color: COLORS.text.secondary }}>
                  {score}
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} md={6}>
        <List>
          <ListItem>
            <ListItemIcon><Person color="primary" /></ListItemIcon>
            <ListItemText 
              primary={
                <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                  Umpire
                </Typography>
              }
              secondary={
                <Typography sx={{ color: COLORS.text.secondary }}>
                  {umpire}
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon><CalendarToday color="primary" /></ListItemIcon>
            <ListItemText 
              primary={
                <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                  Match Date
                </Typography>
              }
              secondary={
                <Typography sx={{ color: COLORS.text.secondary }}>
                  {matchDate}
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Grid>
    </>
  );
};

export default RequestDetails;
