"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Fade,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Header } from '@/components/TeamStats/Header';
import { fetchCurrentTeamForManagerHook } from '@/hook/fetchCurrentTeamForManagerHook';
import useFetchLatestApprovedTournamentHook from '@/hook/fetchLatestApprovedTournamentHook';
import storage from '@/class/storage';
import { fetchCurrentTournamentMatchesHook } from '@/hook/fetchCurrentTournamentMatchesHook';
import { QuickStats } from '@/components/TeamStats/QuickStats';
import { RecentForm } from '@/components/TeamStats/RecentForm';
import { PerformanceCharts } from '@/components/TeamStats/PerformanceCharts';
import { getCurrentStreak, getDrawCount, getMyAvgScore, getMyAvgWicket, getMyHighestScore, getMyMaxMOTM, getMyTopPerformers, makeRecentFormArray, makeTeamPointsArray } from '@/function/handleTeamStat';
import { LoadingStage } from '@/components/TeamStats/LoadingState';
import { PerformanceMetrics } from '@/components/TeamStats/PerformanceMetrics';
import { PlayerAchievements } from '@/components/TeamStats/PlayerAchievements';
import { MainContainer } from '@/style/TeamStat';
import { fetchPlayerPerformancesHook } from '@/hook/fetchPlayerPerformancesHook';
import { setAllPlayersNameFromIdHook } from '@/hook/setAllPlayersNameFromIdHook';
import { getMyMaxScorer } from '@/function/handleTeamStat';
import { fetchPlayerFilteringUserForTeam } from '@/hook/fetchTeamPlayerHook';
import { fetchPlayerForSpecificTeamHook } from '@/hook/fetchSpecificTeamPlayersHook';
import getAllAuction from '@/function/getAllAuction';
import { data } from 'react-router-dom';
import { fetchCurrentTeamForPlayerHook } from '@/hook/fetchTeamForPlayerHook';
import NoMatchStarted from '@/components/Common/NoMatchStarted';
import NoTeamForYou from '@/components/Common/NoTeamForYou';
import { myTeamPlayerPerformances } from '@/function/handlePlayerManagement';
import NoMatchOfYourTeam from '@/components/Common/NoMatchOfYourTeam';


// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);









const TeamStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [tournament,setTournament]=useState(null);
  const [myTeam,setMyTeam]=useState(null)
  const [matches,setMatches]=useState([])
   
      const [auctionTeam,setAuctionTeam]=useState([])
       const [teamPlayers,setTeamPlayers]=useState([])
      
  
  


  
  

  useFetchLatestApprovedTournamentHook(undefined,storage.get("user").role,setTournament)
  if(storage.get('user').role==='manager'){
  fetchCurrentTeamForManagerHook(tournament,setMyTeam)
  }

if (storage.get('user').role.toLowerCase() === 'player') {
fetchCurrentTeamForPlayerHook(setMyTeam)

}

console.log("The bigger team of mine",myTeam)

  fetchCurrentTournamentMatchesHook(tournament,setMatches)

const myMatches=matches.filter((match)=>myTeam &&  match.team1Id===myTeam.id || match.team2Id===myTeam.id)
const wonMatches=myMatches.filter((match)=>myTeam && match.winner===myTeam.teamName)
const lostMatches=myMatches.filter((match)=>myTeam && match.winner!=myTeam.teamName)
const drawMatches=myMatches.filter((match)=>myTeam && match.winner.toLowerCase()==="draw")
const currentStreak=getCurrentStreak(myTeam,myMatches)
const [playerPerformances,setPlayerPerformances]=useState([]);
fetchPlayerPerformancesHook(setPlayerPerformances,tournament)
//console.log(playerPerformances)

const recentFormArray=[];
makeRecentFormArray(myMatches,recentFormArray,myTeam)

const teamPoints = {};



matches &&  makeTeamPointsArray(matches,teamPoints)

const myMOTM=getMyMaxMOTM(myMatches,teamPlayers);


console.log(myMOTM,'0tth player')

console.log("player perf",playerPerformances)

// Convert teamPoints object to array and sort by points

const ptsArray = Object.entries(teamPoints).map(
  ([teamId, totalPoints]) => ({ teamId, totalPoints })
);





ptsArray.sort((a, b) => b.totalPoints - a.totalPoints);
 const ranking=ptsArray.findIndex((team)=>team.teamId===myTeam.id)+1;
 //console.log(ranking,"Thats my rank bro")
 const totalPointsAvailable = ptsArray.reduce(
  (acc, team) => acc + team.totalPoints,
  0
);

console.log("Total points",totalPointsAvailable)

 const mytotalPoints=ptsArray[ranking-1]?.totalPoints


