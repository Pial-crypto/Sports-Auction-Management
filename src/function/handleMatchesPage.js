import { COLORS } from "@/style/Matches";
import { updateTournamentInfo } from "./updateTournamentInfo";


    export const getFilteredMatches = (tabValue,matches) => {
      console.log("Filtering matches with tabValue:", matches);
    switch(tabValue) {
      case 0:
        return matches.filter(match => match.status === 'live');
      case 1:
        return matches.filter(match => match.status === 'upcoming');
      case 2:
        return matches.filter(match => match.status === 'completed');
      default:
        return matches;
    }
  };





   export const handleCreateMatch = (setEditMatch,setCreateDialogOpen,newMatchTemplate) => {
    setEditMatch({ ...newMatchTemplate });
    setCreateDialogOpen(true);

    
  };




 export const handleViewDetails = (match,setSelectedMatch,setViewDialogOpen) => {
    setSelectedMatch(match);
    setViewDialogOpen(true);
  };



  export const handleEditMatch = (match,setEditMatch,setEditDialogOpen) => {
    setEditMatch({...match});
    setEditDialogOpen(true);


    
  };




  export const handleDeleteMatch = (match
    ,setSelectedMatch,setDeleteDialogOpen
  ) => {
    setSelectedMatch(match);
    setDeleteDialogOpen(true);
  };




  export const handleMatchDetails = (match
    ,setSelectedMatch,setDetailsDialogOpen
  ) => {
    setSelectedMatch(match);
    setDetailsDialogOpen(true);
  };



export const handleSaveEdit = async (
  editMatch,
  matches,
  setMatches,
  setEditDialogOpen,
  tournament
) => {
  const cricketScorePattern = /^\d{1,3}\/\d{1,2}$/;
  const footballScorePattern = /^\d+$/;

  const team1Score = editMatch.team1Score?.trim();
  const team2Score = editMatch.team2Score?.trim();
  const matchType = tournament?.gameType?.toLowerCase();

  function isValidScore(score, type) {
    if (score === "Not started yet") return true;
    if (type === "cricket") return cricketScorePattern.test(score);
    if (type === "football") return footballScorePattern.test(score);
    return false;
  }

  // Score validation
  if (!isValidScore(team1Score, matchType) || !isValidScore(team2Score, matchType)) {
    alert(matchType === "cricket"
      ? "Invalid score format for cricket. Use format like 123/7 or 'Not started yet'."
      : "Invalid score format. Use number like 2 or 'Not started yet'.");
    return;
  }

  // Total points check
  if (!editMatch.totalPoints || Number(editMatch.totalPoints) <= 0) {
    alert("Total points cannot be empty or zero.");
    return;
  }

  // At least one valid score must exist
  if (team1Score === "Not started yet" && team2Score === "Not started yet") {
    alert("At least one team must have a valid score.");
    return;
  }

  if (editMatch.status === "completed" &&
    (team1Score === "Not started yet" || team2Score === "Not started yet")) {
    alert("Both teams must have valid scores if the match is completed.");
    return;
  }

  // Man of the match check
  if (!editMatch.manOfTheMatchName || !editMatch.manOfTheMatchId || editMatch.manOfTheMatchId === 'none') {
    alert("Select a valid Man of the Match.");
    return;
  }

  // Basic field checks
  if (!team1Score || !team2Score) {
    alert("Enter score for both teams.");
    return;
  }

  if (!editMatch.venue) {
    alert("Enter the match venue.");
    return;
  }

  if (editMatch.status === "upcoming") {
    alert("Change match status to 'live' or 'completed' to save.");
    return;
  }

  if (editMatch.status === "live") {
    if (!editMatch.currentOver && editMatch.currentOver !== 0) {
      alert("Enter current over.");
      return;
    }
    if (!editMatch.overs && editMatch.overs !== 0) {
      alert("Enter total overs.");
      return;
    }
    if (Number(editMatch.currentOver) > Number(editMatch.overs)) {
      alert("Current over cannot exceed total overs.");
      return;
    }
  }
  console.log("Edit match data before saving:", editMatch);

  // Team performance validations
  if (!editMatch.team1Perf || Object.keys(editMatch.team1Perf).length === 0) {
    alert("Enter Team 1's performance.");
    return;
  }
  // handleTeamPerformanceSave(editMatch.team1Perf, tournament, editMatch.team1Id, editMatch.id);

  if (!editMatch.team2Perf || Object.keys(editMatch.team2Perf).length === 0) {
    console.log("Team 2 performance is empty:", editMatch.team2Perf);
    alert("Enter Team 2's performance.");

    return;
  }
  handleTeamPerformanceSave(editMatch.team2Perf, tournament, editMatch.team2Id, editMatch.id);

  // All validations passed: Submit match update
  try {
    const response = await fetch('/api/updateMatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editMatch),
    });

    const data = await response.json();

    if (response.ok) {
      setMatches(matches.map(m => m.id === editMatch.id ? editMatch : m));
      setEditDialogOpen(false);
      alert("Match updated successfully.");
    } else {
      alert("Error updating match: " + (data?.error || "Unknown error"));
    }
  } catch (error) {
    console.error("Update error:", error);
    alert("Something went wrong while updating the match.");
    setEditDialogOpen(false);
  }
};


