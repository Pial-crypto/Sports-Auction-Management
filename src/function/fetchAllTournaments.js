const fetchAllTournaments = async () => {
    try {
      const response = await fetch('/api/gettournamentDetails', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
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
  
  export default fetchAllTournaments;
  