export const handleApproveRequest = async (request, setRequests) => {
  try {
    // API call to approve request
    const response = await fetch('/api/approveRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id: request.id,
        type: request.type,
        tournamentId: request.tournamentId,
        playerId: request.playerId
      }),
    });

    if (response.ok) {
      // Update local state
      setRequests(prev => 
        prev.map(req => 
          req.id === request.id 
            ? { ...req, status: 'approved' }
            : req
        )
      );
      alert('Request approved successfully');
    } else {
      alert('Failed to approve request');
    }
  } catch (error) {
    console.error('Error approving request:', error);
    alert('Error approving request');
  }
};

export const handleRejectRequest = async (request, setRequests) => {
  try {
    // API call to reject request
    const response = await fetch('/api/rejectRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id: request.id,
        type: request.type,
        tournamentId: request.tournamentId,
        playerId: request.playerId
      }),
    });

    if (response.ok) {
      // Update local state
      setRequests(prev => 
        prev.map(req => 
          req.id === request.id 
            ? { ...req, status: 'rejected' }
            : req
        )
      );
      alert('Request rejected successfully');
    } else {
      alert('Failed to reject request');
    }
  } catch (error) {
    console.error('Error rejecting request:', error);
    alert('Error rejecting request');
  }
};

export const handleApprove = (request, setRequests) => {
  setRequests(prev => 
    prev.map(req => 
      req.id === request.id 
        ? { ...req, status: 'approved' }
        : req
    )
  );
};

export const handleReject = (request, setRequests) => {
  setRequests(prev => 
    prev.map(req => 
      req.id === request.id 
        ? { ...req, status: 'rejected' }
        : req
    )
  );
};

export const filterRequests = (requests, filter) => {
  if (filter === 'all') return requests;
  return requests.filter(request => request.status === filter);
}; 