"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Tooltip as MuiTooltip,
  Fade,
  CircularProgress,
} from '@mui/material';
import { Assessment } from '@mui/icons-material';
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

import { MainContainer, downLoadButton, titleStyle } from '@/style/Budget';
import BudgetOverview from '@/components/Budget/BudgetOverview';
import CategoryBreakdown from '@/components/Budget/CategoryBreakdown';
import RecentTransactions from '@/components/Budget/RecentTransactions';
import ExpenseChart from '@/components/Budget/ExpenseChart';
import { initialBudgetData } from '@/constants/Budget/budgetData';
import { fetchCurrentTournamentHook } from '@/hook/fetchCurrentTournament';
import { handleAddTransaction, handleUpdateCategory, generateBudgetReport } from '@/function/handleBudgetPage';
import { fetchCurrentTransactionHook } from '@/hook/fetchCurrentTransactionHook';
import getTransactionList from '@/function/getTransactionList';
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
  const [tournament,setTournament]=useState(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  fetchCurrentTournamentHook(setTournament,setBudgetData)

  fetchCurrentTransactionHook(tournament,setBudgetData)

  const handleDownloadReport = async () => {
    setIsGeneratingPDF(true);
    try {
      await generateBudgetReport(budgetData);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <MainContainer>
      <Fade in={true} timeout={800}>
        <Box>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={titleStyle}
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
                mainBudget={budgetData}
                onUpdateCategory={(categoryId, type, amount)=>
                  handleUpdateCategory(setBudgetData,categoryId, type, amount)
                }
                onAddTransaction={(transaction)=>handleAddTransaction(transaction,setBudgetData,budgetData,tournament.id)}
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
          sx={downLoadButton}
          onClick={handleDownloadReport}
          disabled={isGeneratingPDF}
        >
          {isGeneratingPDF ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <Assessment />
          )}
        </IconButton>
      </MuiTooltip>
    </MainContainer>
  );
};

export default BudgetManagement;