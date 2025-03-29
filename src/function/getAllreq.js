export const fetchAllReq = async () => {
    try {
      const response = await fetch('/api/getAllReq', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      console.log(data,"data from fetch all req")
      if (response.ok) {
        //console.log('Fetched tournaments:', data);
        return data; // Return data for further use
      } else {
        console.error('Error fetching all req:', data.error || 'Failed to fetch req');
        alert('Error fetching req:', data.error || 'Failed to fetch req')
      }
    } catch (error) {
        alert('Error fetching req:', error)
      console.error('Error fetching req:', error);
    }
  };
  
  export default fetchAllReq;
  