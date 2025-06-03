"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
} from "@mui/material";
import {
  AttachMoney,
  Group,
  Assessment,
  AccountBalance,
  EmojiEvents,
  EventAvailable,
  AssignmentTurnedIn,
  Percent,
  SportsSoccer,
} from "@mui/icons-material";
import storage from "@/class/storage";
import {  getCurrentTournamentName, getPerformanceDataArray, getPerformanceSummary, getPieDataFromStageWisePerformance, getPlayerUserPerformance, getStageWiseTournamentPerformance, getTotalBudget, getTotalParicipatingTeam, getTotalSpent, handleLogout, handleSectionChange, renderDashboard, renderPerformanceGraphs, winningAndMatchesCount } from "@/function/handleUserDashboard";
import { CommonSnackBar } from "@/components/SnackBar";
import { LogoutDialog } from "@/components/UserDashboard/LogoutDialog";
import { RenderProfile } from "@/components/UserDashboard/Profile";
import { DrawerComponent } from "@/components/UserDashboard/Drawer";
import fetchAllTournamentsHook from "@/hook/fetchTournament";
import { getGameTypeCount } from "@/function/handleUserDashboard";
import { fetchPlayerPerformancesHook } from "@/hook/fetchPlayerPerformancesHook";
import { useFetchAllTeamForManagerHook } from "@/hook/useFetchAllteamForManagerHook";
import { getAllMatchesHook } from "@/hook/getALlMatchesHook";
import { data } from "react-router-dom";
import { setStageWiseDataHook } from "@/hook/setStageWiseDataHook";




export default function Page() {
  const router = useRouter();
 

  const user=storage.get('user')
  if(!user){
    router.push('/auth/login')
    return
  }

  //console.log(user)
  const [selectedSection, setSelectedSection] = useState("Dashboard");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [logoutDialog, setLogoutDialog] = useState(false);
const [tournamentList,setTournamentList]=useState([])
const [playerPerformances,setPlayerPerformances]=useState([]);
const [myTeamList,setMyTeamList]=useState([])
const [matches,setMatches]=useState([]);
const [stageWiseData,setStageWiseData]=useState([])

if(user.role==='manager') getAllMatchesHook(setMatches)


if(user.role==='manager'){useFetchAllTeamForManagerHook(setMyTeamList)
  
//getStageWiseTournamentPerformance(myTeamList,matches,setStageWiseData)
//setStageWiseDataHook(setStageWiseData,myTeamList,matches)
}
useEffect(() => {
    getStageWiseTournamentPerformance(myTeamList, matches, setStageWiseData);
  }, [myTeamList, matches]);

//console.log(myTeamList,"My big tem list")

//console.log("Stage wise data baler dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",stageWiseData)
if(user.role==='player') fetchPlayerPerformancesHook(setPlayerPerformances)

if(user.role==='organizer')fetchAllTournamentsHook(setTournamentList)
  
const gameTypeCount=getGameTypeCount(tournamentList)
selectedSection === "Dashboard"

const summary = getPerformanceSummary(playerPerformances, user.id);
//console.log(summary,"My summary");

const userPerformances=getPlayerUserPerformance(playerPerformances)

console.log("Player performances",userPerformances)
  useEffect(() => {
    if (!storage.get("user")) {
      router.push("/login");
    }
  }, [router]);

  console.log("User",user)
 const totalTrial=myTeamList.length
 const winninAndMatches=winningAndMatchesCount(myTeamList,matches)
 const approvedTeam=myTeamList.filter((team)=>team.approved).length
const mockData = {
  player: {
   
      stats: userPerformances.stats,
      performanceData:summary,
  

  
  },
 
  manager: {
 
stats:[
  {
    label: "Total Trial",
    value: totalTrial || 0,
    icon: <AssignmentTurnedIn />,
    color: "#2196F3"
  },
  {
    label: "Success Rate",
    value: (approvedTeam * 100 / totalTrial).toFixed(2) || 0,
    icon: <Percent />,
    color: "#4CAF50"
  },
  {
    label: "Total Wins",
    value: winninAndMatches.winCount || 0,
    icon: <EmojiEvents />,
    color: "#FF9800"
  },
  {
    label: "Total Matches",
    value: winninAndMatches.matchCount || 0,
    icon: <SportsSoccer />,
    color: "#9C27B0"
  },
  {
    label: "Win Rate",
    value: ((winninAndMatches.winCount * 100) / winninAndMatches.matchCount || 0).toFixed(2),
    icon: <Percent />,
    color: "#E91E63"
  },
],

    performanceData: stageWiseData,
    pieData: getPieDataFromStageWisePerformance(stageWiseData)
  },
  organizer: {
    stats: [
 {
    label: "Total Spent",
    value: getTotalSpent(tournamentList),
    icon: <AttachMoney />,
    color: "#2196F3"
  },
  {
    label: "Total Budget",
    value: getTotalBudget(tournamentList),
    icon: <AccountBalance />, // or keep Assessment
    color: "#FF9800"
  },
  {
    label: "Total Tournaments",
    value: tournamentList.length,
    icon: <EmojiEvents />,
    color: "#4CAF50"
  },
  {
    label: "Total Participating Team",
    value: getTotalParicipatingTeam(tournamentList),
    icon: <Group />,
    color: "#A4A13D"
  },
  {
    label: "Current Tournament",
    value: getCurrentTournamentName(tournamentList),
    icon: <EventAvailable />,
    color: "#9C27B0"
  }

    ],
  performanceData:getPerformanceDataArray(tournamentList),
    pieData: [
      { name: 'Cricket', value: gameTypeCount['cricket'] },
      { name: 'Football', value: gameTypeCount['football'] },
      { name: 'Others', value: gameTypeCount['badminton'] ||0 },
    ],
  }
};










  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
    <DrawerComponent user={user} handleSectionChange={(section)=>handleSectionChange(section,setLogoutDialog,setSelectedSection)} selectedSection={selectedSection}></DrawerComponent>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          {selectedSection}
        </Typography>

        {selectedSection === "Dashboard" && (
          <>
       
            {renderDashboard(user,mockData)}
            <Box sx={{ mt: 4 }}>
          
            </Box>
          </>
        )}
 
        {selectedSection === "Statistics" && user && renderPerformanceGraphs(user,mockData)} 
         {selectedSection === "Profile" && <RenderProfile user={user}></RenderProfile>}

        {/* Logout Dialog */}
       <LogoutDialog setLogoutDialog={setLogoutDialog} logoutDialog={logoutDialog} handleLogout={()=>handleLogout(setLoading,setTimeout,setSnackbar,setLogoutDialog,router)} loading={loading}></LogoutDialog>

        {/* Snackbar */}
      <CommonSnackBar snackbar={snackbar} setSnackbar={setSnackbar}></CommonSnackBar>
      </Box>
    </Box>
  );
}