import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  CardContent,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { StyledCard } from '@/style/statistics';


 export const RecentMatchScore = ({matches,tournamet})=>{

  const recentMatchesLabelArray = [];
  const teamAScoresArray = [];
  const teamBScoresArray = [];
  for (let i = 0; i < matches.length; i++) {
  
    recentMatchesLabelArray.push(`Match ${i + 1}`);
    if(tournamet?.gameType.toLowerCase() === 'cricket') {
    // For cricket, split scores into runs and wickets
    const [team1RawRun, team1RawWicket] = matches[i]?.team1Score.split('/');
    const [team2RawRun, team2RawWicket] = matches[i]?.team2Score.split('/');
      const team1Run = !isNaN(team1RawRun) ? parseInt(team1RawRun) : 0;
    const team2Run = !isNaN(team2RawRun) ? parseInt(team2RawRun) : 0;
    teamAScoresArray.push(
      team1Run)
  
    teamBScoresArray.push(
      team2Run)
    }
    else {
        // For football, use scores directly
        const team1Score = !isNaN(matches[i].team1Score) ? parseInt(matches[i].team1Score) : 0;
        const team2Score = !isNaN(matches[i].team2Score) ? parseInt(matches[i].team2Score) : 0;
        teamAScoresArray.push(team1Score);
        teamBScoresArray.push(team2Score);
    }
    
    if(i==4) break; // Limit to 5 matches
  }



     return(
        
      
           <Grid item xs={12} lg={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#94a3b8' }}>
                Recent Match Scores
              </Typography>
              <Box sx={{ width: '100%', height: 400, position: 'relative' }}>
                <Bar
                  data={{
                    labels: recentMatchesLabelArray,
                    datasets: [
                      {
                        label: '1st Team',
                        data:teamAScoresArray,
                        backgroundColor: '#3b82f6',
                        borderRadius: 6,
                      },
                      {
                        label: '2nd Team',
                        data: teamBScoresArray,
                        backgroundColor: '#10b981',
                        borderRadius: 6,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    scales: {
                      x: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                        },
                        ticks: {
                          color: '#fff',
                        },
                      },
                      y: {
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                        },
                        ticks: {
                          color: '#fff',
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        labels: {
                          color: '#fff',
                        },
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
     )
}