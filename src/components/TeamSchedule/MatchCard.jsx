import React from 'react';
import { Box, Typography, Card, CardContent, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CalendarToday, CheckCircle, SportsCricket } from '@mui/icons-material';

const StyledCard = styled(Card)({
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
  }
});

const ScoreBox = styled(Box)({
  padding: '8px 16px',
  borderRadius: 8,
  backgroundColor: '#f8fafc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  fontWeight: 600
});

export const MatchCard = ({ match }) => {
  const isCompleted = match.status === 'completed';
  const winnerTeam = match.winner === match.team1Name ? 'team1' : 'team2';

  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        {/* Status & Match Type */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Chip
            icon={<CheckCircle />}
            label={match.status.toUpperCase()}
            sx={{
              bgcolor: '#e8f5e9',
              color: '#2e7d32',
              fontWeight: 600,
              '& .MuiChip-icon': { color: '#2e7d32' }
            }}
          />
          <Typography 
            sx={{ 
              color: '#1976d2',
              fontWeight: 600,
              bgcolor: '#e3f2fd',
              px: 2,
              py: 0.5,
              borderRadius: 1
            }}
          >
            {match.type}
          </Typography>
        </Box>

        {/* Teams & Scores */}
        <Box sx={{ my: 3 }}>
          {/* Team 1 */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 2
          }}>
            <Typography sx={{ 
              fontWeight: 700,
              color: winnerTeam === 'team1' ? '#2e7d32' : '#333',
              fontSize: '1.1rem'
            }}>
              {match.team1Name}
            </Typography>
            <ScoreBox sx={{ 
              bgcolor: winnerTeam === 'team1' ? '#e8f5e9' : '#f8fafc',
              color: winnerTeam === 'team1' ? '#2e7d32' : '#333'
            }}>
              {match.team1Score}
            </ScoreBox>
          </Box>

          {/* VS Divider */}
          <Box sx={{ 
            textAlign: 'center', 
            color: '#9e9e9e',
            my: 1,
            fontSize: '0.875rem',
            fontWeight: 500
          }}>
            VS
          </Box>

          {/* Team 2 */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between'
          }}>
            <Typography sx={{ 
              fontWeight: 700,
              color: winnerTeam === 'team2' ? '#2e7d32' : '#333',
              fontSize: '1.1rem'
            }}>
              {match.team2Name}
            </Typography>
            <ScoreBox sx={{ 
              bgcolor: winnerTeam === 'team2' ? '#e8f5e9' : '#f8fafc',
              color: winnerTeam === 'team2' ? '#2e7d32' : '#333'
            }}>
              {match.team2Score}
            </ScoreBox>
          </Box>
        </Box>

        {/* Match Info */}
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          mt: 3,
          pt: 2,
          borderTop: '1px solid #eee'
        }}>
          {/* Date */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarToday sx={{ color: '#757575', fontSize: 20 }} />
            <Typography sx={{ color: '#666', fontWeight: 500 }}>
              {match.date}
            </Typography>
          </Box>
          
          {/* Venue */}
          <Typography sx={{ 
            color: '#666',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <SportsCricket sx={{ fontSize: 20 }} />
            {match.venue}
          </Typography>
        </Box>

        {/* Winner Tag */}
        {isCompleted && (
          <Box sx={{ 
            mt: 2,
            p: 1,
            bgcolor: '#e8f5e9',
            borderRadius: 1,
            textAlign: 'center'
          }}>
            <Typography sx={{ color: '#2e7d32', fontWeight: 600 }}>
              Winner: {match.winner}
            </Typography>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};