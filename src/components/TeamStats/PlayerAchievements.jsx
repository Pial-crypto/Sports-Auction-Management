
import React, {  } from 'react';
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Avatar,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { GlassCard } from '@/style/TeamStat';

export const PlayerAchievements=({teamStats})=>(
       <Grid item xs={12}>
              <GlassCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Player Achievements
                  </Typography>
                  <Grid container spacing={3}>
                    {teamStats.playerAchievements.map((achievement, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box 
                          sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            p: 2,
                            borderRadius: 2,
                            bgcolor: alpha('#fff', 0.1),
                          }}
                        >
                          <Avatar 
                            sx={{ 
                              mr: 2,
                              bgcolor: `hsl(${index * 120}, 70%, 50%)`,
                            }}
                          >
                            {achievement.name[0]}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1">
                              {achievement.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                              {achievement.achievement}: <strong>{achievement.value}</strong>
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </GlassCard>
            </Grid>
)