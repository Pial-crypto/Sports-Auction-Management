export const myTeamPlayerPerformances = (playerPerformances, myPlayers) => {
  const myPlayerIdsSet = new Set(myPlayers.map(p => p.id)); // O(m)

  console.log(myPlayerIdsSet,'My players id set')

  return playerPerformances.filter(perf => myPlayerIdsSet.has(perf.playerId)); // O(n)

  ///Time complexity is now O(n + m) instead of O(n × m)
};

export const getFinalPlayerObjArray = (myPlayersPerformances, players) => {
  const perfMap = {};

  for (const perf of myPlayersPerformances) {
    const id = perf.playerId;

    if (!perfMap[id]) {
      // Initialize performance and match count
      perfMap[id] = {
        ...perf,
        matchCount: 1
      };
    } else {
      // Sum numeric fields
      perfMap[id].runsScored += perf.runsScored || 0;
      perfMap[id].wickets += perf.wickets || 0;
      perfMap[id].assists += perf.assists || 0;
      perfMap[id].goals += perf.goals || 0;
      perfMap[id].ballsFaced += perf.ballsFaced || 0;
      perfMap[id].overs += perf.overs || 0;

      // Keep latest card info (optional logic)
      perfMap[id].cards = perf.cards;

      // Count matches
      perfMap[id].matchCount += 1;
    }
  }

  // Merge with players array
  const finalPlayers = players.map(player => {
    const perf = perfMap[player.id];
    return {
      ...player,
      ...(perf || {
        runsScored: 0,
        wickets: 0,
        assists: 0,
        goals: 0,
        ballsFaced: 0,
        overs: 0,
        cards: 'none',
        matchCount: 0
      })
    };
  });

  return finalPlayers;
};


