import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Person, SportsCricket, EmojiEvents, History } from '@mui/icons-material';
import { COLORS } from '@/style/Approval';

export const PlayerRequestDetails = ({ request }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Person sx={{ color: COLORS.primary }} />
        <Typography variant="h6" sx={{ color: COLORS.text.primary }}>
          {request.name}
        </Typography>
      </Box>
    </Grid>
    
    <Grid item xs={12} sm={6}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <SportsCricket sx={{ color: COLORS.info }} />
        <Typography sx={{ color: COLORS.text.secondary }}>
          {request.role} • {request.age} years old
        </Typography>
      </Box>
    </Grid>
    
    <Grid item xs={12} sm={6}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <History sx={{ color: COLORS.warning }} />
        <Typography sx={{ color: COLORS.text.secondary }}>
          {request.experience} years experience
        </Typography>
      </Box>
    </Grid>
    
    <Grid item xs={12}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <EmojiEvents sx={{ color: COLORS.success }} />
        <Typography sx={{ color: COLORS.text.secondary }}>
          {request.achievements}
        </Typography>
      </Box>
    </Grid>
  </Grid>
); 