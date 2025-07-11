import storage from "@/class/storage";
import { savePlayerRequest } from "./savePlayerRequest";
import fetchAllReq from "./getAllreq";
import { saveTeamRequest } from "./saveTeamRequest";
import { formatDateOnly } from "./formatDateOnly";

// Check tournament status
export const getStatus = (tournament) => {
  if (!tournament.registrationDeadline || isNaN(new Date(tournament.registrationDeadline))) {
    return "active";
  }
  const deadline = new Date(tournament.registrationDeadline)
  const now = new Date()


const isSameOrFutureDay = formatDateOnly(deadline) >= formatDateOnly(now);

console.log("Date only comparison:", isSameOrFutureDay);
console.log(formatDateOnly(deadline),"Time and date",formatDateOnly(now)," " ,tournament.name)

  return (isSameOrFutureDay && tournament.status.toLowerCase()!='completed') ? "active" : "completed";
};

// Handle join request click
export const handleJoinRequest = (tournamentId, tournaments, setSelectedTournament, setOpenDialog) => {
  const tournament = tournaments.find(t => t.id === tournamentId);
  setSelectedTournament(tournament);
  setOpenDialog(true);
};

// Handle request submission
export const handleSubmitRequest = async (
  playerData,
  selectedTournament,
  setTournaments,
  setFilteredTournaments,
  setOpenDialog,
  setSelectedTournament,
  setError,
  setSnackbar
  
) => {
  try {
    const request = {
      ...playerData,
      tournamentId: selectedTournament.id,
      playerId: storage.get("user").id,
    };

    const data = await savePlayerRequest(request);
    
  

    // Update tournaments state
    if(data){
    //  alert("Request submitted successfully");
    setSnackbar({
  open: true,
  message: 'Request submitted successfully',
  severity: 'success',
});

      const updateTournamentState = (tournaments) =>
        tournaments.map(tournament =>
          tournament.id === selectedTournament.id
            ? { ...tournament, hasRequested: true }
            : tournament
        );
  
      setTournaments(prev => updateTournamentState(prev));
      setFilteredTournaments(prev => updateTournamentState(prev));
  
      setOpenDialog(false);
      setSelectedTournament(null);
    }
    else{
      setError("Request submission failed");
    }
  

  } catch (error) {
    console.error('Failed to submit request:', error);
    setError('Failed to submit request. Please try again.');
  }
};


export const handleSubmitTeamRequest = async (
  teamData,
  selectedTournament,
  setTournaments,
  setFilteredTournaments,
  setOpenDialog,
  setSelectedTournament,
  setError,
  setSnackbar
) => {
  try {
    const request = {
      ...teamData,
      tournamentId: selectedTournament.id,
      managerId: storage.get("user").id,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    console.log('Submitting team request:', request);

    const data = await saveTeamRequest(request);
    
    if(data){
      console.log('Team request submitted successfully:', data);
     // alert("Team registration request submitted successfully");
     setSnackbar({
  open: true,
  message: 'Team registration request submitted successfully',
  severity: 'success',
});
      
      const updateTournamentState = (tournaments) =>
        tournaments.map(tournament =>
          tournament.id === selectedTournament.id
            ? { ...tournament, hasRequested: true }
            : tournament
        );
  
      setTournaments(prev => updateTournamentState(prev));
      setFilteredTournaments(prev => updateTournamentState(prev));
  
      setOpenDialog(false);
      setSelectedTournament(null);
    } else {
      console.error('Failed to submit team request');
      setError("Team registration request submission failed");
    }
  } catch (error) {
    console.error('Failed to submit team request:', error);
    setError('Failed to submit team registration request. Please try again.');
  }
};
