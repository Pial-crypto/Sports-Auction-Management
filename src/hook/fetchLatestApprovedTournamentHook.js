import storage from "@/class/storage"
import fetchAllTournaments from "@/function/fetchAllTournaments"
import { useEffect } from "react"

const useFetchLatestApprovedTournamentHook = (setActiveStatus, role, setTournament,setBudgetData=undefined) => {
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
          console.log("Here is the approval data",approvalData)

          if (latestApproval) {
            if (setActiveStatus) {
              setActiveStatus(true);
              storage.set("user", { ...user, activeStatus: true });
            }

            if (setTournament) {
              const tournaments = await fetchAllTournaments();
              const tournament = tournaments.find(t => t.id === latestApproval.tournamentId);
              setTournament(tournament);

              if (setBudgetData) {
                const data=tournament
                // console.log("This is the budget data", data.budget || 50000);
                 setBudgetData((prev) => ({
                   ...prev,
                   totalBudget: data.budget || 50000,
                   spent:data.budget-data.remainingBudget||0,
                   remaining:data.remainingBudget||0,
                   categories: prev.categories.map((category) => {
                     switch (category.id) {
                       case 1:{
                         console.log
                         return {
                           ...category,
                           spent: data.prizeMoneySpent || 0,
                           amount: data.prizeMoney || 0,
                         };
                       }
                       case 2:
                         return {
                           ...category,
                           spent: data.venueSpent || 0,
                           amount: data.venueBudget || 1000,
                         };
                       case 3:
                         return {
                           ...category,
                           spent: data.equipmentSpent || 0,
                           amount: data.equipmentBudget || 1000,
                         };
                       case 4:
                         return {
                           ...category,
                           spent: data.staffSpent || 0,
                           amount: data.staffBudget || 1000,
                         };
                       default:
                         return category;
                     }
                   }),
                 }));
               }

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