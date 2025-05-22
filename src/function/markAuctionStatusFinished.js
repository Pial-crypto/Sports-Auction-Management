export const markAuctionStatus = async (tournamentId) => {
    try {
      const response = await fetch("/api/markAuctionFinished", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tournamentId,
          //auctionStatus: status, // e.g., "true", "false", "finished", etc.
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Auction is finished.Go to back")
        console.log("Auction status updated:", data);
        return true
        //{ success: true, data };
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating auction status:", error);
      return { success: false, message: error.message };
    }
  };
  