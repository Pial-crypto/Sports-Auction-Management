"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
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
import {
  getCurrentTournamentName,
  getPerformanceDataArray,
  getPerformanceSummary,
  getPieDataFromStageWisePerformance,
  getPlayerUserPerformance,
  getStageWiseTournamentPerformance,
  getTotalBudget,
  getTotalParicipatingTeam,
  getTotalSpent,
  handleLogout,
  handleSectionChange,
  renderDashboard,
  renderPerformanceGraphs,
  winningAndMatchesCount,
  getGameTypeCount,
} from "@/function/handleUserDashboard";
import { CommonSnackBar } from "@/components/SnackBar";
import { LogoutDialog } from "@/components/UserDashboard/LogoutDialog";
import { RenderProfile } from "@/components/UserDashboard/Profile";
import { DrawerComponent } from "@/components/UserDashboard/Drawer";
import fetchAllTournamentsHook from "@/hook/fetchTournament";
import { fetchPlayerPerformancesHook } from "@/hook/fetchPlayerPerformancesHook";
import { useFetchAllTeamForManagerHook } from "@/hook/useFetchAllteamForManagerHook";
import { getAllMatchesHook } from "@/hook/getALlMatchesHook";
import { setStageWiseDataHook } from "@/hook/setStageWiseDataHook";

