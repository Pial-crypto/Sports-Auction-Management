"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  Chip,
  LinearProgress,
  Tooltip as MuiTooltip,
  Card,
  CardContent,
  Fade,
  Zoom,
} from '@mui/material';
import {
  AttachMoney,
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Receipt,
  Category,
  Assessment,
  MonetizationOn,
  PriceCheck,
  LocalAtm,
  Payment,
  AccountBalanceWallet,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
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
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

const COLORS = {
  primary: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#00BCD4',
};

const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  minHeight: '100vh',
  position: 'relative',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  transition: 'all 0.3s ease',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  },
}));

const StatBox = styled(Box)(({ theme, colortype }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  background: alpha(COLORS[colortype], 0.1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    background: alpha(COLORS[colortype], 0.15),
  },
}));

const budgetData = {
  totalBudget: 50000,
  spent: 30000,
  remaining: 20000,
  categories: [
    {
      id: 1,
      name: 'Prize Money',
      amount: 25000,
      spent: 15000,
      icon: <MonetizationOn sx={{ color: COLORS.primary }} />,
      color: 'primary',
    },
    {
      id: 2,
      name: 'Venue',
      amount: 10000,
      spent: 8000,
      icon: <AccountBalance sx={{ color: COLORS.success }} />,
      color: 'success',
    },
    {
      id: 3,
      name: 'Equipment',
      amount: 8000,
      spent: 4000,
      icon: <Category sx={{ color: COLORS.warning }} />,
      color: 'warning',
    },
    {
      id: 4,
      name: 'Staff',
      amount: 7000,
      spent: 3000,
      icon: <PriceCheck sx={{ color: COLORS.info }} />,
      color: 'info',
    },
  ],
  recentTransactions: [
    {
      id: 1,
      description: 'Venue Advance Payment',
      amount: 5000,
      type: 'expense',
      date: '2024-01-15',
    },
    {
      id: 2,
      description: 'Registration Fees Collected',
      amount: 3000,
      type: 'income',
      date: '2024-01-14',
    },
  ],
};

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend
);

// Add monthly expense data
const monthlyExpenses = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Expenses',
      data: [30000, 25000, 35000, 28000, 30000, 32000],
      borderColor: COLORS.primary,
      backgroundColor: alpha(COLORS.primary, 0.5),
      fill: true,
    },
    {
      label: 'Budget',
      data: [50000, 50000, 50000, 50000, 50000, 50000],
      borderColor: COLORS.success,
      backgroundColor: alpha(COLORS.success, 0.5),
      borderDash: [5, 5],
      fill: true,
    },
  ],
};

// Add category distribution data
const categoryDistribution = {
  labels: budgetData.categories.map(cat => cat.name),
  datasets: [
    {
      data: budgetData.categories.map(cat => cat.spent),
      backgroundColor: [COLORS.primary, COLORS.success, COLORS.warning, COLORS.info],
      borderColor: 'rgba(255, 255, 255, 0.5)',
      borderWidth: 2,
    },
  ],
};

const BudgetManagement = () => {
  const BudgetOverview = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Budget Overview
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <StyledCard>
          <CardContent>
            <StatBox colortype="primary">
              <AttachMoney sx={{ fontSize: 40, color: COLORS.primary }} />
              <Box>
                <Typography variant="h6">Total Budget</Typography>
                <Typography variant="h4" fontWeight="bold">
                  ৳{budgetData.totalBudget.toLocaleString()}
                </Typography>
              </Box>
            </StatBox>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <StyledCard>
          <CardContent>
            <StatBox colortype="error">
              <TrendingDown sx={{ fontSize: 40, color: COLORS.error }} />
              <Box>
                <Typography variant="h6">Spent</Typography>
                <Typography variant="h4" fontWeight="bold">
                  ৳{budgetData.spent.toLocaleString()}
                </Typography>
              </Box>
            </StatBox>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <StyledCard>
          <CardContent>
            <StatBox colortype="success">
              <TrendingUp sx={{ fontSize: 40, color: COLORS.success }} />
              <Box>
                <Typography variant="h6">Remaining</Typography>
                <Typography variant="h4" fontWeight="bold">
                  ৳{budgetData.remaining.toLocaleString()}
                </Typography>
              </Box>
            </StatBox>
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );

  const CategoryBreakdown = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Category Breakdown
        </Typography>
      </Grid>
      {budgetData.categories.map((category) => (
        <Grid item xs={12} md={6} key={category.id}>
          <Zoom in={true} timeout={500}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <IconButton sx={{ 
                    bgcolor: alpha(COLORS[category.color], 0.1),
                    mr: 2,
                    '&:hover': {
                      bgcolor: alpha(COLORS[category.color], 0.2),
                    }
                  }}>
                    {category.icon}
                  </IconButton>
                  <Box flex={1}>
                    <Typography variant="h6">{category.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {((category.spent / category.amount) * 100).toFixed(1)}% used
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight="bold">
                    ৳{category.amount.toLocaleString()}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(category.spent / category.amount) * 100}
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: alpha(COLORS[category.color], 0.1),
                    '& .MuiLinearProgress-bar': {
                      bgcolor: COLORS[category.color],
                    }
                  }}
                />
              </CardContent>
            </StyledCard>
          </Zoom>
        </Grid>
      ))}
    </Grid>
  );

  const RecentTransactions = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Recent Transactions
        </Typography>
      </Grid>
      {budgetData.recentTransactions.map((transaction) => (
        <Grid item xs={12} md={6} key={transaction.id}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton sx={{ 
                    bgcolor: alpha(
                      transaction.type === 'income' ? COLORS.success : COLORS.error, 
                      0.1
                    ),
                  }}>
                    {transaction.type === 'income' ? 
                      <TrendingUp sx={{ color: COLORS.success }} /> : 
                      <TrendingDown sx={{ color: COLORS.error }} />
                    }
                  </IconButton>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {transaction.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {transaction.date}
                    </Typography>
                  </Box>
                </Box>
                <Typography 
                  variant="h6" 
                  color={transaction.type === 'income' ? 'success.main' : 'error.main'}
                  fontWeight="bold"
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  ৳{transaction.amount.toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );

  const ExpenseChart = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <StyledCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>Monthly Expense Trends</Typography>
            <Box sx={{ height: 300, position: 'relative' }}>
              <Line
                data={monthlyExpenses}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: value => `৳${value.toLocaleString()}`,
                      },
                    },
                  },
                }}
              />
            </Box>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <StyledCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>Category Distribution</Typography>
            <Box sx={{ height: 300, position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <Doughnut
                data={categoryDistribution}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                  cutout: '70%',
                }}
              />
            </Box>
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );

  return (
    <MainContainer>
      <Fade in={true} timeout={800}>
        <Box>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{
              fontWeight: 800,
              mb: 4,
              background: 'linear-gradient(45deg, #1a237e, #0d47a1)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Budget Management
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <BudgetOverview />
            </Grid>
            
            <Grid item xs={12}>
              <ExpenseChart />
            </Grid>

            <Grid item xs={12}>
              <CategoryBreakdown />
            </Grid>

            <Grid item xs={12}>
              <RecentTransactions />
            </Grid>
          </Grid>
        </Box>
      </Fade>

      <MuiTooltip title="Download Report">
        <IconButton
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            bgcolor: COLORS.primary,
            color: 'white',
            '&:hover': {
              bgcolor: alpha(COLORS.primary, 0.8),
            },
            width: 56,
            height: 56,
            boxShadow: 3,
          }}
        >
          <Assessment />
        </IconButton>
      </MuiTooltip>
    </MainContainer>
  );
};

export default BudgetManagement;