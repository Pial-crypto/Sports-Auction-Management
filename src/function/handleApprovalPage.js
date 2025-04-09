import { handleApprovePlayer, handleApproveTeam, handleRejectiontoPlayerReq } from "./handleApprovalActions";

  // Handlers
  export const handleStatusFilter = (status,setFilterStatus) => {
    setFilterStatus(status);
  };

 export const getFilteredRequests = (filterStatus,requests) => {
    if (filterStatus === 'all') return requests;
    return requests.filter(request => request.status === filterStatus);
  };

 export const handleApprove = (request,setConfirmDialog) => {
    setConfirmDialog({
      open: true,
      type: 'approve',
      request: request
    });
  };

  export const handleReject = (request, setRejectDialog) => {
    setRejectDialog({
      open: true,
      request: request
    });
  };

  export const confirmApprove = (requests, confirmDialog, setRequests, setConfirmDialog, setSnackbar) => {

   console.log(confirmDialog.request,"confirmDialog.request")

    const approvedRequest = { ...confirmDialog.request, status: 'approved' };
    console.log(approvedRequest,"approvedRequest of confirmApprove")
    if(confirmDialog.request.type === "Team Registration"){

      
handleApproveTeam(approvedRequest).then((res)=>{
  console.log(res,"res of confirmApprove")
 // if(res){
      // Remove the request from current position and add it to the beginning
      const otherRequests = requests.filter(req => req.id !== confirmDialog.request.id);
      const updatedRequests = [approvedRequest, ...otherRequests];
      
  setRequests(updatedRequests);
  setConfirmDialog({ open: false, type: null, request: null });
  setSnackbar({
    open: true,
    message: 'Request approved successfully',
    severity: 'success'
  });
 // }
//   else{
// alert("Failed to approve request")
//   }
})
    }
    else{
      handleApprovePlayer(approvedRequest).then((res)=>{
      if(res){
          // Remove the request from current position and add it to the beginning
          const otherRequests = requests.filter(req => req.id !== confirmDialog.request.id);
          const updatedRequests = [approvedRequest, ...otherRequests];
          
      setRequests(updatedRequests);
      setConfirmDialog({ open: false, type: null, request: null });
      setSnackbar({
        open: true,
        message: 'Request approved successfully',
        severity: 'success'
      });
      }
      else{
alert("Failed to approve request")
      }
  })
    }
      
  };

  export const confirmReject = (requests, rejectDialog, rejectReason, setRequests, setRejectDialog, setRejectReason, setSnackbar) => {


    const rejectedRequest = { 
      ...rejectDialog.request, 
      status: 'rejected', 
      rejectionReason: rejectReason 
    };
    handleRejectiontoPlayerReq(rejectedRequest).then((res)=>{
      if(res){
        // Remove the request from current position and add it to the beginning
        const otherRequests = requests.filter(req => req.id !== rejectDialog.request.id);
        const updatedRequests = [rejectedRequest, ...otherRequests];
        
    setRequests(updatedRequests);
    setRejectDialog({ open: false, request: null });
    setRejectReason('');
    setSnackbar({
      open: true,
      message: 'Request rejected',
      severity: 'error'
    });
  }
  else{
    alert("Failed to reject request")
  }
  })
  };

  export const getStatusCount = (requests, status) => {
    return requests.filter(req => req.status === status).length;
  };