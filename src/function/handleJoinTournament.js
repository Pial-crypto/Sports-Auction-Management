export const getStatus = (tournament) => {
    // Check if registration deadline exists and is valid
    if (!tournament.registrationDeadline || isNaN(new Date(tournament.registrationDeadline))) {
      return "active"; // Default to active if no valid deadline
    }
    
    // Convert both dates to UTC strings for consistent comparison
    const deadline = new Date(tournament.registrationDeadline).toISOString();
    const now = new Date().toISOString();
    
    return deadline > now ? "active" : "completed";
  };