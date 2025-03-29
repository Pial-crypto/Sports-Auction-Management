import storage from "@/class/storage";
import { savePlayerRequest } from "./savePlayerRequest";
import fetchAllReq from "./getAllreq";

// Check tournament status
export const getStatus = (tournament) => {
  if (!tournament.registrationDeadline || isNaN(new Date(tournament.registrationDeadline))) {
    return "active";
  }
  const deadline = new Date(tournament.registrationDeadline).toISOString();
  const now = new Date().toISOString();
  return deadline > now ? "active" : "completed";
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
  setError
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
      alert("Request submitted successfully");
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
