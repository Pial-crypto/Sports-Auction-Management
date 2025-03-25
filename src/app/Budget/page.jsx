"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Tooltip as MuiTooltip,
  Fade,
} from '@mui/material';
import { Assessment } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
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

import { MainContainer, COLORS } from '@/style/Budget';
import BudgetOverview from '@/components/Budget/BudgetOverview';
import CategoryBreakdown from '@/components/Budget/CategoryBreakdown';
import RecentTransactions from '@/components/Budget/RecentTransactions';
import ExpenseChart from '@/components/Budget/ExpenseChart';
import { initialBudgetData } from '@/constants/Budget/budgetData';

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

const BudgetManagement = () => {
  const [budgetData, setBudgetData] = useState(initialBudgetData);

  const handleUpdateCategory = (categoryId, type, amount) => {
    setBudgetData(prev => {
      const newCategories = prev.categories.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            spent: type === 'expense' 
              ? cat.spent + amount 
              : cat.spent - amount
          };
        }
        return cat;
      });

      const newSpent = newCategories.reduce((sum, cat) => sum + cat.spent, 0);

      return {
        ...prev,
        categories: newCategories,
        spent: newSpent,
        remaining: prev.totalBudget - newSpent
      };
    });
  };

  const handleAddTransaction = (transaction) => {
    setBudgetData(prev => ({
      ...prev,
      recentTransactions: [transaction, ...prev.recentTransactions].slice(0, 10)
    }));
  };

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
              <BudgetOverview budgetData={budgetData} />
            </Grid>
            
            <Grid item xs={12}>
              <ExpenseChart budgetData={budgetData} />
            </Grid>

            <Grid item xs={12}>
              <CategoryBreakdown 
                categories={budgetData.categories}
                onUpdateCategory={handleUpdateCategory}
                onAddTransaction={handleAddTransaction}
              />
            </Grid>

            <Grid item xs={12}>
              <RecentTransactions transactions={budgetData.recentTransactions} />
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