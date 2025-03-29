import React from 'react';
import {
  Box,
  CardContent,
  Typography,
  Button,
  Divider,
  Chip,
  Stack
} from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';

import {
  CalendarMonth,
  Groups,
  EmojiEvents,
  AccountBalance,
} from '@mui/icons-material';
import { 
  StyledCard, 
  SportIcon, 
  StatusChip, 
  TournamentImage,
  COLORS 
} from '@/style/JoinTournament';
import { sportIcons } from '@/constants/JoinTournament/mockData';
import formatDateWithTime from '@/function/formateDatewithTime';

const TournamentCard = ({ tournament, onJoinRequest }) => {
  return (
    <StyledCard sportType={tournament.sport}>
      <TournamentImage 
        src={tournament.image} 
        alt={tournament.name}
      />
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SportIcon sportType={tournament.sport}>
              {sportIcons[tournament.sport]}
            </SportIcon>
            <Typography variant="h5" fontWeight={700}>
              {tournament.name}
            </Typography>
          </Box>
          <StatusChip 
            label={tournament.status.toUpperCase()}
            status={tournament.status}
          />
        </Box>

        <Stack spacing={2} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarMonth color="primary" />
            <Typography>{tournament.startDate}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Groups color="primary" />
            <Typography>{tournament.totalTeams} Teams</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmojiEvents color="primary" />
              <Typography>Prize: ${tournament.prizeMoney.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccountBalance color="primary" />
              <Typography>Entry: ${tournament.entryFee.toLocaleString()}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AlarmIcon color="primary" />
              <Typography>Deadline: {tournament.registrationDeadline && formatDateWithTime(tournament.registrationDeadline)    }</Typography>
            </Box>
          <Box>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Available Positions:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {tournament.playerRequirements.positions.map((position) => (
                <Chip 
                  key={position}
                  label={position}
                  size="small"
                  sx={{ 
                    backgroundColor: `${COLORS[tournament.sport].light}30`,
                    color: COLORS[tournament.sport].primary,
                    fontWeight: 500
                  }}
                />
              ))}
            </Box>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Button
          variant="contained"
          fullWidth
          disabled={tournament.hasRequested || tournament.status !== 'active'}
          onClick={() => onJoinRequest(tournament.id)}
          sx={{
            borderRadius: 2,
            py: 1.5,
            background: tournament.hasRequested 
              ? 'linear-gradient(45deg, #059669, #10b981)'
              : `linear-gradient(45deg, ${COLORS[tournament.sport].primary}, ${COLORS[tournament.sport].secondary})`,
            '&:hover': {
              background: tournament.hasRequested
                ? 'linear-gradient(45deg, #047857, #059669)'
                : `linear-gradient(45deg, ${COLORS[tournament.sport].secondary}, ${COLORS[tournament.sport].primary})`,
            },
            '&:disabled': {
              background: tournament.hasRequested 
                ? 'linear-gradient(45deg, #059669, #10b981)'
                : 'rgba(0, 0, 0, 0.12)',
              color: tournament.hasRequested ? 'white' : 'rgba(0, 0, 0, 0.26)',
            }
          }}
        >
          {tournament.hasRequested ? 'Request Sent' : 'Join Tournament'}
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default TournamentCard; 