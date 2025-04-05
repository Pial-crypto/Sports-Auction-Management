"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Button,
  Avatar,
  Tooltip,
  Fade,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  CheckCircle,
  Cancel,
  Timer,
  HourglassEmpty,
  VerifiedUser,
  Groups,
  Score,
  Assessment,
  Preview,
  ThumbUp,
  ThumbDown,
  Info,
  Description,
  AttachFile,
  CalendarToday,
  Person,
  Email,
  Phone,
  Comment,
  Close,
} from '@mui/icons-material';
import { fetchReqHook } from '@/hook/fetchReqHook';
import Header from '@/components/Approval/Header';
import RequestCard from '@/components/Approval/RequestCard';
import ConfirmDialog from '@/components/Approval/ConfirmDialog';
import RejectDialog from '@/components/Approval/RejectDialog';
import CustomSnackbar from '@/components/Approval/CustomSnackbar';
import RequestDetails from '@/components/Approval/RequestDetails';
import TeamDetails from '@/components/Approval/TeamDetails';
import AttachedDocuments from '@/components/Approval/AttatchedDoc';
import RequestDialog from '@/components/Approval/RequestDialog';

// Update color theme for better visibility
const COLORS = {
  primary: '#3B82F6',    // Bright Blue
  secondary: '#6366F1',  // Indigo
  success: '#22C55E',    // Green
  warning: '#F59E0B',    // Amber
  error: '#EF4444',      // Red
  info: '#06B6D4',       // Cyan
  background: '#1E293B', // Lighter Dark Blue
  paper: '#293548',      // Lighter Slate
  border: '#475569',     // Slate
  text: {
    primary: '#F8FAFC',    // Very Light Gray
    secondary: '#CBD5E1',  // Light Gray
    title: '#FFFFFF',      // White
  }
};

// Styled Components
const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: `linear-gradient(135deg, ${COLORS.background} 0%, #242F3D 100%)`,
  minHeight: '100vh',
  color: COLORS.text.primary,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: alpha('#FFF', 0.05),
  backdropFilter: 'blur(12px)',
  borderRadius: theme.spacing(2),
  border: `1px solid ${alpha('#FFF', 0.1)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 24px ${alpha('#000', 0.2)}`,
    background: alpha('#FFF', 0.08),
  },
}));

const StatusChip = styled(Chip)(({ status }) => {
  const colors = {
    pending: { bg: COLORS.warning, light: alpha(COLORS.warning, 0.12) },
    approved: { bg: COLORS.success, light: alpha(COLORS.success, 0.12) },
    rejected: { bg: COLORS.error, light: alpha(COLORS.error, 0.12) },
  };
  return {
    backgroundColor: colors[status].light,
    color: colors[status].bg,
    fontWeight: 600,
    border: `1px solid ${alpha(colors[status].bg, 0.3)}`,
    '& .MuiChip-icon': {
      color: colors[status].bg,
    },
    '&:hover': {
      backgroundColor: alpha(colors[status].bg, 0.2),
    },
  };
});

const StyledIconButton = styled(IconButton)(({ theme, color }) => ({
  backgroundColor: alpha(color, 0.1),
  '&:hover': {
    backgroundColor: alpha(color, 0.2),
  },
}));

const GlowingBorder = styled(Box)(({ theme, color }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  background: alpha(color, 0.08),
  border: `1px solid ${alpha(color, 0.2)}`,
  boxShadow: `0 0 20px ${alpha(color, 0.08)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: alpha(color, 0.12),
    boxShadow: `0 0 30px ${alpha(color, 0.12)}`,
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: `linear-gradient(45deg, ${alpha(COLORS.primary, 0.8)}, ${alpha(COLORS.secondary, 0.8)})`,
  color: COLORS.text.title,
  padding: theme.spacing(3),
  fontSize: '1.5rem',
  fontWeight: 600,
}));

// Mock Data
const initialRequests = [
  {
    id: 1,
    type: 'Team Registration',
    teamName: 'Royal Strikers',
    captain: 'John Doe',
    players: 15,
    status: 'pending',
    submittedAt: '2024-01-20 14:30',
    documents: ['team_list.pdf', 'player_ids.pdf'],
    contactEmail: 'john@example.com',
    contactPhone: '+1234567890',
    additionalInfo: 'Previous tournament winners',
  },

  {
    id: 3,
    type: 'Team Registration',
    teamName: 'Thunder Kings',
    captain: 'Mike Smith',
    players: 14,
    status: 'approved',
    submittedAt: '2024-01-19 09:15',
    documents: ['team_details.pdf'],
    contactEmail: 'mike@example.com',
    contactPhone: '+1234567891',
    additionalInfo: 'New team registration',
  },

];


const ApprovalSystem = () => {

  fetchReqHook()
  // States


  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
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

  // Handlers
  const handleStatusFilter = (status) => {
    setFilterStatus(status);
  };

  const getFilteredRequests = () => {
    if (filterStatus === 'all') return requests;
    return requests.filter(request => request.status === filterStatus);
  };

  const handleApprove = (request) => {
    setConfirmDialog({
      open: true,
      type: 'approve',
      request: request
    });
  };

  const handleReject = (request) => {
    setRejectDialog({
      open: true,
      request: request
    });
  };

  const confirmApprove = () => {
    const updatedRequests = requests.map(req =>
      req.id === confirmDialog.request.id ? { ...req, status: 'approved' } : req
    );
    setRequests(updatedRequests);
    setConfirmDialog({ open: false, type: null, request: null });
    setSnackbar({
      open: true,
      message: 'Request approved successfully',
      severity: 'success'
    });
  };

  const confirmReject = () => {
    const updatedRequests = requests.map(req =>
      req.id === rejectDialog.request.id ? 
      { ...req, status: 'rejected', rejectionReason: rejectReason } : req
    );
    setRequests(updatedRequests);
    setRejectDialog({ open: false, request: null });
    setRejectReason('');
    setSnackbar({
      open: true,
      message: 'Request rejected',
      severity: 'error'
    });
  };

  const getStatusCount = (status) => {
    return requests.filter(req => req.status === status).length;
  };

  return (
    <MainContainer>
      <Fade in={true} timeout={800}>
        <Box>
          {/* Header Section */}
        <Header filterStatus={filterStatus} COLORS={COLORS}
        handleStatusFilter={handleStatusFilter}
        getStatusCount={getStatusCount} StyledCard={StyledCard} GlowingBorder={GlowingBorder}
        StyledIconButton={StyledIconButton}
        
        ></Header>

          {/* Requests Grid */}
          <Grid container spacing={3}>
            {getFilteredRequests().map((request, index) => (
                <RequestCard
                key={request.id}
                request={request}
                index={index}
                COLORS={COLORS}
                handleApprove={handleApprove}
                handleReject={handleReject}
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
         confirmApprove={confirmApprove}
          >

         </ConfirmDialog>

          {/* Reject Dialog */}
         
          <RejectDialog
  open={rejectDialog.open}
  onClose={() => setRejectDialog({ open: false, request: null })}
  rejectReason={rejectReason}
  setRejectReason={setRejectReason}
  onConfirm={confirmReject}
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