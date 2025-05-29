import { Event,CheckCircle,Cancel,SportsCricket } from "@mui/icons-material";
  export const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return <Event />;
      case 'completed':
        return <CheckCircle />;
      case 'cancelled':
        return <Cancel />;
      case 'live':
        return <SportsCricket />;
      default:
        return <Event />;
    }
  };


    export const handleAddSession = (setSelectedPractice,setEditDialogOpen) => {
    setSelectedPractice(null);
    setEditDialogOpen(true);
  };





    export const getFilteredEvents = (selectedSection,scheduleData,myTeam) => {

      
      switch(selectedSection) {
        case 'live':
          return scheduleData.filter(match => match.status === 'live' && (match.team1Id===myTeam.id || match.team2Id===myTeam.id));
        case 'upcoming':
          return scheduleData.filter(match => match.status === 'upcoming' && (match.team1Id===myTeam.id || match.team2Id===myTeam.id));
        case 'completed':
          return scheduleData.filter(match => match.status === 'completed' && (match.team1Id===myTeam.id || match.team2Id===myTeam.id));
        case 'practice':
          return scheduleData.filter(match => match.type === 'practice');
        default:
          return scheduleData.filter(match => match.status === 'live' && (match.team1Id===myTeam.id || match.team2Id===myTeam.id));
      }
    };


      // Add save handler
  export const handleSavePractice = (
  editedPractice,
  setPracticeSessions, // Changed from setSchedulData
  selectedPractice,
  setEditDialogOpen,
  setSelectedPractice
) => {
  setPracticeSessions(prevSessions => {
    if (selectedPractice) {
      // Update existing practice
      return prevSessions.map(session => 
        session.id === selectedPractice.id 
          ? { ...session, ...editedPractice }
          : session
      );
    } else {
      // Add new practice
      const newPractice = {
        id: Date.now(),
        type: 'practice',
        status: 'upcoming',
        ...editedPractice
      };
      return [...prevSessions, newPractice];
    }
  });
  
  setEditDialogOpen(false);
  setSelectedPractice(null);
};


   export const handleEditPractice = (practice,setSelectedPractice,setEditDialogOpen) => {
    setSelectedPractice(practice);
    setEditDialogOpen(true);
  };
