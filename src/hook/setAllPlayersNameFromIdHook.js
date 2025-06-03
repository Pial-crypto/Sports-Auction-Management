import { useEffect } from "react";
import fetchAllUsers from "@/function/fetchAllUser";

// Custom Hook
export const setAllPlayersNameFromIdHook = (playerPerformances,setTeamPlayersPerf) => {
useEffect(() => {
  if (playerPerformances.length === 0) return;
  

  // Check if names already added
  const hasNames = playerPerformances.every(perf => perf.playerName);
  if (hasNames) return;  // Prevent infinite loop

  const fetchAndSet = async () => {
    const users = await fetchAllUsers();
    setTeamPlayersPerf((prev) => {
      return prev.map((perf) => {
        const user = users.find((u) => u.id === perf.playerId);
        return {
          ...perf,
          playerName: user ? user.name : "Unknown",
        };
      });
    });
  };

  fetchAndSet();
}, [playerPerformances, setTeamPlayersPerf]);

};
