import { StatsComponent } from "@/components/UserDashboard/Stats";
import { PieChartComponent } from "@/components/UserDashboard/PieChart";
import { GlassCard } from "@/style/UserDashboard";
import { Typography } from "@mui/material";
import { Line } from "recharts";
import { default as getTour } from "./fetchAllTournaments";

const allTournaments = await getTour();  // Use the alias name



    export const renderPerformanceGraphs = (user,mockData) => {
    const data = user.role === "player" 
      ? mockData.player
      : mockData[user.role];

      console.log("inside the graph",data)

      console.log("data.performance",data.performanceData)

    if (!data?.performanceData) {
      return (
        <GlassCard>
          <Typography variant="h6" color="text.secondary" align="center">
            No performance data available
          </Typography>
        </GlassCard>
      );
    }



   return (
   user.role==='organizer'?(
   <PieChartComponent data={data} user={user}></PieChartComponent>):
   (
    user.role=='player'?(
    <PlayerPerformancePieChart performanceData={data.performanceData}></PlayerPerformancePieChart>
    ):<ManagerStageChart performanceData={data.performanceData} pieData={data.pieData}></ManagerStageChart>
   )

)
  };

    export const renderDashboard = (user,mockData) => {
    const totalTournamentCount=mockData[user.role].totalTournaments
    const totalMatchesCount=mockData[user.role].totalMatches

   const data=mockData[user.role].stats

console.log(user,"The dashboard user")
      

     // console.log(data,"in stats")
    if (!data) return  (
        <Typography>
            
            Dashboard not available
        </Typography>
    )
return(
user.role==='organizer'|| user.role==='manager'  ?  (
      <StatsComponent data={data} ></StatsComponent>
    ):<DashBoardPlayer data={data} totalMatches={totalMatchesCount} totalTournaments={totalTournamentCount}></DashBoardPlayer>)
  };


  export  const handleLogout = (setLoading,setTimeout,setSnackbar,setLogoutDialog,router) => {
    setLoading(true);
    setTimeout(() => {
      storage.clear();
      setSnackbar({
        open: true,
        message: "Successfully logged out!",
        severity: "success",
      });
      setLogoutDialog(false);
      setLoading(false);
      storage.clear()
    
      router.push("/auth/login");
    }, 1000);
  };

  export  const handleSectionChange = (section,setLogoutDialog,setSelectedSection) => {
    if (section === "Logout") {
      setLogoutDialog(true);
    } else {
      setSelectedSection(section);
    }
  };

export const getTotalSpent = (myTournamentList) => {
  return myTournamentList.reduce((sum, t) =>
    sum + (t.budgetSpent || 0) + (t.equipmentSpent || 0) + (t.prizeMoneySpent || 0) + (t.staffSpent || 0) + (t.venueSpent || 0),
    0
  );
};
export const getTotalBudget = (myTournamentList) => {
  return myTournamentList.reduce((sum, t) =>
    sum + t.budget,
    0
  );
};

export const getGameTypeCount = (myTournamentList) => {
  return myTournamentList.reduce((countMap, tournament) => {
    const game = tournament.gameType || "Unknown";
    countMap[game] = (countMap[game] || 0) + 1;
    return countMap;
  }, {});
};

export const getPerformanceDataArray = (myTournamentList) => {
  const performanceData = [];

  for (let i = 0; i < myTournamentList.length; i++) {
    const t = myTournamentList[i];

    const totalBudget = t.budget || 0;
    const totalSpent = 
      (t.budgetSpent || 0) +
      (t.equipmentSpent || 0) +
      (t.prizeMoneySpent || 0) +
      (t.staffSpent || 0) +
      (t.venueSpent || 0);

    performanceData.push({
      tournament: t.name || "Unknown Tournament",
      budget: totalBudget,
      spent: totalSpent,
      remaining: totalBudget - totalSpent
    });
  }

  return performanceData;
};


export const getTotalParicipatingTeam=(myTournamentList)=>{
      return myTournamentList.reduce((sum, t) =>
    sum + t.numberOfTeams,
    0
  );
}


export const getCurrentTournamentName = (myTournamentList) => {
  const current = myTournamentList.find(
    (element) => element.status.toLowerCase() === "live"
  );
  return current ? current.name : null;
};




import { Timeline, SportsCricket, Assessment, SportsSoccer, SportsScore, DataObject } from "@mui/icons-material";
import { DashBoardPlayer } from "@/components/UserDashboard/DashboardPlayer";
import { PlayerPerformancePieChart } from "@/components/UserDashboard/PlayerPieChart";
import fetchAllTournaments from "./fetchAllTournaments";
import { use, useEffect } from "react";
import { ManagerStageChart } from "@/components/UserDashboard/ManagerPieChart";
import storage from "@/class/storage";
import fetchAllUsers from "./fetchAllUser";
import { data } from "react-router-dom";

