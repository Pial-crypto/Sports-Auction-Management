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
    // Exit early if no tournament or hook shouldn't run
    if (!callHook || !tournament) return;

    const fetchData = async () => {
      try {
        // Step 1: Fetch player queue and auction data
        const [playerQueue, auctionData] = await Promise.all([
          fetchPlayerQueueForAuction(),
          getAllAuction()
        ]);

        // Step 2: Create a Set of playerId-tournamentId pairs from auction data
        const auctionSet = new Set(
          auctionData.map(item => `${item.playerId}-${item.tournamentId}`)
        );

        // Step 3: Filter only players from this tournament who are approved
        const filteredPlayerQueueForThisTournament = playerQueue.filter(item =>
          item.tournamentId === tournament.id && item.approved
        );

        // Step 4: Exclude players already in auctionSet
        const finalFilteredPlayers = filteredPlayerQueueForThisTournament.filter(player => {
          const key = `${player.playerId}-${player.tournamentId}`;
          return !auctionSet.has(key);
        });
        // if(finalFilteredPlayers.length === 0){
        //   return(
        //     <>
        //       <div className="text-center">
        //         <h1 className="text-2xl font-bold">No players available for auction in this tournament.</h1>
        //       </div>
        //     </>
        //   )
        //   //console.log("No players available for auction in this tournament.");
        // }

        // Step 5: Set final filtered players
        setPlayer(finalFilteredPlayers);
      } catch (error) {
        console.error("Error fetching player queue or auction data:", error);
      }
    };

    fetchData();
  }, [tournament, callHook, setPlayer]);
};
