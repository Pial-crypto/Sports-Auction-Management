const loadAllAnnouncements = async () => {
    try {
      const response = await fetch('/api/getAllAnnouncement', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      console.log(data,"data from get all announcements")
      if (response.ok) {
       
        return data; 
      } else {
        
        console.error('Error fetching all announcements:', data.error || 'Failed to fetch all announcements');
        alert('Error fetching all announcements:', data.error || 'Failed to fetch all announcements')
        return false
      }
    } catch (error) {
    
      console.error('Error fetching all announcements:', error);
      alert('Error fetching all announcements:', error)
      return false
    }
  };
  
  export default loadAllAnnouncements;
  