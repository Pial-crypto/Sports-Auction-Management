import storage from "@/class/storage"
import fetchAllTournaments from "@/function/fetchAllTournaments"
import { useEffect } from "react"

const useFetchLatestApprovedTournamentHook = (setActiveStatus, role, setTournament) => {
  useEffect(() => {
    const user = storage.get("user");
    
    const asyncFunction = async () => {
      try {
        const requestBody = {
          [role === 'player' ? 'playerId' : 'managerId']: storage.get('user').id
        };

        const approvalResponse = await fetch('/api/findLatestApprovalForPlayer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        if (approvalResponse.ok) {
          const approvalData = await approvalResponse.json();
          const { latestApproval } = approvalData;

          if (latestApproval) {
            if (setActiveStatus) {
              setActiveStatus(true);
              storage.set("user", { ...user, activeStatus: true });
            }

            if (setTournament) {
              const tournaments = await fetchAllTournaments();
              const tournament = tournaments.find(t => t.id === latestApproval.tournamentId);
              setTournament(tournament);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching latest approval:', error);
      }
    };

    asyncFunction();
  }, [role, setActiveStatus, setTournament]);
};

export default useFetchLatestApprovedTournamentHook;