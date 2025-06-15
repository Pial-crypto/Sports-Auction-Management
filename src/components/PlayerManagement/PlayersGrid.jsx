
import React, {  } from 'react';
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Zoom,
} from '@mui/material';
import {
  Email,
  Person,
} from '@mui/icons-material';
import { GlassCard } from '@/style/PlayerManagement';
import { PlayerAvatar } from '@/style/PlayerManagement';
import { players } from '@/constants/Players/playersData';
export const PlayersGrid=({finalPlayers,tournament})=>{
   console.log(players,"player")


  return((
      <Grid container spacing={3}>
            {finalPlayers.map((player, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                            <Zoom in={true} timeout={500 + (index * 100)}>
                              <Box>
                               
                                  
                                  <GlassCard>
                                    <CardContent>
                                      <Box sx={{ textAlign: 'center', mb: 2 }}>
                                        <PlayerAvatar src={player.avatar} />
                                        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                                          {player.name}
                                        </Typography>
                                    
                                      </Box>
            
                                      <Grid container spacing={2} sx={{ mb: 2 }}>
                                        <Grid item xs={4}>
                                          <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="h6" color="primary.light">
                                              {player.matchCount}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                              Matches
                                            </Typography>
                                          </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                          <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="h6" color="primary.light">
                                              { tournament.gameType==='cricket'?  player.runsScored: players.goals}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                               { tournament.gameType==='cricket'?  'Runs': 'Goals'}
                                            </Typography>
                                          </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                          <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="h6" color="primary.light">
                                              { tournament.gameType==='cricket'? player.wickets: player.assists}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                              { tournament.gameType==='cricket'? 'Wickets': 'Assists'}
                                            </Typography>
                                          </Box>
                                        </Grid>
                                      </Grid>
            
                                      <Box sx={{ 
                                        p: 1.5, 
                                        bgcolor: 'rgba(255,255,255,0.1)',
                                        borderRadius: 1,
                                        mb: 2
                                      }}>
                                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                          <Email fontSize="small" /> {player.email}
                                        </Typography>
                                       
                                      </Box>
            
                                   
                                    </CardContent>
                                  </GlassCard>
                            
                              </Box>
                            </Zoom>
                          </Grid>
            ))}
            {finalPlayers.length === 0 && (
              <Grid item xs={12}>
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 4, 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 2
                }}>
                  <Person sx={{ fontSize: 60, color: 'rgba(255,255,255,0.5)', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    No players found in this category
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
))
}