import React, {  } from 'react';
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Avatar,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Line } from 'react-chartjs-2';
import { GlassCard } from '@/style/TeamStat';


export const PerformanceCharts=({performanceData,chartOptions})=>(
       <Grid item xs={12} md={8}>
               <GlassCard>
                 <CardContent>
                   <Typography variant="h6" gutterBottom>
                     Performance Trend
                   </Typography>
                   <Box sx={{ height: 300 }}>
                     <Line data={performanceData} options={chartOptions} />
                   </Box>
                 </CardContent>
               </GlassCard>
             </Grid>
)