const getTransactionList = async () => {
    try {
      const response = await fetch('/api/getTransaction', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      console.log(data,"data from get transaction")
      if (response.ok) {
       
        return data; // Return data for further use
      } else {
        
        console.error('Error fetching transaction lists:', data.error || 'Failed to fetch tournaments');
        alert('Error fetching transaction lists:', data.error || 'Failed to fetch tournaments')
        return false
      }
    } catch (error) {
    
      console.error('Error fetching transaction lists:', error);
      alert('Error fetching transaction lists:', error)
      return false
    }
  };
  
  export default getTransactionList;
  