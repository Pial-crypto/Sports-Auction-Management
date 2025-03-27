import storage from "@/class/storage";

export const handleSaveAnnouncement = async(newAnnouncement,setAnnouncements,setOpenDialog,tournament) => {
    console.log(tournament,"tournament")
    const announcement = {
      ...newAnnouncement,
     
      timestamp: new Date().toISOString(),
    
      tournamentId: tournament.id, // Or get from user context
      author: storage.get('user').role
    };
  
        try {
          const response = await fetch('/api/saveNewAnnouncement', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(announcement),
          });
      
          const data = await response.json();
         // console.log(data,"data from save new announcement")
         // console.log(data,"data from get transaction")
          if (response.ok) {
         //  alert("Announcement saved successfully")
         
    setAnnouncements(prev => [announcement, ...prev]);
    setOpenDialog(false);
           
          } 
          else {
            
         
            alert('Error saving announcement')
            return false
          }
        } catch (error) {
        
        //  console.error('Error saving announcement:', error);
          alert('Error saving announcement:', error)

        }
  
      
     
      
    
  };