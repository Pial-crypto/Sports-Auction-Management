export const fetchAllTeamReq = async () => {

   console.log("I am the fetch all team req outside hook")
    try {
      const response = await fetch('/api/getAllTeamReq', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      console.log(data,"data from fetch all req outside hook")
      if (response.ok) {
        //console.log('Fetched tournaments:', data);
        return data; // Return data for further use
      } else {
        console.error('Error fetching all team req:', data.error || 'Failed to fetch req');
        alert('Error fetching req:', data.error || 'Failed to fetch req')
      }
    } catch (error) {
        alert('Error fetching team req:', error)
      console.error('Error fetching team req:', error);
    }
  };
  
  export default fetchAllTeamReq;
  