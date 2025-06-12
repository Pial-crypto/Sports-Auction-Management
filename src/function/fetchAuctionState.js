export async function fetchAuctionState(tournamentId) {
  try {
    const response = await fetch("/api/getRedisData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tournamentId })
    });



    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching auction state:", error);
    return null;
  }
}