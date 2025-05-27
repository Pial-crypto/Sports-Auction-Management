
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  CardContent,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { StyledCard } from '@/style/statistics';



export const TrendsChart=({matches,tournament})=>{

  const trendsChartMatchListArray = [];
  const trendsChartRunsListArray = [];
  const trendsChartWicketsListArray = [];
  const trendsChartGoalsListArray = [];
for (let i = 0; i < matches.length; i++) {

     trendsChartMatchListArray.push(`Match ${i+1}`);
  if(tournament?.gameType.toLowerCase() === 'cricket') {
  const [team1RawRun,team1RawWicket] = matches[i]?.team1Score.split('/');
  const [team2RawRun,team2RawWicket]= matches[i]?.team2Score.split('/');

  const team1Run = !isNaN(team1RawRun) ? parseInt(team1RawRun) : 0;
  const team2Run = !isNaN(team2RawRun) ? parseInt(team2RawRun) : 0;



 const team1Wicket= !isNaN(team1RawWicket) ? parseInt(team1RawWicket) : 0;
  const team2Wicket= !isNaN(team2RawWicket) ? parseInt(team2RawWicket) : 0;



    trendsChartRunsListArray.push(team1Run + team2Run);
  trendsChartWicketsListArray.push(team1Wicket + team2Wicket);

  }
  else{
  const team1Goal = !isNaN(matches[i].team1Score) ? parseInt(matches[i].team1Score) : 0;
  const team2Goal = !isNaN(matches[i].team2Score) ? parseInt(matches[i].team2Score) : 0;

  trendsChartGoalsListArray.push(team1Goal + team2Goal);

  }



}



    return(
        matches && tournament &&
          <Grid item xs={12} lg={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#94a3b8' }}>
                Tournament Match Analysis
              </Typography>
              <Box sx={{ width: '100%', height: 400, position: 'relative' }}>
                <Bar
                  data={{
                    labels:trendsChartMatchListArray,
                        
                    
                    datasets: [
                      {
                        label: 'Team Score',
                        data: tournament.gameType.toLowerCase()==='cricket' ? trendsChartRunsListArray : 
                     trendsChartGoalsListArray,
                        
                        backgroundColor: '#3b82f6',
                        borderRadius: 6,
                      },
                      tournament.gameType.toLowerCase()==='cricket' && {
                        label: 'Wickets',
                        data: trendsChartWicketsListArray,
                        backgroundColor: '#10b981',
                        borderRadius: 6,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                        },
                        ticks: {
                          color: '#fff',
                        },
                      },
                      x: {
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