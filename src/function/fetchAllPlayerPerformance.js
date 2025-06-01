export async function getAllPlayerPerformance() {
  try {
    const response = await fetch('/api/getAllPlayerPerformances', {
      method: 'GET',
    });

  

    const data = await response.json();
    //console.log(data ,'for all player per')
    return data.performances; // returns array of performance records
  } catch (error) {
    console.log(error,'i am error')
    
    console.error("Error fetching performances:", error);
    return [];
  }
}
