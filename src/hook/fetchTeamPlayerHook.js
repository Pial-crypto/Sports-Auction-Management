import fetchAllUsers from "@/function/fetchAllUser";
import { useEffect } from "react";

export const fetchPlayerFilteringUserForTeam = (aucTionObjectArray, setTeamPlayers) => {
  useEffect(() => {
    fetchAllUsers().then((users) => {
      const playerList = users.filter((user) => user.role === "player");
      const auctionPlayerIdSet = new Set(
        aucTionObjectArray.map((item) => item.playerId)
      );
      const filteredPlayersInAuction = playerList.filter((player) =>
        auctionPlayerIdSet.has(player.id)
      );
      setTeamPlayers(filteredPlayersInAuction);
    });
  }, [JSON.stringify(aucTionObjectArray)]); // 👈 fix
};