const handleTeamPerformanceSave = (teamPerfObj, tournament, teamId, matchId) => {
  if (!teamPerfObj || typeof teamPerfObj !== 'object' || Object.keys(teamPerfObj).length === 0) {
    alert("Team performance is required. Please enter valid data.");
    return;
  }

  // Convert object to array of { playerId, ...performance }
  const teamPerfArray = Object.entries(teamPerfObj).map(([playerId, perf]) => ({
    playerId,
    ...perf,
  }));

  console.log("Team performance data:", teamPerfArray);

  teamPerfArray.forEach((perf) => {
    savePlayerPerformance(perf, tournament, teamId, matchId);
  });
};




const savePlayerPerformance = async (editMatchPerf, tournament, teamId, matchId) => {
  const {
    playerId,
    ballsFaced,
    overs,
    runsScored,
    wickets,
    goals,
    assists,
    cards,
  } = editMatchPerf;

  const tournamentId = tournament.id;
  const sport = tournament.gameType;

  if (!playerId || !matchId || !teamId || !tournamentId) {
    alert("Missing required identifiers: playerId, matchId, teamId, or tournamentId.");
    return;
  }

  if (sport === "cricket") {
    if (ballsFaced === undefined || ballsFaced === null || ballsFaced === "" || ballsFaced < 0) {
      alert("Balls faced must be a non-negative number for cricket.");
      return;
    }
    if (overs === undefined || overs === null || overs === "" || overs < 0) {
      alert("Overs must be a non-negative number for cricket.");
      return;
    }
    if (runsScored === undefined || runsScored === null || runsScored === "" || runsScored < 0) {
      alert("Runs scored must be a non-negative number for cricket.");
      return;
    }
    if (wickets === undefined || wickets === null || wickets === "" || wickets < 0) {
      alert("Wickets must be a non-negative number for cricket.");
      return;
    }
  }

  if (sport === "football") {
    if (goals === undefined || goals === null || goals === "" || goals < 0) {
      alert("Goals must be a non-negative number for football.");
      return;
    }
    if (assists === undefined || assists === null || assists === "" || assists < 0) {
      alert("Assists must be a non-negative number for football.");
      return;
    }
    if (!cards || typeof cards !== "string") {
      alert("Cards field is required for football and must be a string.");
      return;
    }
  }

  try {
    const response = await fetch("/api/addPlayerPerformance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tournamentId,
        teamId,
        playerId,
        matchId,
        ballsFaced: ballsFaced || 0,
        overs: overs || 0,
        runsScored: runsScored || 0,
        wickets: wickets || 0,
        goals: goals || 0,
        assists: assists || 0,
        cards: cards || "none",
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message || "Performance saved successfully.");
    } else {
      alert(result.error || "Failed to save performance.");
    }
  } catch (error) {
    console.error("Error saving player performance:", error);
    alert("Something went wrong while saving performance.");
  }
};





    const stagePriority={
      'League Match':1,
     'Quarter Final':2,
     'Semi Final':3,
     'Final':4,
    }




  export const handleSaveNew =async (
    newMatch,matches,setMatches,setCreateDialogOpen
  ) => {

    const available=['League Match','Quarter Final','Semi Final','Final']

  let maxStage=getCurrentStage(matches)

   

    console.log(maxStage,"Our max stage")

   
if(maxStage!='Final' &&  stagePriority[newMatch.type]>=stagePriority[maxStage]){
 try {
    const response = await fetch('/api/createMatch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMatch),
    });

    const data = await response.json();
    newMatch.id = data.match.id; // Assuming the API returns the new match ID

    if (response.ok) {
      // Optional: Notify user
      // alert("Match created successfully");

     setMatches([newMatch,...matches]);

      // Close the modal or dialog
  setCreateDialogOpen(false);
    } else {
      alert('Error creating match');
    }
  } catch (error) {
    console.error('Error creating match:', error);
    alert('Error creating match: ' + error.message);
  }



}

else{
  alert(`The tournament is already in the ${maxStage} stage`)
}

 
  };


  export const getCurrentStage=(matches)=>{
  

     let maxStage= 'League Match';

    matches.forEach((match)=>{

if(stagePriority[match.type]>stagePriority[maxStage]){
maxStage=match.type;
}
    })

    return maxStage;
  }




export const handleConfirmDelete = async (
  selectedMatch,
  matches,
  setMatches,
  setDeleteDialogOpen
) => {
  if (!selectedMatch?.id) {
    alert("Invalid match selected for deletion.");
    return;
  }

  try {
    const response = await fetch("/api/deleteMatch", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedMatch),
    });

    const result = await response.json();
    console.log("Delete response:", result);

    if (response.ok) {
      // Remove deleted match from UI
      setMatches(matches.filter((m) => m.id !== selectedMatch.id));
      alert("Match deleted successfully.");
    } else {
      alert("Failed to delete match: " + result.error);
    }
  } catch (error) {
    console.error("Error deleting match:", error);
    alert("Error deleting match: " + error.message);
  } finally {
    setDeleteDialogOpen(false);
  }
};



