import React from 'react';
import { Grid, CardContent, Typography, Box, IconButton } from '@mui/material';
import { GlassCard } from '@/style/UserDashboard';
import { Doughnut, Line } from 'react-chartjs-2';
import { alpha } from '@mui/material/styles';
import { AccountBalance, TrendingUp } from '@mui/icons-material';
import { motion } from 'framer-motion';

// Modern theme colors
const CHART_COLORS = {
  primary: '#4f46e5',    // Vibrant Indigo
  secondary: '#06b6d4',  // Bright Cyan
  success: '#10b981',    // Emerald
  warning: '#f59e0b',    // Amber
  textGlow: '0 0 10px rgba(255,255,255,0.5)',
  gradient: [
    'rgba(79, 70, 229, 0.9)',   // Vibrant Indigo
    'rgba(6, 182, 212, 0.9)',   // Bright Cyan
    'rgba(16, 185, 129, 0.9)',  // Emerald
  ]
};

const MotionGlassCard = motion(GlassCard);

const ExpenseChart = ({ budgetData }) => {
  // Calculate totals
  const expenseTotal = budgetData.recentTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const incomeTotal = budgetData.recentTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  // Pie chart data
  const transactionData = {
    labels: ['Budget', 'Expense', 'Income'],
    datasets: [{
      data: [budgetData.totalBudget, expenseTotal, incomeTotal],
      backgroundColor: CHART_COLORS.gradient,
      borderColor: 'rgba(255, 255, 255, 0.8)',
      borderWidth: 2,
      hoverOffset: 15
    }]
  };

  // Line chart data
  const categoryData = {
    labels: budgetData.categories.map(cat => cat.name),
    datasets: [
      {
        label: 'Spent Amount',
        data: budgetData.categories.map(cat => cat.spent),
        borderColor: CHART_COLORS.primary,
        backgroundColor: alpha(CHART_COLORS.primary, 0.1),
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Budget Limit',
        data: budgetData.categories.map(cat => cat.amount),
        borderColor: CHART_COLORS.warning,
        backgroundColor: alpha(CHART_COLORS.warning, 0.1),
        borderDash: [5, 5],
        tension: 0.4,
        fill: true,
      }
    ]
  };


return (
  <Box
    sx={{
      background: 'linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.95) 100%)',
      borderRadius: 4,
      p: 3,
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    }}
  >
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MotionGlassCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              {/* Budget Overview Section */}
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <IconButton 
                    sx={{ 
                      mr: 1, 
                      color: CHART_COLORS.primary,
                      '&:hover': {
                        background: alpha(CHART_COLORS.primary, 0.2),
                      }
                    }}
                  >
                    <AccountBalance />
                  </IconButton>
                  <Typography 
                    variant="h6" 
                    sx={{
                      background: `linear-gradient(45deg, ${CHART_COLORS.primary}, ${CHART_COLORS.secondary})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: 'bold',
                      textShadow: CHART_COLORS.textGlow,
                      letterSpacing: '0.5px'
                    }}
                  >
                    Budget Overview
                  </Typography>
                </Box>
                <motion.div
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Box sx={{ height: 200, position: 'relative' }}>
                    <Doughnut
                      data={transactionData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: { 
                              padding: 15,
                              usePointStyle: true,
                              color: '#fff',
                              font: {
                                size: 12,
                                weight: 'bold'
                              }
                            }
                          }
                        },
                        cutout: '70%',
                        animation: {
                          animateScale: true,
                          animateRotate: true,
                          duration: 2000
                        }
                      }}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: '#fff',
                        textShadow: CHART_COLORS.textGlow,
                        fontWeight: 'bold'
                      }}
                    >
                      {`৳${budgetData.remaining.toLocaleString()}`}
                      <Typography 
                        variant="caption" 
                        display="block"
                        sx={{ 
                          color: alpha('#fff', 0.8),
                          textShadow: 'none',
                          mt: 0.5
                        }}
                      >
                        Remaining
                      </Typography>
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
              
              {/* Category Analysis Section */}
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <IconButton 
                    sx={{ 
                      mr: 1, 
                      color: CHART_COLORS.secondary,
                      '&:hover': {
                        background: alpha(CHART_COLORS.secondary, 0.2),
                      }
                    }}
                  >
                    <TrendingUp />
                  </IconButton>
                  <Typography 
                    variant="h6" 
                    sx={{
                      background: `linear-gradient(45deg, ${CHART_COLORS.secondary}, ${CHART_COLORS.success})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: 'bold',
                      textShadow: CHART_COLORS.textGlow,
                      letterSpacing: '0.5px'
                    }}
                  >
                    Category Analysis
                  </Typography>
                </Box>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Box sx={{ height: 200 }}>

<Line
  data={categoryData}
  options={{
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { 
          padding: 15,
          usePointStyle: true,
          color: '#fff',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: alpha('#fff', 0.1)
        },
        ticks: {
          color: '#fff',
          font: {
            weight: 'bold'
          },
          callback: value => `৳${value.toLocaleString()}`
        }
      },
      x: {
        grid: {
          color: alpha('#fff', 0.1)
        },
        ticks: {
          color: '#fff',
          font: {
            weight: 'bold'
          }
        }
      }
    },
    animations: {
      y: {
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    },
    transitions: {
      active: {
        animation: {
          duration: 400
        }
      }
    },
    elements: {
      line: {
        tension: 0.4 // Fixed tension instead of animated
      },
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2
      }
    }
  }}
/>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </CardContent>
        </MotionGlassCard>
      </Grid>
    </Grid>
  </Box>
);
};

export default ExpenseChart;