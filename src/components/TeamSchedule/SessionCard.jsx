import React from 'react';
import { Box, Card, CardContent, Typography, Chip, IconButton } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { 
  FitnessCenter, 
  AccessTime, 
  LocationOn, 
  Person, 
  Edit,
  CheckCircle,
  Delete // Add this import
} from '@mui/icons-material';
import storage from '@/class/storage';

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(25, 118, 210, 0.2); }
  50% { box-shadow: 0 0 20px rgba(25, 118, 210, 0.4); }
  100% { box-shadow: 0 0 5px rgba(25, 118, 210, 0.2); }
`;

const StyledSessionCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  borderRadius: 16,
  transition: 'all 0.3s ease',
  border: '1px solid #e0e0e0',
  overflow: 'visible',
  '&:hover': {
    transform: 'translateY(-8px)',
    animation: `${glowAnimation} 2s infinite`
  }
}));

const InfoRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '12px',
  marginBottom: 8,
  backgroundColor: 'rgba(25, 118, 210, 0.04)',
  borderRadius: 8,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(25, 118, 210, 0.08)',
    transform: 'translateX(5px)'
  },
  '& svg': {
    color: '#1976d2',
    fontSize: 22
  }
});

export const SessionCard = ({ session, onEdit, onDelete }) => { // Add onDelete prop
  return (
    <StyledSessionCard>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Chip
            icon={<CheckCircle />}
            label={session.status.toUpperCase()}
            sx={{
              bgcolor: '#e3f2fd',
              color: '#1976d2',
              fontWeight: 600,
              px: 2,
              py: 1,
              '& .MuiChip-icon': { color: '#1976d2' }
            }}
          />
          {/* Action Buttons */}
        {  storage.get('user').role==='manager' && <Box sx={{ display: 'flex', gap: 1 }}>
            {onEdit && (
              <IconButton 
                onClick={() => onEdit(session)}
                sx={{ 
                  color: '#1976d2',
                  bgcolor: '#e3f2fd',
                  '&:hover': {
                    bgcolor: '#1976d2',
                    color: '#fff'
                  }
                }}
              >
                <Edit />
              </IconButton>
            )}
            {onDelete && (
              <IconButton 
                onClick={() => onDelete(session)}
                sx={{ 
                  color: '#d32f2f',
                  bgcolor: '#ffebee',
                  '&:hover': {
                    bgcolor: '#d32f2f',
                    color: '#fff'
                  }
                }}
              >
                <Delete />
              </IconButton>
            )}
          </Box>
}
        </Box>

        {/* Title */}
        <Typography variant="h5" sx={{ 
          fontWeight: 700,
          color: '#1976d2',
          mb: 3,
          textShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          {session.title}
        </Typography>

        {/* Info Rows */}
        <Box sx={{ mb: 3 }}>
          <InfoRow>
            <AccessTime />
            <Typography sx={{ fontWeight: 500 }}>
              Duration: {session.duration}
            </Typography>
          </InfoRow>

          <InfoRow>
            <LocationOn />
            <Typography sx={{ fontWeight: 500 }}>
              {session.venue}
            </Typography>
          </InfoRow>

          <InfoRow>
            <FitnessCenter />
            <Typography sx={{ fontWeight: 500 }}>
              Focus: {session.focus}
            </Typography>
          </InfoRow>

          <InfoRow>
            <Person />
            <Typography sx={{ fontWeight: 500 }}>
              Coach: {session.coach}
            </Typography>
          </InfoRow>
        </Box>

        {/* Date & Time Badge */}
        <Box sx={{ 
          mt: 3,
          p: 2,
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          borderRadius: 2,
          textAlign: 'center',
          color: '#fff'
        }}>
          <Typography sx={{ 
            fontWeight: 600,
            letterSpacing: '0.5px',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            {session.date} at {session.time}
          </Typography>
        </Box>
      </CardContent>
    </StyledSessionCard>
  );
};