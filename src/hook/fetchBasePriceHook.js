import fetchbasePrice from "@/function/fetchBasePlayer";
import { useEffect } from "react";

export const fetchBasPriceHook = (players, setPlayers) => {
  useEffect(() => {
    if (!players || players.length === 0) return;

    fetchbasePrice()
      .then((basePrices) => {
        console.log("Base prices fetched:", basePrices);

        const updatedPlayers = players.map((player) => {
          const match = basePrices.find((bp) => bp.id === player.playerId);

          console.log("Matching base price for player:", player, match);
          return {
            ...player,
            basePrice: match?.basePrice || 0,
          };
        });

        // Compare old and updated players
        const isDifferent = updatedPlayers.some((p, idx) => p.basePrice !== players[idx]?.basePrice);

        if (isDifferent) {
          console.log("Updated players with base prices:", updatedPlayers);
          setPlayers(updatedPlayers);
        } else {
          console.log("No update needed: all players already have base prices");
        }
      })
      .catch((error) => {
        console.error("Error fetching base price:", error);
      });
  }, [players]);
};
