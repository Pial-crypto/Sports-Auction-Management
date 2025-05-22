import storage from '@/class/storage';

export const addNewAuction = async (auctionData) => {
  try {
   
    const response = await fetch('/api/addAuction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(auctionData),
    });

    const data = await response.json();
    console.log(data, "Response from addAuction");

    if (response.ok) {
      alert("Auction added successfully!");
      
    } else {
      alert(data.error || "Failed to add auction");
    }
  } catch (error) {
   // console.error("Error adding auction:", error);
    alert("Something went wrong while adding the auction.");
  }
};
