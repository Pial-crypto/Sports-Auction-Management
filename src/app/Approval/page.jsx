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
    id: 2,
    type: 'Score Verification',
    match: 'Royal Strikers vs Thunder Kings',
    score: '186/4 vs 142/8',
    status: 'pending',
    submittedAt: '2024-01-20 17:45',
    umpire: 'James Wilson',
    matchDate: '2024-01-20',
    venue: 'Central Stadium',
    documents: ['scorecard.pdf', 'match_report.pdf'],
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
  {
    id: 4,
    type: 'Score Verification',
    match: 'Eagle Warriors vs Lion Kings',
    score: '165/8 vs 168/3',
    status: 'rejected',
    submittedAt: '2024-01-18 16:30',
    umpire: 'Robert Brown',
    matchDate: '2024-01-18',
    venue: 'Sports Complex',
    documents: ['match_summary.pdf'],
    rejectionReason: 'Incomplete documentation',
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
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              sx={{
                fontWeight: 800,
                color: COLORS.text.title,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                mb: 3
              }}
            >
              Approval System
            </Typography>
            <Grid container spacing={2}>
              {[
                { icon: <HourglassEmpty />, label: 'Pending', status: 'pending', color: COLORS.warning },
                { icon: <CheckCircle />, label: 'Approved', status: 'approved', color: COLORS.success },
                { icon: <Cancel />, label: 'Rejected', status: 'rejected', color: COLORS.error },
              ].map((stat, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Zoom in={true} timeout={500 + (index * 100)}>
                    <StyledCard 
                      sx={{ 
                        cursor: 'pointer',
                        border: filterStatus === stat.status ? `2px solid ${stat.color}` : 'none'
                      }}
                      onClick={() => handleStatusFilter(stat.status)}
                    >
                      <CardContent>
                        <GlowingBorder color={stat.color}>
                          <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                          }}>
                            {React.cloneElement(stat.icon, { 
                              sx: { color: stat.color, fontSize: 40 } 
                            })}
                            <Box>
                              <Typography variant="h4" sx={{ color: stat.color, fontWeight: 'bold' }}>
                                {getStatusCount(stat.status)}
                              </Typography>
                              <Typography variant="body1" sx={{ color: COLORS.text.secondary }}>
                                {stat.label}
                              </Typography>
                            </Box>
                          </Box>
                        </GlowingBorder>
                      </CardContent>
                    </StyledCard>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Requests Grid */}
          <Grid container spacing={3}>
            {getFilteredRequests().map((request, index) => (
              <Grid item xs={12} md={6} key={request.id}>
                <Zoom in={true} timeout={500 + (index * 100)}>
                  <StyledCard>
                    <CardContent>
                      <Box sx={{ 
                        p: 3,
                        background: alpha(COLORS.paper, 0.5),
                        borderRadius: 2,
                        border: `1px solid ${alpha(COLORS.border, 0.2)}`,
                      }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <StatusChip
                            icon={
                              request.status === 'pending' ? <Timer /> :
                              request.status === 'approved' ? <CheckCircle /> :
                              <Cancel />
                            }
                            label={request.status.toUpperCase()}
                            status={request.status}
                          />
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: COLORS.text.secondary,
                              fontSize: '0.85rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5
                            }}
                          >
                            <CalendarToday sx={{ fontSize: '1rem' }} />
                            Submitted: {request.submittedAt}
                          </Typography>
                        </Box>

                        <Typography variant="h6" sx={{ 
                          color: COLORS.text.title,
                          fontWeight: 600,
                          mb: 2 
                        }}>
                          {request.type}
                        </Typography>

                        {request.type === 'Team Registration' ? (
                          <Box sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Groups sx={{ color: 'primary.main' }} />
                              <Typography sx={{ 
                                color: COLORS.text.primary,
                                fontSize: '1rem',
                                fontWeight: 500,
                              }}>
                                Team: {request.teamName}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <VerifiedUser sx={{ color: 'primary.main' }} />
                              <Typography sx={{ 
                                color: COLORS.text.primary,
                                fontSize: '1rem',
                                fontWeight: 500,
                              }}>
                                Captain: {request.captain}
                              </Typography>
                            </Box>
                          </Box>
                        ) : (
                          <Box sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Score sx={{ color: 'primary.main' }} />
                              <Typography sx={{ 
                                color: COLORS.text.primary,
                                fontSize: '1rem',
                                fontWeight: 500,
                              }}>
                                Match: {request.match}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Assessment sx={{ color: 'primary.main' }} />
                              <Typography sx={{ 
                                color: COLORS.text.primary,
                                fontSize: '1rem',
                                fontWeight: 500,
                              }}>
                                Score: {request.score}
                              </Typography>
                            </Box>
                          </Box>
                        )}

                        {request.status === 'rejected' && (
                          <Alert 
                            severity="error" 
                            sx={{ 
                              mt: 2,
                              bgcolor: alpha(COLORS.error, 0.1),
                              color: COLORS.error,
                              '& .MuiAlert-icon': {
                                color: COLORS.error
                              },
                              border: `1px solid ${alpha(COLORS.error, 0.2)}`
                            }}
                          >
                            Reason: {request.rejectionReason}
                          </Alert>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="View Details">
                              <IconButton
                                onClick={() => {
                                  setSelectedRequest(request);
                                  setOpenDialog(true);
                                }}
                                sx={{ 
                                  bgcolor: alpha(COLORS.primary, 0.1),
                                  color: COLORS.primary,
                                  '&:hover': {
                                    bgcolor: alpha(COLORS.primary, 0.2),
                                  }
                                }}
                              >
                                <Preview />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          {request.status === 'pending' && (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button
                                variant="contained"
                                color="success"
                                startIcon={<ThumbUp />}
                                onClick={() => handleApprove(request)}
                                sx={{ 
                                  borderRadius: 2,
                                  textTransform: 'none',
                                  fontSize: '0.95rem',
                                  fontWeight: 600,
                                  px: 3,
                                  background: `linear-gradient(45deg, ${COLORS.success}, ${alpha(COLORS.success, 0.8)})`,
                                  '&:hover': {
                                    background: COLORS.success,
                                  }
                                }}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                startIcon={<ThumbDown />}
                                onClick={() => handleReject(request)}
                                sx={{ 
                                  borderRadius: 2,
                                  textTransform: 'none',
                                  fontSize: '0.95rem',
                                  fontWeight: 600,
                                  px: 3,
                                  background: `linear-gradient(45deg, ${COLORS.error}, ${alpha(COLORS.error, 0.8)})`,
                                  '&:hover': {
                                    background: COLORS.error,
                                  }
                                }}
                              >
                                Reject
                              </Button>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </StyledCard>
                </Zoom>
              </Grid>
            ))}
          </Grid>

          {/* Details Dialog */}
          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                background: COLORS.paper,
                backgroundImage: `linear-gradient(135deg, ${alpha('#FFF', 0.03)} 0%, ${alpha('#FFF', 0.05)} 100%)`,
                border: `1px solid ${alpha('#FFF', 0.1)}`,
                borderRadius: 2,
              }
            }}
          >
            <StyledDialogTitle>
              Request Details
              <IconButton
                onClick={() => setOpenDialog(false)}
                sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
              >
                <Close />
              </IconButton>
            </StyledDialogTitle>
            <DialogContent 
              dividers 
              sx={{ 
                bgcolor: alpha(COLORS.paper, 0.95),
                color: COLORS.text.primary,
                '& .MuiDivider-root': {
                  borderColor: alpha(COLORS.border, 0.2)
                }
              }}
            >
              {selectedRequest && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(COLORS.paper, 0.05) }}>
                      <Typography variant="h6" gutterBottom color="primary">
                        {selectedRequest.type} Details
                      </Typography>
                      <Grid container spacing={2}>
                        {selectedRequest.type === 'Team Registration' ? (
                          <>
                            <Grid item xs={12} md={6}>
                              <List>
                                <ListItem>
                                  <ListItemIcon><Groups color="primary" /></ListItemIcon>
                                  <ListItemText 
                                    primary={
                                      <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                                        Team Name
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography sx={{ color: COLORS.text.secondary }}>
                                        {selectedRequest.teamName}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemIcon><Person color="primary" /></ListItemIcon>
                                  <ListItemText 
                                    primary={
                                      <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                                        Captain
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography sx={{ color: COLORS.text.secondary }}>
                                        {selectedRequest.captain}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemIcon><Email color="primary" /></ListItemIcon>
                                  <ListItemText 
                                    primary={
                                      <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                                        Contact Email
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography sx={{ color: COLORS.text.secondary }}>
                                        {selectedRequest.contactEmail}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              </List>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <List>
                                <ListItem>
                                  <ListItemIcon><Phone color="primary" /></ListItemIcon>
                                  <ListItemText 
                                    primary={
                                      <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                                        Contact Phone
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography sx={{ color: COLORS.text.secondary }}>
                                        {selectedRequest.contactPhone}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemIcon><Groups color="primary" /></ListItemIcon>
                                  <ListItemText 
                                    primary={
                                      <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                                        Number of Players
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography sx={{ color: COLORS.text.secondary }}>
                                        {selectedRequest.players}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              </List>
                            </Grid>
                          </>
                        ) : (
                          <>
                            <Grid item xs={12} md={6}>
                              <List>
                                <ListItem>
                                  <ListItemIcon><Score color="primary" /></ListItemIcon>
                                  <ListItemText 
                                    primary={
                                      <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                                        Match
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography sx={{ color: COLORS.text.secondary }}>
                                        {selectedRequest.match}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemIcon><Assessment color="primary" /></ListItemIcon>
                                  <ListItemText 
                                    primary={
                                      <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                                        Final Score
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography sx={{ color: COLORS.text.secondary }}>
                                        {selectedRequest.score}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              </List>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <List>
                                <ListItem>
                                  <ListItemIcon><Person color="primary" /></ListItemIcon>
                                  <ListItemText 
                                    primary={
                                      <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                                        Umpire
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography sx={{ color: COLORS.text.secondary }}>
                                        {selectedRequest.umpire}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemIcon><CalendarToday color="primary" /></ListItemIcon>
                                  <ListItemText 
                                    primary={
                                      <Typography sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
                                        Match Date
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography sx={{ color: COLORS.text.secondary }}>
                                        {selectedRequest.matchDate}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              </List>
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(COLORS.paper, 0.05) }}>
                      <Typography variant="h6" gutterBottom color="primary">
                        Attached Documents
                      </Typography>
                      <List>
                        {selectedRequest.documents.map((doc, index) => (
                          <ListItem key={index}>
                            <ListItemIcon><Description color="primary" /></ListItemIcon>
                            <ListItemText 
                              primary={
                                <Typography sx={{ color: COLORS.text.primary }}>
                                  {doc}
                                </Typography>
                              }
                            />
                            <Button startIcon={<AttachFile />}>
                              Download
                            </Button>
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
            </DialogActions>
          </Dialog>

          {/* Confirm Dialog */}
          <Dialog
            open={confirmDialog.open}
            onClose={() => setConfirmDialog({ open: false, type: null, request: null })}
          >
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to approve this request?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmDialog({ open: false, type: null, request: null })}>
                Cancel
              </Button>
              <Button onClick={confirmApprove} variant="contained" color="success">
                Confirm Approve
              </Button>
            </DialogActions>
          </Dialog>

          {/* Reject Dialog */}
          <Dialog
            open={rejectDialog.open}
            onClose={() => setRejectDialog({ open: false, request: null })}
          >
            <DialogTitle>Reject Request</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Reason for Rejection"
                type="text"
                fullWidth
                multiline
                rows={4}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setRejectDialog({ open: false, request: null })}>
                Cancel
              </Button>
              <Button 
                onClick={confirmReject} 
                variant="contained" 
                color="error"
                disabled={!rejectReason.trim()}
              >
                Confirm Reject
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Alert 
              onClose={() => setSnackbar({ ...snackbar, open: false })} 
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Fade>
    </MainContainer>
  );
};

export default ApprovalSystem;