export const handleValidation = (formData) => {
  if (!formData.type) {
    alert('Select match type');
    return false;
  }

  if (!formData.team1?.teamName) {
    alert('Select team 1');
    return false;
  }

  if (!formData.team2?.teamName) {
    alert('Select team 2');
    return false;
  }

  if (formData.team1?.teamName === formData.team2?.teamName) {
    alert('Teams cannot be the same');
    return false;
  }

  if (!formData.venue) {
    alert('Enter venue');
    return false;
  }

  if (!formData.date) {
    alert('Select date');
    return false;
  }

  // All checks passed
  return true;
};

export const getAllMatches = async () => {
  try {
    const response = await fetch('/api/getAllMatch');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Fetched matches:', data);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
};


// Helper function to get initials from team name
export const getTeamInitials = (teamName) => {
  return teamName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};


// Helper function to generate consistent color based on team name
export const getTeamColor = (teamName) => {
  const colors = [COLORS.secondary.main, COLORS.success.main, COLORS.warning.main, COLORS.error.main];
  const index = teamName.length % colors.length;
  return colors[index];
};

// Add this validation helper at the top with other helper functions
export const isTeamAlreadySelected = (selectedTeam, formData, currentTeamNum) => {
  const otherTeamNum = currentTeamNum === 1 ? 2 : 1;
  return formData[`team${otherTeamNum}`].teamName === selectedTeam.teamName;
};


export const getDrawRate = (matches)=>{
  if (!matches || matches.length === 0) return '0%';
  //console.log("Calculating draw rate for matches:", matches);
  const drawMatch = matches.filter(match => match.winner === 'Draw');
 // console.log("Draw Matches:", drawMatch);
  return (drawMatch.length / matches.length * 100).toFixed(2);
}  


export const getAvgScore = (matches, tournament) => {
  const completedMatches = matches.filter(
    match => match.status?.toLowerCase() === "completed"
  );

  let total = 0;
  let count = 0;

  if (tournament?.gameType.toLowerCase() === 'cricket') {
    completedMatches.forEach(match => {
      [match.team1Score, match.team2Score].forEach(score => {
        if (typeof score === 'string' && score.includes("/")) {
          const [runsStr, wicketsStr] = score.split("/");
          const runs = parseFloat(runsStr);
          const wickets = parseFloat(wicketsStr);

          if (!isNaN(runs) && !isNaN(wickets) && wickets > 0) {
            total += runs ;
            count++;
          }
        }
      });
    });
  }

  else if (tournament?.gameType.toLowerCase() === 'football') {
    completedMatches.forEach(match => {
      [match.team1Score, match.team2Score].forEach(score => {
        if (!isNaN(score) && Number.isInteger(Number(score))) {
          total += Number(score);
          count++;
        }
      });
    });
  }

  return count > 0 ? (total / count).toFixed(2) : 0;
};


export const getHighestScore = (matches, tournament) => {
  const completedMatches = matches.filter(
    match => match.status?.toLowerCase() === "completed"
  );

  console.log("Calculating highest score for matches:", completedMatches);

  let highest = 0;

  completedMatches.forEach(match => {
    const scores = [match.team1Score, match.team2Score];

  

    scores.forEach(score => {
      if (tournament?.gameType.toLowerCase() === 'cricket') {
        if (typeof score === 'string' && score.includes("/")) {
          const [runsStr] = score.split("/");
          const runs = parseInt(runsStr);
          if (!isNaN(runs) && runs > highest) {
            highest = runs;

          
          }
        }
      }

      else if (tournament?.gameType.toLowerCase() === 'football') {
        const value = parseInt(score);
        if (!isNaN(value) && value > highest) {
          highest = value;
        }
      }
    });
  });

  console.log("Highest score found:", highest); 

  return highest > 0 ? highest : 0;
};





export const getAvgWicket = (matches, tournament) => {
  const completedMatches = matches.filter(
    match => match.status?.toLowerCase() === "completed"
  );

  let total = 0;
  let count = 0;

  if (tournament?.gameType.toLowerCase() === 'cricket') {
    completedMatches.forEach(match => {
      [match.team1Score, match.team2Score].forEach(score => {
        if (typeof score === 'string' && score.includes("/")) {
          const [runsStr, wicketsStr] = score.split("/");
          const runs = parseFloat(runsStr);
          const wickets = parseFloat(wicketsStr);

          if (!isNaN(runs) && !isNaN(wickets) && wickets > 0) {
            total += wickets ;
            count++;
          }
        }
      });
    });
  }



  return count > 0 ? (total / count).toFixed(2) : 0;
};

