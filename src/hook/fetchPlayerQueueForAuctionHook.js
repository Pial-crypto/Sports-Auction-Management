import { useEffect } from "react";
import { fetchPlayerQueueForAuction } from "@/function/fetchPlayerQueueForAuction";
import getAllAuction from "@/function/getAllAuction";

/**
 * Custom hook to fetch and filter players for auction queue
 * @param {Object} tournament - Tournament object
 * @param {Function} setPlayer - Setter function to update the filtered player list
 * @param {Boolean} callHook - Condition to trigger the hook
 */
export const fetchPlayerQueueForAuctionHook = (tournament, setPlayer, callHook) => {
  useEffect(() => {
    if (!callHook || !tournament) return;

    const fetchData = async () => {
      try {
        // Step 1: Fetch player queue and auction data
        const [playerQueue, auctionData] = await Promise.all([
          fetchPlayerQueueForAuction(),
          getAllAuction()
        ]);

        // Step 2: Filter only approved players for this tournament
        const filteredPlayerQueueForThisTournament = playerQueue.filter(
          item => item.tournamentId === tournament.id && item.approved
        );

        // Step 3: Create a Set of sold players and a Map for quick lookup of auction data
        const soldPlayerMap = new Map();
        for (const auction of auctionData) {
          if (
            auction.tournamentId === tournament.id &&
            auction.soldStatus === true
          ) {
            soldPlayerMap.set(auction.playerId, {
              status: "sold",
              finalBid: auction.amount,
              soldTo: auction.teamName
            });
          }
        }

        // Step 4: Split the player queue into sold and unsold
        const finalFilteredPlayers = filteredPlayerQueueForThisTournament.map(player => {
          const soldInfo = soldPlayerMap.get(player.playerId);
          if (soldInfo) {
            return {
              ...player,
              ...soldInfo
            };
          }
          return player; // regular player without sold info
        });

        // Step 5: Set the final player list
        setPlayer(finalFilteredPlayers);
      } catch (error) {
        console.error("Error fetching player queue or auction data:", error);
      }
    };

    fetchData();
  }, [tournament, callHook, setPlayer]);
};
