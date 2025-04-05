import React from 'react';
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Zoom,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  HourglassEmpty,
} from '@mui/icons-material';

const Header = ({
  COLORS,
  filterStatus,
  handleStatusFilter,
  getStatusCount,
  StyledCard,
  GlowingBorder,
}) => {
  return (
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
            <Zoom in={true} timeout={500 + index * 100}>
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
  );
};

export default Header;
