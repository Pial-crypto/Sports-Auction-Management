import { useEffect } from "react";
import fetchAllUsers from "@/function/fetchAllUser";

// Custom Hook
export const setAllPlayersNameFromIdHook = (setTeamPlayersPerf) => {
  useEffect(() => {
    const fetchAndSet = async () => {
      const users = await fetchAllUsers();
      setTeamPlayersPerf((prev) => {
       
        console.log(prev, "prev");
        console.log(users, "user list");
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
  }, [setTeamPlayersPerf]);
};
