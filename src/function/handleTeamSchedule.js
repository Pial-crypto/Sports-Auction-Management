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
export const handleSavePractice = async (
  editedPractice,
  setPracticeSessions,
  selectedPractice,
  setEditDialogOpen,
  setSelectedPractice,
  tournament,
  myTeam,
  setSnackbar
) => {
  // List of required fields
  const requiredFields = [
   
    "coach",
    "date",
    "duration",
    "focus",
    "time",
    "title",
    "venue"
  ];

  // Check for missing fields
  const missingFields = requiredFields.filter(field => !editedPractice[field]);

  if (missingFields.length > 0) {
   // alert(`Missing required fields: ${missingFields.join(", ")}`);
    setSnackbar({
      open: true,
      message: `Missing required fields: ${missingFields.join(", ")}`,
      severity: "error",
    });
    return;
  }

  try {
  if (selectedPractice) {
  try {
    // First, update on the backend
    const res = await fetch("/api/editSession", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedPractice.id,
        ...editedPractice,
      }),
    });

    const data = await res.json();
    console.log("Server response:", data);

    if (!res.ok) {

      alert(data.error || "Failed to update session");
      return;
    }

    // Then, update in local state
    setPracticeSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === selectedPractice.id
          ? { ...session, ...editedPractice }
          : session
      )
    );
    setSnackbar({
      open: true,
      message: "Practice session updated successfully",
      severity: "success",
    });

    //console.log("Practice updated:", data.practice);
  } catch (error) {
    console.error("Error updating practice:", error);
    alert("Something went wrong while updating practice session.");
    return;
  }
}
 else {
      // Send POST request to backend
      const response = await fetch("api/addPracticeSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...editedPractice,
          tournamentId: tournament.id,
          teamId: myTeam.id

        })
      });

      const result = await response.json();
      //console.log("Server response:", result);

      if (!response.ok) {
        alert(result.error || "Failed to add practice session");
        throw new Error(result.error || "Failed to add practice session");
      }

      // Add new practice to local state
      setPracticeSessions(prevSessions => [

         {
          ...result.practice,
          type: "practice"
        },
        ...prevSessions
       
      ]);

      setSnackbar({
        open: true,
        message: "Practice session added successfully",
        severity: "success",
      });
    }

    // Reset dialog and selection
    setEditDialogOpen(false);
    setSelectedPractice(null);

  } catch (error) {
    console.error("Error saving practice session:", error);
    setSnackbar({
      open: true,
      message: "Something went wrong while saving practice session",
      severity: "error",
    });
   // alert("Something went wrong while saving. Please try again.");
  }
};




   export const handleEditPractice = (practice,setSelectedPractice,setEditDialogOpen) => {
    setSelectedPractice(practice);
    setEditDialogOpen(true);
  };


  export const getThisTeamAndTournamentPracticeSessions = async(tournament,myTeam) => {
     try {
    const res = await fetch("/api/getAllPracticeSession");

    if (!res.ok) {
      throw new Error("Failed to fetch practice sessions");
    }

    const data = await res.json();
    const allSessions = data.practices;
if(tournament && myTeam){
    // Filter for this team and tournament
    const filtered = allSessions.filter(session =>
      session.tournamentId === tournament.id &&
      session.teamId === myTeam.id
    );

    return filtered;
    }
  } catch (error) {
    console.error("Error fetching practice sessions:", error);
    return [];
  }
  }

  export const handleDeleteSession = (session,setSessionToDelete,setDeleteDialogOpen) => {
    setSessionToDelete(session);
    setDeleteDialogOpen(true);
  };


export const handleConfirmDelete = async (
  setPracticeSessions,
  setDeleteDialogOpen,
  setSnackbar,
  sessionToDelete
) => {
  try {
    const res = await fetch("/api/deleteSession", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: sessionToDelete.id }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to delete practice session");
    }

    // Update local state
    setPracticeSessions(prevSessions =>
      prevSessions.filter(s => s.id !== sessionToDelete.id)
    );

    setSnackbar({
      open: true,
      message: "Practice session deleted successfully",
      severity: "success",
    });
  } catch (error) {
    console.error("Delete error:", error);
    setSnackbar({
      open: true,
      message: "Failed to delete practice session",
      severity: "error",
    });
  } finally {
    setDeleteDialogOpen(false);
  }
};
