export const handleDeleteAnnouncement = (announcement,setAnnouncementToDelete,setDeleteDialogOpen) => {
    setAnnouncementToDelete(announcement);
    setDeleteDialogOpen(true);

    //console.log(announcement);
  };
 
  export const confirmDelete = async (setAnnouncements, setDeleteDialogOpen, announcementToDelete) => {
    console.log(announcementToDelete, "announcementToDelete");
  
    try {
      const response = await fetch('/api/deleteAnnouncement', {
        method: 'DELETE', // ✅ `POST` এর পরিবর্তে `DELETE`
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(announcementToDelete), // ✅ শুধু `id` পাঠানো হচ্ছে
      });
  
      if (!response.ok) {
        const data = await response.json(); 
        alert('Error deleting announcement: ' + (data.error || 'Failed to delete announcement'));
        return false;
      }
  
      // ✅ সার্ভার থেকে রেসপন্স সঠিক এলে ডাটা আপডেট করো
      setAnnouncements(prev => prev.filter(a => a.id !== announcementToDelete.id));
      setDeleteDialogOpen(false);
    } catch (error) {
      alert('Error deleting announcement: ' + error.message);
      return false;
    }
  };
  
  