export const getPlayerUserPerformance = (playerPerformances) => {
  const uniqueTournamentIds = new Set();
  const uniqueMatchIds = new Set();

  let totalRuns = 0;
  let totalWickets = 0;
  let totalBalls = 0;
  let totalGoals = 0;
  let totalAssists = 0;
  let yellowCards = 0;
  let redCards = 0;

  playerPerformances.forEach(perf => {
    totalRuns += perf.runsScored || 0;
    totalWickets += perf.wickets || 0;
    totalBalls += perf.ballsFaced || 0;
    totalGoals += perf.goals || 0;
    totalAssists += perf.assists || 0;

    if (perf.cards === "yellow") yellowCards += 1;
    if (perf.cards === "red") redCards += 1;

    uniqueTournamentIds.add(perf.tournamentId);
    uniqueMatchIds.add(perf.matchId);
  });

  const average = playerPerformances.length > 0
    ? parseFloat((totalRuns / playerPerformances.length).toFixed(2))
    : 0;

  return {
    stats: [
      { label: "Total Runs", value: totalRuns, icon: <Timeline />, color: "#2196F3" },
      { label: "Wickets", value: totalWickets, icon: <SportsCricket />, color: "#4CAF50" },
      { label: "Average", value: average, icon: <Assessment />, color: "#FF9800" },
      { label: "Balls Faced", value: totalBalls, icon: <Assessment />, color: "#FF9800" },
      { label: "Goals", value: totalGoals, icon: <SportsSoccer />, color: "#2196F3" },
      { label: "Assists", value: totalAssists, icon: <SportsScore />, color: "#4CAF50" },
      { label: "Yellow Card", value: yellowCards, icon: <Timeline />, color: "#FF9800" },
      { label: "Red Card", value: redCards, icon: <Timeline />, color: "#FF0000" },
    ],
    totalTournaments: uniqueTournamentIds.size,
    totalMatches: uniqueMatchIds.size
  };
};


