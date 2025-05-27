import { COLORS } from "@/style/Matches";


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
 // console.log("Saving edited match:", matches);
  console.log("Editing match with data:", editMatch);


const cricketScorePattern = /^\d{1,3}\/\d{1,2}$/; // e.g., "123/7"
const footballScorePattern = /^\d+$/; // e.g., "2"

const team1Score = editMatch.team1Score?.trim();
const team2Score = editMatch.team2Score?.trim();
const matchType = tournament?.gameType.toLowerCase(); // Ensure match type is in lowercase for comparison

// Function to validate score based on match type
function isValidScore(score, type) {
  if (score === "Not started yet") return true;

  if (type === "cricket") {
    return cricketScorePattern.test(score);
  } else if (type === "football") {
    return footballScorePattern.test(score);
  } else {
    // If match type is unrecognized, consider the score invalid
    return false;
  }
}

// Validate scores
const isTeam1Valid = isValidScore(team1Score, matchType);
const isTeam2Valid = isValidScore(team2Score, matchType);

// Check if both scores are valid
if (!isTeam1Valid || !isTeam2Valid) {
  if(matchType === "cricket") {
  alert("Please follow the valid syntax.You can enter Not started yet if one team's innings has not been started");
  }

  else{
  alert("Please follow the valid syntax");
  }
  return;
}

// Ensure both scores are not "Not started yet"
if (team1Score === "Not started yet" && team2Score === "Not started yet") {
  alert("Both teams cannot have 'Not started yet' as their score. Please enter at least one valid score.");
  return;
}

if(editMatch.status === "completed" && (team1Score === "Not started yet" || team2Score === "Not started yet")) {
  alert("Both teams must have a valid score when the match is completed.");
  return;
}






  // Basic Validation
  if (!editMatch.team1Score || !editMatch.team2Score) {
    alert("Please enter score for both Team 1 and Team 2.");
    return;
  }

  if (editMatch.status === "upcoming") {
    alert("Please change status to 'live' or 'completed' to save scores.");
    return;
  }

  if (!editMatch.venue) {
    alert("Please enter the venue.");
    return;
  }

  if (editMatch.status === "live") {
    if (!editMatch.currentOver) {
      alert("Please enter current over.");
      return;
    }
    if (!editMatch.overs) {
      alert("Please enter total overs.");
      return;
    }
    if(editMatch.currentOver > editMatch.overs) {
      alert("How current over can be greater than total overs?");
      return;
    }
  }

  // Send update request
  try {
    console.log("Sending request to update match:", editMatch);

    const response = await fetch('/api/updateMatch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editMatch),
    });

    const data = await response.json();
    console.log("Response from updateMatch API:", data);

    if (response.ok) {
      // Update local match list
      setMatches(matches.map(m => m.id === editMatch.id ? editMatch : m));
      setEditDialogOpen(false);
      // Optional: alert("Match updated successfully");
    } else {
      alert('Error updating match: ' + (data?.error || 'Unknown error'));
    }
  } catch (error) {
    console.error('Error updating match:', error);
    alert('Error updating match: ' + error.message);
    setEditDialogOpen(false);
  }
};







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
      const stagePriority={
      'League Match':1,
     'Quarter Final':2,
     'Semi Final':3,
     'Final':4,
    }

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

  return count > 0 ? (total / count).toFixed(2) : "N/A";
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

  return highest > 0 ? highest : "N/A";
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



  return count > 0 ? (total / count).toFixed(2) : "N/A";
};
