
export const getMyAvgScore = (matches, tournament, myTeam) => {
  const completedMatches = matches.filter(
    match => match.status?.toLowerCase() === "completed"
  );

  let total = 0;
  let count = 0;

   if (tournament?.gameType.toLowerCase() === 'cricket') {
    completedMatches.forEach(match => {
      if (match.team1Name === myTeam.teamName && typeof match.team1Score === 'string' && match.team1Score.includes("/")) {
        const [runsStr] = match.team1Score.split("/");
        const runs = parseFloat(runsStr);
        if (!isNaN(runs)) {
          total += runs;
          count++;
        }
      } else if (match.team2Name === myTeam.teamName && typeof match.team2Score === 'string' && match.team2Score.includes("/")) {
        const [runsStr] = match.team2Score.split("/");
        const runs = parseFloat(runsStr);
        if (!isNaN(runs)) {
          total += runs;
          count++;
        }
      }
    });
  }

  else if (tournament?.gameType.toLowerCase() === 'football') {
    completedMatches.forEach(match => {
      if (match.team1Name === myTeam.teamName && !isNaN(match.team1Score)) {
        total += Number(match.team1Score);
        count++;
      } else if (match.team2Name === myTeam.teamName && !isNaN(match.team2Score)) {
        total += Number(match.team2Score);
        count++;
      }
    });
  }

  return count > 0 ? (total / count).toFixed(2) : "N/A";
};



export const getMyHighestScore = (matches, tournament, myTeam) => {
  const completedMatches = matches.filter(
    match => match.status?.toLowerCase() === "completed"
  );

  let highest = 0;

  completedMatches.forEach(match => {
    if (tournament?.gameType.toLowerCase() === 'cricket') {
      if (match.team1Name === myTeam.teamName && typeof match.team1Score === 'string' && match.team1Score.includes("/")) {
        const [runsStr] = match.team1Score.split("/");
        const runs = parseInt(runsStr);
        if (!isNaN(runs) && runs > highest) highest = runs;
      } else if (match.team2Name === myTeam.teamName && typeof match.team2Score === 'string' && match.team2Score.includes("/")) {
        const [runsStr] = match.team2Score.split("/");
        const runs = parseInt(runsStr);
        if (!isNaN(runs) && runs > highest) highest = runs;
      }
    }

    else if (tournament?.gameType.toLowerCase() === 'football') {
      if (match.team1Name === myTeam.teamName && !isNaN(match.team1Score)) {
        const score = parseInt(match.team1Score);
        if (!isNaN(score) && score > highest) highest = score;
      } else if (match.team2Name === myTeam.teamName && !isNaN(match.team2Score)) {
        const score = parseInt(match.team2Score);
        if (!isNaN(score) && score > highest) highest = score;
      }
    }
  });

  return highest > 0 ? highest : "N/A";
};






export const getMyAvgWicket = (matches, tournament, myTeam) => {
  const completedMatches = matches.filter(
    match => match.status?.toLowerCase() === "completed"
  );

  let total = 0;
  let count = 0;

  if (tournament?.gameType.toLowerCase() === 'cricket') {
    completedMatches.forEach(match => {
      if (match.team1Name === myTeam.teamName && typeof match.team1Score === 'string' && match.team1Score.includes("/")) {
        const [, wicketsStr] = match.team1Score.split("/");
        const wickets = parseFloat(wicketsStr);
        if (!isNaN(wickets)) {
          total += wickets;
          count++;
        }
      } else if (match.team2Name === myTeam.teamName && typeof match.team2Score === 'string' && match.team2Score.includes("/")) {
        const [, wicketsStr] = match.team2Score.split("/");
        const wickets = parseFloat(wicketsStr);
        if (!isNaN(wickets)) {
          total += wickets;
          count++;
        }
      }
    });
  }

  return count > 0 ? (total / count).toFixed(2) : "N/A";
};


export const getDrawCount = (matches)=>{
  if (!matches || matches.length === 0) return '0%';
  //console.log("Calculating draw rate for matches:", matches);
  const drawMatch = matches.filter(match => match.winner === 'Draw');
 // console.log("Draw Matches:", drawMatch);
  return drawMatch.length
}  


export const makeTeamPointsArray=(matches,teamPoints)=>{
matches.forEach((match) => {
 
  // Add team1's points
  if (teamPoints[match.team1Id]) {
    teamPoints[match.team1Id] += parseInt(match.team1Points);
  } else {
    teamPoints[match.team1Id] = parseInt(match.team1Points);
  }

  // Add team2's points (if applicable)
  if (teamPoints[match.team2Id]) {
    teamPoints[match.team2Id] += parseInt(match.team2Points);
  } else {
    teamPoints[match.team2Id] = parseInt(match.team2Points);
  }
});

}


export const makeRecentFormArray=(myMatches,recentFormArray,myTeam)=>{
    for(let i=0;i<=myMatches.length-1;i++){
      if(myMatches[i]){
        if(myMatches[i].winner===myTeam.teamName){
          recentFormArray.push('W')
        }
        if(myMatches[i].winner==='Draw') recentFormArray.push('D')
        else recentFormArray.push('L')
        }
    
        if(i==4) break;
    }
}

export const getCurrentStreak=(myTeam,myMatches)=>{
    let currentStreak = 0;
    if(myTeam){
    for (let i =0; i <myMatches.length; i++) {
     
      if (myMatches[i].winner===myTeam.teamName) {
        currentStreak++;
      } else {
        break;
      }
    }
    }

    return currentStreak
}