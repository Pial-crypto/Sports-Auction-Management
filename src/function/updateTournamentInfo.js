export const updateTournamentInfo = async (tournamentData) => {
  try {
    const response = await fetch('/api/updateTournamentInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tournamentData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Tournament info updated:', result);
    return result;
  } catch (error) {
    console.error('Error updating tournament info:', error);
    alert('Failed to update tournament. Please try again.');
    return null;
  }
};
