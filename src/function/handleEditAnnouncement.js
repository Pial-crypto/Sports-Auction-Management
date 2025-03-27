import storage from "@/class/storage";

export const handleEditAnnouncement = async (announcement, setAnnouncements, setOpenDialog,tournament) => {
  try {
    // Update the announcement in the local state with new data

//console.log(announcement,"announcement from edit announcement")
console.log(tournament,"tournament from edit announcement")
    try {
        const response = await fetch('/api/updateAnnouncement', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...announcement,tournamentId:tournament.id,author:storage.get('user').role}),
        });
    
        const data = await response.json();
        console.log(data,"data from edit announcement")
        if (response.ok) {
            setAnnouncements(prev => 
                prev.map(a => {
                  if (a.id === announcement.id) {
                    return {
                      ...announcement,
                      timestamp: new Date().toISOString(), // Update timestamp
                      status: 'active'
                    };
                  }
                  return a;
                })
              );
              
              setOpenDialog(false);
        } else {
          
          //console.error('Error deleting announcement:', data.error || 'Failed to delete announcement');
          alert('Error editing announcement:', data.error || 'Failed to edit announcement')
          return false
        }
      } catch (error) {
      
        //console.error('Error deleting announcement:', error);
        alert('Error editing announcement:', error)
        return false
      }
    
  } catch (error) {
    console.error('Error editing announcement:', error);
    alert('Error editing announcement');
  }
}; 