const teamStats = {
  overview: {
    matchesPlayed: myMatches.length,
    matchesWon: wonMatches.length,
    matchesLost: lostMatches.length,
    matchesDrawn: drawMatches.length,
    winRate: (wonMatches.length*100 / myMatches.length) ,
    currentStreak: currentStreak,
    ranking: ranking,
    totalPoints: mytotalPoints,
  },
performance: tournament?.gameType?.toLowerCase() === 'cricket'
  ? {
      battingAvg: myTeam && myMatches && getMyAvgScore(myMatches, tournament, myTeam),
      bowlingAvg: myTeam && myMatches && `${getMyAvgWicket(myMatches, tournament, myTeam)} WK`,
      highestScore: myTeam && myMatches && getMyHighestScore(myMatches, tournament, myTeam),
      drawCount: myMatches && getDrawCount(myMatches), 
    }
  : {
      averageScore: myTeam && myMatches && getMyAvgScore(myMatches, tournament, myTeam),
      highestScore: myTeam && myMatches && getMyHighestScore(myMatches, tournament, myTeam),
      drawCount: myMatches && getDrawCount(myMatches),
    },

  recentForm: recentFormArray,
  playerAchievements: [
    { name: 'John Doe', achievement: 'Most Runs', value: '542 runs' },
    { name: 'Mike Smith', achievement: 'Most Wickets', value: '18 wickets' },
    { name: 'Steve Johnson', achievement: 'Best Catch Rate', value: '95%' },
  ],
};

const myTopPerformers=getMyTopPerformers(playerPerformances,myTeam,tournament)
//const myMaxScorer= getMyMaxScorer(playerPerformances,myTeam,tournament)
//console.log(myTopPerformers,"Bro he is my max scorer")


setAllPlayersNameFromIdHook(playerPerformances,setPlayerPerformances)

//console.log("The big my team",myTeam)

fetchPlayerForSpecificTeamHook(myTeam?.teamName, myTeam?.id, tournament, setAuctionTeam);
 
  
fetchPlayerFilteringUserForTeam(auctionTeam,setTeamPlayers)


//console.log("MY motm",myMOTM)


  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1500);
  }, []);



const performanceData = {
  labels: myMatches.map((_, index) => `Match ${index + 1}`),
  datasets: [
    {
      label: 'Team Performance',
      data: myMatches.map((match) => {
        // Calculate performance score
        if (myTeam && match.winner === myTeam.teamName) {
          return 100; // Win
        } else if (match.winner.toLowerCase() === "draw") {
          return 50; // Draw
        } else {
          return 0; // Loss
        }
      }),
      fill: true,
      borderColor: '#4fc3f7',
      backgroundColor: alpha('#4fc3f7', 0.2),
      tension: 0.4,
    },
  ],
};

// Update chartOptions to better show the performance range
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: 'white',
      },
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const score = context.parsed.y;
          if (score === 100) return 'Win';
          if (score === 50) return 'Draw';
          return 'Loss';
        }
      }
    }
  },
  scales: {
    y: {
      min: 0,
      max: 100,
      ticks: { 
        color: 'white',
        callback: function(value) {
          if (value === 100) return 'Win';
          if (value === 50) return 'Draw';
          if (value === 0) return 'Loss';
          return '';
        } 
      },
      grid: { color: 'rgba(255,255,255,0.1)' },
    },
    x: {
      ticks: { color: 'white' },
      grid: { color: 'rgba(255,255,255,0.1)' },
    },
  },
};
console.log()

  if(!myTeam){
    return <NoTeamForYou></NoTeamForYou>
  }
//console.log("myteam",myTeam)
if(!myMatches || myMatches.length==0){
  return <NoMatchOfYourTeam></NoMatchOfYourTeam>
}

  return (
    
    <MainContainer>
      <Fade in={!loading} timeout={1000}>
        <Box>
          {/* Header Section */}


          {/* Quick Stats */}
     

{/* Quick Stats */}
<QuickStats teamStats={teamStats}
totalPointsAvailable={totalPointsAvailable}
ptsArray={ptsArray}
matches={matches}
ranking={ranking}
loading={loading}
></QuickStats>

          {/* Performance Charts */}
          <Grid container spacing={3}>
            {/* Performance Trend */}
      
<PerformanceCharts performanceData={performanceData} chartOptions={chartOptions}></PerformanceCharts>

            {/* Recent Form */}
<RecentForm teamStats={teamStats}></RecentForm>

            {/* Performance Metrics */}
            
            <PerformanceMetrics teamStats={teamStats}></PerformanceMetrics>

            {/* Player Achievements */}
      {   myTopPerformers && <PlayerAchievements myTopPerformers={myTopPerformers} tournament={tournament} myMaxMOTM={myMOTM}> </PlayerAchievements>
}
          </Grid>
        </Box>
      </Fade>

      {/* Loading State */}
      {loading && (
      <LoadingStage></LoadingStage>
      )}
    </MainContainer>
    
  );
};

export default TeamStatistics;