export const handleApprovePlayer = async (request) => {
  try {
    const response = await fetch('/api/giveApprovaltoPlayer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id: request.id,
      }),
    });

    if (response.ok) {
const addApprovaltoTableResponse = await fetch('/api/addApprovaltoTable', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    playerId: request.playerId,
    tournamentId: request.tournamentId,

 
  }),
});
if(addApprovaltoTableResponse.ok){
  return true
}else{
  return false
}
    } else {
      return false
    }
  } catch (error) {
   
    return false
  }
};


export const handleApproveTeam = async (request) => {
  try {

    const response = await fetch('/api/approveTeamReq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id: request.id,
      }),
    });

    if (response.ok) {
const addApprovaltoTableResponse = await fetch('/api/addApprovaltoTable', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    
    tournamentId: request.tournamentId,
    managerId: request.managerId,
  }),
});
if(addApprovaltoTableResponse.ok){
  return true
}else{
  return false
}
    } else {
      return false
    }
  } catch (error) {
   
    return false
  }
};

export const handleRejectiontoPlayerReq = async (request) => {
  try {
    // API call to reject request
    const response = await fetch('/api/rejectiontoPlayerReq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id: request.id,
      }),
    });

    if (response.ok) {
      // Update local state
      return true
    } else {
      return false
    }
  } catch (error) {
   return false
  }
};

export const handleRejectiontoTeamReq = async (request) => {
  try {
    // API call to reject request
    const response = await fetch('/api/rejectionToTeamReq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id: request.id,
      }),
    });

    if (response.ok) {
      // Update local state
      return true
    } else {
      return false
    }
  } catch (error) {
   return false
  }
};
