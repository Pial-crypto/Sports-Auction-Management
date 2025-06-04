"use client";

import React, { useState } from 'react';
import {
  Box,
  Grid,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from 'chart.js';
import { fetchCurrentTournamentHook } from '@/hook/fetchCurrentTournament';
import { fetchCurrentTournamentMatchesHook } from '@/hook/fetchCurrentTournamentMatchesHook';
import { TournamentProgress } from '@/components/Statistics/TournamentProgress';
import { QuickStatsCard } from '@/components/Statistics/QuickStatsCard';
import { Header } from '@/components/Statistics/Header';
import { TrendsChart } from '@/components/Statistics/TrendsChart';
import { RecentMatchScore } from '@/components/Statistics/RecentMatchScore';
import storage from '@/class/storage';
import useFetchLatestApprovedTournamentHook from '@/hook/fetchLatestApprovedTournamentHook';
import TournamentNotStarted from '@/components/Common/tournamentNotStarted';
import NoMatchStarted from '@/components/Common/NoMatchStarted';
// Recharts dynamic imports

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  ChartLegend
);





const Statistics = () => {


  const [tournament,setTournamet]=useState(null);
  const [matches,setMatches]=useState([])


  if(storage.get("user").role==="organizer"){
  
// Fetch current tournament for organizer

 fetchCurrentTournamentHook(setTournamet)

  }
  if(storage.get("user").role==="player" || storage.get("user").role==="manager"){
  useFetchLatestApprovedTournamentHook(undefined,storage.get("user").role,setTournamet)
  }

  
  fetchCurrentTournamentMatchesHook(tournament,setMatches)


if(new Date(tournament?.tournamentDate)<=new Date() && matches.length==0){
  return(
<NoMatchStarted></NoMatchStarted>
  )
}



 
  return (
       new Date(tournament?.tournamentDate)<new Date()?( 
   matches && <Box sx={{ 
      p: 3, 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
<Header></Header>



      {/* Quick Stats Cards */}
 <QuickStatsCard tournament={tournament} matches={matches} />

    
      <Grid container spacing={3}>
          {/* Tournament Trends Chart */}

          <TrendsChart matches={matches} tournament={tournament} />
    

        {/* Recent Match Scores */}

        <RecentMatchScore matches={matches} tournament={tournament} />
        {/* <Grid item xs={12} lg={4}>
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
                        label: 'Team A',
                        data:teamAScoresArray,
                        backgroundColor: '#3b82f6',
                        borderRadius: 6,
                      },
                      {
                        label: 'Team B',
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
        </Grid> */}

        {/* Tournament Progress */}
        <TournamentProgress matches={matches} tournament={tournament} />

      </Grid>
    </Box>

        ) :<TournamentNotStarted></TournamentNotStarted>
  );
};

export default Statistics;