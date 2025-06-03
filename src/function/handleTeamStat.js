
export const getMyAvgScore = (matches, tournament, myTeam) => {
  const completedMatches = matches.filter(
    match => match.status?.toLowerCase() === "completed"
  );

  let total = 0;
  let count = 0;

   if (tournament?.gameType.toLowerCase() === 'cricket') {
    completedMatches.forEach(match => {
      if ((match.team1Name === myTeam.teamName || match.team1Id===myTeam.id) && typeof match.team1Score === 'string' && match.team1Score.includes("/")) {
        const [runsStr] = match.team1Score.split("/");
        const runs = parseFloat(runsStr);
        if (!isNaN(runs)) {
          total += runs;
          count++;
        }
      } else if ((match.team2Name === myTeam.teamName|| myTeam.id===match.team2Id) && typeof match.team2Score === 'string' && match.team2Score.includes("/")) {
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
      if ((match.team1Name === myTeam.teamName|| myTeam.id===match.team1Id) && !isNaN(match.team1Score)) {
        total += Number(match.team1Score);
        count++;
      } else if ((match.team2Name === myTeam.teamName|| myTeam.id===match.team2Id) && !isNaN(match.team2Score)) {
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
      if ((match.team1Name === myTeam.teamName|| myTeam.id===match.team1Id) && typeof match.team1Score === 'string' && match.team1Score.includes("/")) {
        const [runsStr] = match.team1Score.split("/");
        const runs = parseInt(runsStr);
        if (!isNaN(runs) && runs > highest) highest = runs;
      } else if ((match.team2Name === myTeam.teamName|| myTeam.id===match.team2Id) && typeof match.team2Score === 'string' && match.team2Score.includes("/")) {
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
      if ((match.team1Name === myTeam.teamName|| myTeam.id===match.team1Id) && typeof match.team1Score === 'string' && match.team1Score.includes("/")) {
        const [, wicketsStr] = match.team1Score.split("/");
        const wickets = parseFloat(wicketsStr);
        if (!isNaN(wickets)) {
          total += wickets;
          count++;
        }
      } else if ((match.team2Name === myTeam.teamName|| myTeam.id===match.team2Id) && typeof match.team2Score === 'string' && match.team2Score.includes("/")) {
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


export const getMyMaxScorer = (playerPerformances, myTeam, tournament) => {
  if (!playerPerformances || !myTeam || !tournament) return null;

  const scores = {}; // initialize as object

  if (tournament.gameType === 'cricket') {
    playerPerformances.forEach((performance) => {
      if (performance.teamId !== myTeam.id) return;

      const runs = parseInt(performance.runsScored) || 0;
      if (scores[performance.playerId]) {
        scores[performance.playerId] += runs;
      } else {
        scores[performance.playerId] = runs;
      }
    });
  }

  if (tournament.gameType === 'football') {
    playerPerformances.forEach((performance) => {
      if (performance.teamId !== myTeam.id) return;

      const goals = parseInt(performance.goals) || 0;
      if (scores[performance.playerId]) {
        scores[performance.playerId] += goals;
      } else {
        scores[performance.playerId] = goals;
      }
    });
  }

  // Now find the player with the maximum score
  let maxId = null;
  let maxScore = -1;
  let maxName='';

  for (const [playerId, total] of Object.entries(scores)) {
    if (total > maxScore) {
      maxScore = total;
      maxId = playerId;
      
    }
  }

  playerPerformances.forEach((pref)=>{
    if(pref.playerId===maxId) maxName=pref.playerName;
  })
  const maxScorer={
    maxScore,
    maxId,
    maxName

  }

  return maxScorer;
};

export const getMyTopPerformers = (playerPerformances, myTeam, tournament) => {
  if (!playerPerformances || !myTeam || !tournament) return null;

  const scores = {};       // for runs or goals
  const wickets = {};      // for cricket only
  const assists = {};      // for football only

  playerPerformances.forEach((performance) => {
    if (performance.teamId !== myTeam.id) return;

    const id = performance.playerId;

    if (tournament.gameType === 'cricket') {
      const runs = parseInt(performance.runsScored) || 0;
      const wkts = parseInt(performance.wickets) || 0;

      scores[id] = (scores[id] || 0) + runs;
      wickets[id] = (wickets[id] || 0) + wkts;
    }

    if (tournament.gameType === 'football') {
      const goals = parseInt(performance.goals) || 0;
      const asts = parseInt(performance.assists) || 0;

      scores[id] = (scores[id] || 0) + goals;
      assists[id] = (assists[id] || 0) + asts;
    }
  });

  const findMax = (obj) => {
    let maxId = null;
    let maxValue = -1;
    for (const [id, val] of Object.entries(obj)) {
      if (val > maxValue) {
        maxId = id;
        maxValue = val;
      }
    }
    const player = playerPerformances.find(p => p.playerId === maxId);
    return {
      id: maxId,
      name: player?.playerName || 'Unknown',
      value: maxValue
    };
  };

  const topScorer = findMax(scores);
  const topWicketTaker = tournament.gameType === 'cricket' ? findMax(wickets) : null;
  const topAssistMaker = tournament.gameType === 'football' ? findMax(assists) : null;

  return {
    topScorer,        // { id, name, value }
    topWicketTaker,   // if cricket
    topAssistMaker    // if football
  };
};


export const getMyMaxMOTM = (myMatches,teamPlayers) => {
  if (!myMatches || myMatches.length === 0) return null;

  const motmCounts = {};

  // Count how many times each player was MOTM
  
  console.log(myMatches,"Here is all the matches")
  
  myMatches.forEach((match) => {
    const id = match.manOfTheMatchId;
    if (!id) return;
   const player = teamPlayers.find((player) => player.id === id);

if (!player) {
  return "ID not found";
}


    if (motmCounts[id]) {
      motmCounts[id] += 1;
    } else {
      motmCounts[id] = 1;
    }
  });

  // Find the player with the maximum MOTM count
  let maxId = null;
  let maxCount = -1;
  let maxName = '';

  for (const [playerId, count] of Object.entries(motmCounts)) {
    if (count > maxCount) {
      maxCount = count;
      maxId = playerId;
    }
  }

  // Get the corresponding player name from any match
  myMatches.forEach((match) => {
    if (match.manOfTheMatchId === maxId) {
      maxName = match.manOfTheMatchName;
    }
  });

  return {
    maxId,
    maxCount,
    maxName
  };
};
