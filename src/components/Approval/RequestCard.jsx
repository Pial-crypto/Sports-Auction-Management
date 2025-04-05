import React from 'react';
import {
  Grid,
  Zoom,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  Tooltip,
  Alert
} from '@mui/material';
import {
  CalendarToday,
  CheckCircle,
  Cancel,
  Timer,
  Groups,
  VerifiedUser,
  Score,
  Assessment,
  Preview,
  ThumbUp,
  ThumbDown
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

const RequestCard = ({
  request,
  index,
  COLORS,
  handleApprove,
  handleReject,
  setSelectedRequest,
  setOpenDialog,
  StyledCard,
  StatusChip
}) => {
  return (
    <Grid item xs={12} md={6} key={request.id}>
      <Zoom in={true} timeout={500 + (index * 100)}>
        <StyledCard>
          <CardContent>
            <Box
              sx={{
                p: 3,
                background: alpha(COLORS.paper, 0.5),
                borderRadius: 2,
                border: `1px solid ${alpha(COLORS.border, 0.2)}`,
              }}
            >
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

              <Typography
                variant="h6"
                sx={{
                  color: COLORS.text.title,
                  fontWeight: 600,
                  mb: 2
                }}
              >
                {request.type}
              </Typography>

              {request.type === 'Team Registration' ? (
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Groups sx={{ color: 'primary.main' }} />
                    <Typography
                      sx={{
                        color: COLORS.text.primary,
                        fontSize: '1rem',
                        fontWeight: 500,
                      }}
                    >
                      Team: {request.teamName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VerifiedUser sx={{ color: 'primary.main' }} />
                    <Typography
                      sx={{
                        color: COLORS.text.primary,
                        fontSize: '1rem',
                        fontWeight: 500,
                      }}
                    >
                      Captain: {request.captain}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Score sx={{ color: 'primary.main' }} />
                    <Typography
                      sx={{
                        color: COLORS.text.primary,
                        fontSize: '1rem',
                        fontWeight: 500,
                      }}
                    >
                      Match: {request.match}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Assessment sx={{ color: 'primary.main' }} />
                    <Typography
                      sx={{
                        color: COLORS.text.primary,
                        fontSize: '1rem',
                        fontWeight: 500,
                      }}
                    >
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
  );
};

export default RequestCard;
