const fetchbasePrice = async () => {
    try {
      const response = await fetch("/api/getbaseprice", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        //throw new Error("Failed to fetch base price");
      }
  
      const basePrice = await response.json();
      console.log(basePrice,"basePrice")
      return basePrice.allbaseprice;
    } catch (error) {
      console.error("Error in fetchbasePrice:", error);
      return [];
    }
  };
  
  export default fetchbasePrice;