import { useEffect } from "react";
import fetchCurrentTournament from "@/function/fetchCurrentTournament";

export const fetchCurrentTournamentHook = (setTournament,setBudgetData) => {
    useEffect(() => {
        fetchCurrentTournament().then((data) => {
       
      console.log("This is the data",data)
     if(setTournament) setTournament(data)
     // console.log("This is the budget data",data.budget)


     
     if (setBudgetData) {
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
    });

  }, []);
}