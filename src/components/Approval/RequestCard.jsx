import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Preview,
  HourglassEmpty,
} from '@mui/icons-material';
import { StatusChip, StyledIconButton, COLORS } from '@/style/Approval';
import { PlayerRequestDetails } from './PlayerRequestDetails';
import { TeamRequestDetails } from './TeamRequestDetails';

const RequestCard = ({ request, onView, onApprove, onReject }) => {
  return (
    <Card sx={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(12px)',
      borderRadius: 2,
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <StatusChip 
            label={request.status.toUpperCase()} 
            status={request.status}
            icon={
              request.status === 'pending' ? <HourglassEmpty /> :
              request.status === 'approved' ? <CheckCircle /> :
              <Cancel />
            }
          />
          <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
            Submitted: {request.submittedAt}
          </Typography>
        </Box>

        {/* Content based on request type */}
        {request.type === 'Player Registration' ? (
          <PlayerRequestDetails request={request} />
        ) : (
          <TeamRequestDetails request={request} />
        )}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
          <Tooltip title="View Details">
            <StyledIconButton
              onClick={() => onView(request)}
              color={COLORS.info}
            >
              <Preview />
            </StyledIconButton>
          </Tooltip>
          
          {request.status === 'pending' && (
            <>
              <Tooltip title="Approve">
                <StyledIconButton
                  onClick={() => onApprove(request)}
                  color={COLORS.success}
                >
                  <CheckCircle />
                </StyledIconButton>
              </Tooltip>
              <Tooltip title="Reject">
                <StyledIconButton
                  onClick={() => onReject(request)}
                  color={COLORS.error}
                >
                  <Cancel />
                </StyledIconButton>
              </Tooltip>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RequestCard; 