import { useEffect } from "react";
import { fetchPlayerQueueForAuction } from "@/function/fetchPlayerQueueForAuction";
import getAllAuction from "@/function/getAllAuction";
export const useFetchPlayerQueueForAuctionHook = (tournament, setPlayer, callHook) => {
  console.log(tournament)

  useEffect(() => {
    if (!callHook || !tournament || !setPlayer) return;

    const fetchData = async () => {
      try {
        const [playerQueue, auctionData] = await Promise.all([
          fetchPlayerQueueForAuction(),
          getAllAuction()
        ]);

        const filteredPlayerQueueForThisTournament = playerQueue.filter(
          item => item.tournamentId === tournament.id && item.approved
        );

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

        const finalFilteredPlayers = filteredPlayerQueueForThisTournament.map(player => {
          const soldInfo = soldPlayerMap.get(player.playerId);
          return soldInfo ? { ...player, ...soldInfo } : player;
        });

        setPlayer(finalFilteredPlayers);
      } catch (error) {
        console.error("Error fetching player queue or auction data:", error);
      }
    };

    fetchData();
  }, [tournament, callHook, setPlayer]);
};
