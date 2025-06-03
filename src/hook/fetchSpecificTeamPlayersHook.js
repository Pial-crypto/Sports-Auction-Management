import { useEffect } from "react";
import getAllAuction from "@/function/getAllAuction";

export const fetchPlayerForSpecificTeamHook = (teamName, teamId, tournament, setAuctionTeam) => {
  useEffect(() => {
    if (!tournament || !teamId || !teamName) return;

    const fetchData = async () => {
      try {
        const auctionData = await getAllAuction();

        const teamAuctions = auctionData.filter(
          (item) =>
            (item.teamId === teamId || item.teamName === teamName) &&
            item.tournamentId === tournament.id &&
            item.soldStatus === true
        );

        setAuctionTeam(teamAuctions);
      } catch (error) {
        console.error("Error fetching auction data:", error);
      }
    };

    fetchData();
  }, [teamName, teamId, tournament, setAuctionTeam]);
};


