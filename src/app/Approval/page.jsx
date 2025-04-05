"use client";

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Fade,
} from '@mui/material';
import { fetchReqHook } from '@/hook/fetchReqHook';
import Header from '@/components/Approval/Header';
import RequestCard from '@/components/Approval/RequestCard';
import ConfirmDialog from '@/components/Approval/ConfirmDialog';
import RejectDialog from '@/components/Approval/RejectDialog';
import CustomSnackbar from '@/components/Approval/CustomSnackbar';
import RequestDialog from '@/components/Approval/RequestDialog';
import { MainContainer, StyledCard, StatusChip, StyledIconButton, GlowingBorder, StyledDialogTitle,COLORS } from '@/style/Approval';
import { initialRequests } from '@/constants/Approval/mockData';
import { 
  handleStatusFilter, 
  getFilteredRequests, 
  handleApprove, 
  handleReject, 
  confirmApprove, 
  confirmReject, 
  getStatusCount 
} from '@/function/handleApprovalPage';


const ApprovalSystem = () => {
  const [requests, setRequests] = useState(initialRequests);
  
  // Move fetchReqHook before useState to ensure proper initialization
  fetchReqHook(setRequests);
  
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('pending');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: null,
    request: null
  });
  const [rejectDialog, setRejectDialog] = useState({
    open: false,
    request: null
  });
  const [rejectReason, setRejectReason] = useState('');

  console.log('All requests:', requests);

  return (
    <MainContainer>
      <Fade in={true} timeout={800}>
        <Box>
          {/* Header Section */}
        <Header filterStatus={filterStatus} COLORS={COLORS}
        handleStatusFilter={(status)=>handleStatusFilter(status,setFilterStatus)}
        getStatusCount={(status) => getStatusCount(requests, status)} StyledCard={StyledCard} GlowingBorder={GlowingBorder}
        StyledIconButton={StyledIconButton}
        
        ></Header>

          {/* Requests Grid */}
          <Grid container spacing={3}>
            {getFilteredRequests(filterStatus,requests).map((request, index) => (
                <RequestCard
                key={request.id}
                request={request}
                index={index}
                COLORS={COLORS}
                handleApprove={(req) => handleApprove(req, setConfirmDialog)}
                handleReject={(req) => handleReject(req, setRejectDialog)}
                setSelectedRequest={setSelectedRequest}
                setOpenDialog={setOpenDialog}
                StyledCard={StyledCard}
                StatusChip={StatusChip}
              />
            ))}
          </Grid>

          {/* Details Dialog */}
          <RequestDialog 
  openDialog={openDialog} 
  setOpenDialog={setOpenDialog} 
  COLORS={COLORS} 
  selectedRequest={selectedRequest} 
  StyledDialogTitle={StyledDialogTitle}
/>


          {/* Confirm Dialog */}
         <ConfirmDialog
         confirmDialog={confirmDialog}
         setConfirmDialog={setConfirmDialog}
         confirmApprove={() => confirmApprove(requests, confirmDialog, setRequests, setConfirmDialog, setSnackbar)}
          >

         </ConfirmDialog>

          {/* Reject Dialog */}
         
          <RejectDialog
  open={rejectDialog.open}
  onClose={() => setRejectDialog({ open: false, request: null })}
  rejectReason={rejectReason}
  setRejectReason={setRejectReason}
  onConfirm={() => confirmReject(requests, rejectDialog, rejectReason, setRequests, setRejectDialog, setRejectReason, setSnackbar)}
/>

          {/* Snackbar */}
          <CustomSnackbar
  open={snackbar.open}
  message={snackbar.message}
  severity={snackbar.severity}
  onClose={() => setSnackbar({ ...snackbar, open: false })}
/>

        </Box>
      </Fade>
    </MainContainer>
  );
};

export default ApprovalSystem;