// Helper function for ordinal labels
const ordinal = (n) => {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const getPerformanceSummary = (playerPerformances, playerId) => {
  const tournamentStatsMap = new Map();

  playerPerformances
    .filter((perf) => perf.playerId === playerId)
    .forEach((perf) => {
      const {
        tournamentId,
        runsScored = 0,
        wickets = 0,
        goals = 0,
        assists = 0,
        cards = "",
      } = perf;

      // Initialize if not present
      if (!tournamentStatsMap.has(tournamentId)) {
        tournamentStatsMap.set(tournamentId, {
          runs: 0,
          wickets: 0,
          goals: 0,
          assists: 0,
          redCards: 0,
          yellowCards: 0,
        });
      }

      const currentStats = tournamentStatsMap.get(tournamentId);

      // Count cards case-insensitively
      const cardStr = cards.toLowerCase();
      const redCardCount = cardStr.includes("red") ? 1 : 0;
      const yellowCardCount = cardStr.includes("yellow") ? 1 : 0;

      tournamentStatsMap.set(tournamentId, {
        runs: currentStats.runs + runsScored,
        wickets: currentStats.wickets + wickets,
        goals: currentStats.goals + goals,
        assists: currentStats.assists + assists,
        redCards: currentStats.redCards + redCardCount,
        yellowCards: currentStats.yellowCards + yellowCardCount,
      });
    });

  // Convert map to array and rename tournament labels
  const result = Array.from(tournamentStatsMap.entries()).map(
    ([_, stats], index) => {
      const tournamentLabel = `My ${ordinal(index + 1)} Tournament`;
      return {
        tournament: tournamentLabel,
        ...stats, // include all stats even if zero
      };
    }
  );

  return result;
};


export const winningAndMatchesCount = (myTeamList, matches) => {
    console.log(myTeamList,matches)
  if (!Array.isArray(myTeamList) || !Array.isArray(matches)) return 0;

  // Create a Set of your team IDs for fast lookup
  const myTeamIds = new Set(myTeamList.map(team => team.id));
  const myTeamNames = new Set(myTeamList.map(team => team.teamName));

  let winCount = 0;
  let matchCount=0;

  for (const match of matches) {
    if (myTeamIds.has(match.team1Id) || myTeamIds.has(match.team2Id)){
        matchCount++
    }
    if (
      match.status === 'completed' &&
      (myTeamIds.has(match.team1Id) || myTeamIds.has(match.team2Id)) &&
      myTeamNames.has(match.winner)
    ) {
      winCount++;
    }
  }

  return {winCount,matchCount};
};


const STAGE_PRIORITY = {
  'Group': 1,
  'Quarter': 2,
  'Semi': 3,
  'Final': 4,
};



export const getStageWiseTournamentPerformance = async (myTeamList, matches, setStageWiseData) => {

  
  if (!Array.isArray(myTeamList) || !Array.isArray(matches)) return [];

  const myTeamIds = new Set(myTeamList.map(team => team.id));
  const myTeamNames = new Set(myTeamList.map(team => team.teamName));

  const stageByTournament = {};

  for (const match of matches) {
    const isMyTeamInvolved = myTeamIds.has(match.team1Id) || myTeamIds.has(match.team2Id);
    if (!isMyTeamInvolved || !match.type || !STAGE_PRIORITY[match.type]) continue;

    const currentStageValue = STAGE_PRIORITY[match.type];
    const tourId = match.tournamentId;

    if (!stageByTournament[tourId] || stageByTournament[tourId].stageValue < currentStageValue) {
      let result = 'Eliminated';

      if (match.type === 'Final') {
        if (myTeamNames.has(match.winner)) {
          result = 'Champion';
        } else {
          result = 'Runner-up';
        }
      }

      stageByTournament[tourId] = {
        stage: match.type,
        stageValue: currentStageValue,
        result,
      };
    }
  }

  // ✅ Proper tournament fetch
  let tournamentNameMap = {};
  try {
    const allTournaments = await fetchAllTournaments();
    tournamentNameMap = Object.fromEntries(
      allTournaments.map(tour => [tour.id, tour.tournamentName || 'Unnamed Tournament'])
    );
  } catch (err) {
    console.error("Failed to fetch tournaments:", err);
  }

  const resultArray = Object.entries(stageByTournament).map(([tournamentId, data]) => ({
    tournament: tournamentNameMap[tournamentId] || 'Unknown Tournament',
    ...data,
  }));

  // ✅ Set data properly
  if (typeof setStageWiseData === 'function') {
    setStageWiseData(resultArray);
  }

  return resultArray;
};
export const getPieDataFromStageWisePerformance = (stageWiseArray) => {
  if (!Array.isArray(stageWiseArray)) return [];

  const countMap = {};

  for (const entry of stageWiseArray) {
    let label = entry.result || entry.stage;

    // Normalize label
    if (label === 'Champion') label = 'Champion';
    else if (label === 'Runner-up') label = 'Runner-up';
    else if (entry.stage === 'Semi') label = 'Semi';
    else if (entry.stage === 'Quarter') label = 'Quarter';
    else if (entry.stage === 'Group') label = 'Group';
    else label = entry.stage || 'Unknown';

    countMap[label] = (countMap[label] || 0) + 1;
  }

  const pieData = Object.entries(countMap).map(([name, value]) => ({
    name,
    value,
  }));

  return pieData;
};




export const UpdateProfile = async (editedInfo) => {
  try {
    const updateData = {
      id: editedInfo.id
    };

    if (editedInfo.name?.trim()) updateData.name = editedInfo.name.trim();
    if (editedInfo.email?.trim()) updateData.email = editedInfo.email.trim();
    if (editedInfo.password) updateData.password = editedInfo.password;
    if (editedInfo.avatar) updateData.avatar = editedInfo.avatar;

    const response = await fetch("/api/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to update user");
    }

    // Update local storage with the new data
    const localUser = storage.get('user');
    const updatedUser = {
      ...localUser,
      name: editedInfo.name || localUser.name,
      email: editedInfo.email || localUser.email,
      password: editedInfo.password || localUser.password
    };
    
    // Save to localStorage
    storage.set('user', updatedUser);

    // Return both success status and updated user data
    return { 
      success: true, 
      data: updatedUser  // Return the updated user data
    };

  } catch (error) {
    console.error("UpdateProfile error:", error.message);
    return { success: false, error: error.message };
  }
};

export const formatDateOnly = (isoString) => {
  const date = new Date(isoString);
  const options = { year: "numeric", month: "long", day: "2-digit" };
  return date.toLocaleDateString("en-US", options);
};

export const formatTimeOnly = (isoString) => {
  const date = new Date(isoString);
  const options = { hour: "numeric", minute: "2-digit", hour12: true };
  return date.toLocaleTimeString("en-US", options);
};
export const getMembershipDuration = (isoString) => {
  const createdDate = new Date(isoString);
  const now = new Date();

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffInMs = now - createdDate;
  const diffInDays = Math.floor(diffInMs / msPerDay);

  if (diffInDays === 0) return "Member for today";
  if (diffInDays === 1) return "Member for 1 day";
  return `Member for ${diffInDays} days`;
};


