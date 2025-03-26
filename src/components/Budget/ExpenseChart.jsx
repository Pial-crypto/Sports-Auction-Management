import React from 'react';
import { Grid, CardContent, Typography, Box } from '@mui/material';
import { StyledCard } from '@/style/Budget';
import { Line, Doughnut } from 'react-chartjs-2';
import { alpha } from '@mui/material/styles';
import { COLORS } from '@/style/Budget';

const ExpenseChart = ({ budgetData }) => {
  // Monthly expense data
  const monthlyExpenses = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Expenses',
        data: [30000, 25000, 35000, 28000, 30000, 32000, 30000, 25000, 35000, 28000, 30000, 32000],
        borderColor: COLORS.primary,
        backgroundColor: alpha(COLORS.primary, 0.5),
        fill: true,
      },
      {
        label: 'Budget',
        data: [50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000],
        borderColor: COLORS.success,
        backgroundColor: alpha(COLORS.success, 0.5),
        borderDash: [5, 5],
        fill: true,
      },
    ],
  };

  // Category distribution data
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

  return (
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
};

export default ExpenseChart; 