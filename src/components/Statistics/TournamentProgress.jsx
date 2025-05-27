

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  CardContent,
  LinearProgress,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { getAvgScore, getAvgWicket } from '@/function/handleMatchesPage';
import { StyledCard } from '@/style/statistics';
export const TournamentProgress = ({matches,tournament})=>{
    return(

        tournament && matches &&
            <Grid item xs={12}>
          <StyledCard sx={{ 
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)'
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#94a3b8', mb: 3 }}>
                Tournament Progress
              </Typography>
              <Grid container spacing={3}>
                {[
                  { label: 'Matches Completed', value: matches.filter(match => match.status?.toLowerCase() === 'completed').length, total: matches.length, color: '#10b981' },
                  { label: 'Average Score', value: getAvgScore(matches,tournament), total: getAvgScore(matches,tournament)*matches.length, color: '#3b82f6' },
                  // { label: 'Total Sixes', value: tournamentStats.totalSixes, total: 100, color: '#f59e0b' },
                 tournament?.gameType.toLowerCase()=== 'cricket' && { label: 'Total Wickets', value: getAvgWicket(matches,tournament), total: getAvgWicket(matches,tournament)*matches.length, color: '#6366f1' }
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography color="rgba(255,255,255,0.7)">{item.label}</Typography>
                        <Typography color={item.color} fontWeight="bold">
                          {item.value}/{item.total}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(item.value / item.total) * 100}
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          bgcolor: alpha(item.color, 0.1),
                          '& .MuiLinearProgress-bar': {
                            bgcolor: item.color,
                            borderRadius: 4,
                          }
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
    )
}