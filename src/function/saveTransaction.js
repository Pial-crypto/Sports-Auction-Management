const saveTransaction = async (transaction) => {
    try {
    console.log(transaction,"transaction from save transaction")

      const response = await fetch("/api/saveTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });
  
      const data = await response.json();
     
      console.log(data.message,"data from save transaction")
      if (!response.ok) {
        alert(data.error || "Failed to save transaction");
        throw new Error(data.error || "Failed to save transaction");
      }
  
  }
  
  
    catch (error) {
        alert(error.message || "Failed to save transaction");
      console.error("Save transaction error:", error);
      throw error;
    }
  };
  
  
  export default saveTransaction;
  