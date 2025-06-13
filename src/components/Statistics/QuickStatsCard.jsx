
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Avatar,
  Zoom,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  TrendingUp,
  People,
  EmojiEvents,
  SportsCricket,
} from '@mui/icons-material';
import { StyledCard } from '@/style/statistics';
import { getCurrentStage, getHighestScore } from '@/function/handleMatchesPage';

export const QuickStatsCard=({tournament,matches,tournamentTeams})=>{

   // console.log("QuickStatsCard",tournament,matches)
     return(

        
     matches && tournament &&
             <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            icon: <People sx={{ fontSize: 40 }} />,
            label: 'Participating Teams',
            value: tournamentTeams.length,
            color: '#3b82f6',
            subText: 'Active Teams in Tournament'
          },
          {
            icon: <SportsCricket sx={{ fontSize: 40 }} />,
            label: 'Total Matches',
          value: matches?.filter(match => match.status?.toLowerCase() === 'completed').length/matches.length,

            color: '#10b981',
            subText: 'Matches Completed'
          },
          {
            icon: <TrendingUp sx={{ fontSize: 40 }} />,
            label: 'Highest Score',
            value: getHighestScore(matches,tournament && tournament) || 0,
            color: '#f59e0b',
            subText: 'Tournament Best'
          },
          {
            icon: <EmojiEvents sx={{ fontSize: 40 }} />,
            label: 'Tournament Stage',
            value: getCurrentStage(matches),
            color: '#6366f1',
            subText: 'Current Phase'
          }
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Zoom in={true} timeout={500 + (index * 100)}>
              <StyledCard sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(stat.color, 0.3)}`,
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(stat.color, 0.2),
                      color: stat.color,
                      width: 56,
                      height: 56
                    }}>
                      {stat.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h4" sx={{ color: stat.color, fontWeight: 'bold' }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        {stat.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: alpha(stat.color, 0.7) }}>
                        {stat.subText}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </StyledCard>
            </Zoom>
          </Grid>
        ))}
      </Grid>
        
     )
}