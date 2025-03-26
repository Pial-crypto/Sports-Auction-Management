const updateBudget = async (budget) => {
    try {
   // console.log(budget,"budget from update budget")

      const response = await fetch("/api/updateTournamentBudget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(budget),
      });
  
      const data = await response.json();
     // alert(data.message)
      console.log(data.message,"data from update rule")
      if (!response.ok) {
        alert(data.error || "Failed to update rule");
        throw new Error(data.error || "Failed to update rule");
      }
  
  }
  
  
    catch (error) {
        alert(error.message || "Failed to update budget");
      console.error("Update rule error:", error);
      throw error;
    }
  };
  
  
  export default updateBudget;
  