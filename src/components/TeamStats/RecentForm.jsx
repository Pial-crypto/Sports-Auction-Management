
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  Avatar,
  Tooltip,
  Fade,
  Zoom,
  CircularProgress,
  LinearProgress,
  Paper,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Timeline,
  EmojiEvents,
  SportsCricket,
  TrendingUp,
  Group,
  Assessment,
  Stars,
  Insights,
  Speed,
  ShowChart,
  BarChart,
  DonutLarge,
  PointOfSale,
} from '@mui/icons-material';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from 'chart.js';
import { GlassCard } from '@/style/TeamStat';



export const RecentForm=({teamStats})=>(
     <Grid item xs={12} md={4}>
              <GlassCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recent Form
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {teamStats.recentForm.map((result, index) => (
                      <Avatar
                        key={index}
                        sx={{
bgcolor: result === 'W' ? '#4caf50' : (result === 'D' ? '#ff9800' : '#f44336'),

                          width: 40,
                          height: 40,
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                        }}
                      >
                        {result}
                      </Avatar>
                    ))}
                  </Box>
                </CardContent>
              </GlassCard>
            </Grid>
)