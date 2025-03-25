const fetchAllRules = async () => {
    try {
      const response = await fetch('/api/getAllRules', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      console.log(data,"data from fetch all rules")
      if (response.ok) {
        //console.log('Fetched tournaments:', data);
        return data; // Return data for further use
      } else {
        console.error('Error fetching tournaments:', data.error || 'Failed to fetch tournaments');
        alert('Error fetching tournaments:', data.error || 'Failed to fetch tournaments')
      }
    } catch (error) {
        alert('Error fetching tournaments:', error)
      console.error('Error fetching tournaments:', error);
    }
  };
  
  export default fetchAllRules;
  