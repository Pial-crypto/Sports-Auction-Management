import React from 'react';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Groups, Person, Email, Phone } from '@mui/icons-material';

const TeamDetails = ({ COLORS,selectedRequest }) => {
  return (
    <>
                            <Grid item xs={12} md={6}>
                              <List>
                                <ListItem>
                                  <ListItemIcon><Groups color="primary" /></ListItemIcon>
                                  <ListItemText 
                                    primary={
                                      <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                                        Team Name
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography sx={{ color: COLORS.text.secondary }}>
                                        {selectedRequest.teamName}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemIcon><Person color="primary" /></ListItemIcon>
                                  <ListItemText 
                                    primary={
                                      <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                                        Captain
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography sx={{ color: COLORS.text.secondary }}>
                                        {selectedRequest.captain}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemIcon><Email color="primary" /></ListItemIcon>
                                  <ListItemText 
                                    primary={
                                      <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                                        Contact Email
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography sx={{ color: COLORS.text.secondary }}>
                                        {selectedRequest.contactEmail}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              </List>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <List>
                                <ListItem>
                                  <ListItemIcon><Phone color="primary" /></ListItemIcon>
                                  <ListItemText 
                                    primary={
                                      <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                                        Contact Phone
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography sx={{ color: COLORS.text.secondary }}>
                                        {selectedRequest.contactPhone}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemIcon><Groups color="primary" /></ListItemIcon>
                                  <ListItemText 
                                    primary={
                                      <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                                        Number of Players
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography sx={{ color: COLORS.text.secondary }}>
                                        {selectedRequest.players}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              </List>
                            </Grid>
                          </>
  );
};

export default TeamDetails;