export default function Page() {
  const router = useRouter();
  const user = storage.get("user");
  if (!user) {
    router.push("/auth/login");
    return null;
  }

  const [marketValue, setMarketValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [mvLoading, setMvLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const fetchBasePrice = async () => {
      try {
        const res = await fetch(`/api/getUser/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch player data");
        const data = await res.json();
        setMarketValue(data.basePrice); // <-- Set basePrice as market value
      } catch (error) {
        console.error(error);
      }
    };

    if (user.role === "player" && user.id) {
      fetchBasePrice();
    }
  }, [user]);

  const handleSaveMarketValue = async () => {
    setMvLoading(true);
    try {
      const res = await fetch("/api/player/market-value", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, marketValue }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updatedUser = await res.json();
      storage.set("user", updatedUser);
      setMarketValue(updatedUser.marketValue);
      setSnackbar({ open: true, message: "Market value updated", severity: "success" });
      setEditMode(false);
    } catch (err) {
      setSnackbar({ open: true, message: err.message || "Error updating market value", severity: "error" });
    } finally {
      setMvLoading(false);
    }
  };

  const [selectedSection, setSelectedSection] = useState("Dashboard");
  const [loading, setLoading] = useState(false);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [tournamentList, setTournamentList] = useState([]);
  const [playerPerformances, setPlayerPerformances] = useState([]);
  const [myTeamList, setMyTeamList] = useState([]);
  const [matches, setMatches] = useState([]);
  const [stageWiseData, setStageWiseData] = useState([]);

  // Hooks for data fetching
  if (user.role === "manager") {
    getAllMatchesHook(setMatches);
    useFetchAllTeamForManagerHook(setMyTeamList);
  }

  useEffect(() => {
    if (user.role === "manager") {
      getStageWiseTournamentPerformance(myTeamList, matches, setStageWiseData);
    }
  }, [myTeamList, matches, user.role]);

  if (user.role === "player") {
    fetchPlayerPerformancesHook(setPlayerPerformances);
  }

  if (user.role === "organizer") {
    fetchAllTournamentsHook(setTournamentList);
  }

  const gameTypeCount = getGameTypeCount(tournamentList);
  const summary = getPerformanceSummary(playerPerformances, user.id);
  const userPerformances = getPlayerUserPerformance(playerPerformances);

  useEffect(() => {
    if (!storage.get("user")) {
      router.push("/auth/login");
    }
  }, [router]);

  const totalTrial = myTeamList.length;
  const winningAndMatches = winningAndMatchesCount(myTeamList, matches);
  const approvedTeam = myTeamList.filter((team) => team.approved).length;

  const mockData = {
    player: {
      stats: userPerformances.stats,
      performanceData: summary,
    },
    manager: {
      stats: [
        {
          label: "Total Trial",
          value: totalTrial || 0,
          icon: <AssignmentTurnedIn />,
          color: "#2196F3",
        },
        {
          label: "Success Rate",
          value: (approvedTeam * 100) / totalTrial || 0,
          icon: <Percent />,
          color: "#4CAF50",
        },
        {
          label: "Total Wins",
          value: winningAndMatches.winCount || 0,
          icon: <EmojiEvents />,
          color: "#FF9800",
        },
        {
          label: "Total Matches",
          value: winningAndMatches.matchCount || 0,
          icon: <SportsSoccer />,
          color: "#9C27B0",
        },
        {
          label: "Win Rate",
          value:
            (winningAndMatches.winCount * 100) /
              winningAndMatches.matchCount || 0,
          icon: <Percent />,
          color: "#E91E63",
        },
      ],
      performanceData: stageWiseData,
      pieData: getPieDataFromStageWisePerformance(stageWiseData),
    },
    organizer: {
      stats: [
        {
          label: "Total Spent",
          value: getTotalSpent(tournamentList),
          icon: <AttachMoney />,
          color: "#2196F3",
        },
        {
          label: "Total Budget",
          value: getTotalBudget(tournamentList),
          icon: <AccountBalance />,
          color: "#FF9800",
        },
        {
          label: "Total Tournaments",
          value: tournamentList.length,
          icon: <EmojiEvents />,
          color: "#4CAF50",
        },
        {
          label: "Total Participating Team",
          value: getTotalParicipatingTeam(tournamentList),
          icon: <Group />,
          color: "#A4A13D",
        },
        {
          label: "Current Tournament",
          value: getCurrentTournamentName(tournamentList),
          icon: <EventAvailable />,
          color: "#9C27B0",
        },
      ],
      performanceData: getPerformanceDataArray(tournamentList),
      pieData: [
        { name: "Cricket", value: gameTypeCount["cricket"] },
        { name: "Football", value: gameTypeCount["football"] },
        { name: "Others", value: gameTypeCount["badminton"] || 0 },
      ],
    },
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <DrawerComponent
        user={user}
        handleSectionChange={(section) =>
          handleSectionChange(section, setLogoutDialog, setSelectedSection)
        }
        selectedSection={selectedSection}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
          {selectedSection}
        </Typography>

        {selectedSection === "Dashboard" && (
          <>
            {renderDashboard(user, mockData)}

            {/* Market Value Section for Players */}
            {user.role === "player" && (
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  maxWidth: 400,
                  mx: "auto",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 3,
                    background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: "box-shadow 0.3s",
                  }}
                >
                  <AttachMoney sx={{ fontSize: 48, color: "#4caf50", mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#333" }}>
                    Market Value
                  </Typography>
                  {!editMode ? (
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          mr: 2,
                          fontWeight: "bold",
                          color: "#388e3c",
                          letterSpacing: 1,
                          transition: "color 0.3s",
                        }}
                      >
                        ৳{(parseFloat(marketValue) / 1).toFixed(2)} L
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => setEditMode(true)}
                        sx={{ ml: 1, borderRadius: 2, textTransform: "none" }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => router.push("/predict-options")}
                        sx={{ ml: 1, borderRadius: 2, textTransform: "none", bgcolor: "#4caf50" }}
                      >
                        Predict Base Price
                      </Button>
                    </Box>
                  ) : (
                    <Box sx={{ mt: 1, display: "flex", gap: 1, width: "100%", justifyContent: "center" }}>
                      <TextField
                        type="number"
                        size="small"
                        value={marketValue}
                        onChange={(e) => setMarketValue(e.target.value)}
                        sx={{
                          width: 120,
                          background: "#fff",
                          borderRadius: 1,
                          boxShadow: 1,
                          input: { textAlign: "center", fontWeight: "bold" },
                        }}
                        InputProps={{
                          startAdornment: <AttachMoney sx={{ color: "#4caf50", fontSize: 20, mr: 0.5 }} />,
                        }}
                      />
                      <Button
                        size="small"
                        variant="contained"
                        onClick={handleSaveMarketValue}
                        disabled={mvLoading}
                        sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
                      >
                        Save
                      </Button>
                      <Button
                        size="small"
                        variant="text"
                        onClick={() => {
                          setEditMode(false);
                          // Optional: re-fetch to restore original value
                        }}
                        sx={{ borderRadius: 2, textTransform: "none" }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            )}
          </>
        )}

        {selectedSection === "Statistics" && user && renderPerformanceGraphs(user, mockData)}
        {selectedSection === "Profile" && <RenderProfile user={user} />}

        <LogoutDialog
          setLogoutDialog={setLogoutDialog}
          logoutDialog={logoutDialog}
          handleLogout={() =>
            handleLogout(setLoading, setTimeout, setSnackbar, setLogoutDialog, router)
          }
          loading={loading}
        />

        <CommonSnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
      </Box>
    </Box>
  );
}
