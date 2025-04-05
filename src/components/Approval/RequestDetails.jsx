import React from 'react';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Score, Assessment, Person, CalendarToday, SportsHandball, Groups, History, Email, Phone, Info } from '@mui/icons-material';

const RequestDetails = ({ COLORS, selectedRequest }) => {
  if (selectedRequest.type === 'Player Registration') {
    return (
      <>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <ListItemIcon><Person color="primary" /></ListItemIcon>
              <ListItemText 
                primary={
                  <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                    Player Name
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: COLORS.text.secondary }}>
                    {selectedRequest.playerName}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><SportsHandball color="primary" /></ListItemIcon>
              <ListItemText 
                primary={
                  <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                    Position
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: COLORS.text.secondary }}>
                    {selectedRequest.position}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><History color="primary" /></ListItemIcon>
              <ListItemText 
                primary={
                  <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                    Experience
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: COLORS.text.secondary }}>
                    {selectedRequest.experience} years
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <ListItemIcon><Groups color="primary" /></ListItemIcon>
              <ListItemText 
                primary={
                  <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                    Previous Team
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: COLORS.text.secondary }}>
                    {selectedRequest.prevTeam}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><Person color="primary" /></ListItemIcon>
              <ListItemText 
                primary={
                  <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                    Age
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: COLORS.text.secondary }}>
                    {selectedRequest.age} years
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><Info color="primary" /></ListItemIcon>
              <ListItemText 
                primary={
                  <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                    Achievements
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: COLORS.text.secondary }}>
                    {selectedRequest.additionalInfo}
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Grid>
      </>
    );
  }

  // For other types of requests (keeping the original code)
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
                  {selectedRequest.match}
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
                  {selectedRequest.score}
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
                  {selectedRequest.umpire}
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
                  {selectedRequest.matchDate}
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
