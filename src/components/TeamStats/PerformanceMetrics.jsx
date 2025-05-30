
import { GlassCard } from "@/style/TeamStat"
import React, {  } from 'react';
import {
  Box,
  Typography,
  Grid,
  CardContent,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

export const PerformanceMetrics=({teamStats})=>{
    return(
        <Grid item xs={12}>
              <GlassCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Performance Metrics
                  </Typography>
                  <Grid container spacing={3}>
                    {Object.entries(teamStats.performance).map(([key, value]) => (
                      <Grid item xs={12} sm={6} md={2.4} key={key}>
                        <Box 
                          sx={{ 
                            textAlign: 'center',
                            p: 2,
                            borderRadius: 2,
                            bgcolor: alpha('#fff', 0.1),
                          }}
                        >
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </Typography>
                          <Typography variant="h4" fontWeight="bold">
                            {value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </GlassCard>
            </Grid>
    )
}