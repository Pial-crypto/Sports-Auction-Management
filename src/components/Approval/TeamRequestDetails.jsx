import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Groups, Email, Phone } from '@mui/icons-material';
import { COLORS } from '@/style/Approval';

export const TeamRequestDetails = ({ request }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Groups sx={{ color: COLORS.primary }} />
        <Typography variant="h6" sx={{ color: COLORS.text.primary }}>
          {request.teamName}
        </Typography>
      </Box>
    </Grid>
    
    <Grid item xs={12} sm={6}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Email sx={{ color: COLORS.info }} />
        <Typography sx={{ color: COLORS.text.secondary }}>
          {request.contactEmail}
        </Typography>
      </Box>
    </Grid>
    
    <Grid item xs={12} sm={6}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Phone sx={{ color: COLORS.warning }} />
        <Typography sx={{ color: COLORS.text.secondary }}>
          {request.contactPhone}
        </Typography>
      </Box>
    </Grid>
  </Grid>
);

export default TeamRequestDetails; 