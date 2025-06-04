import React from 'react';
import {
  Box,
  Typography,
  Grid,
  CardContent,
} from '@mui/material';
import {
  AttachMoney,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';

import { StyledCard, StatBox } from '@/style/Budget';
import { COLORS } from '@/style/Budget';

const BudgetOverview = ({budgetData}) => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* <Typography variant="h5" fontWeight="bold" gutterBottom>
          Budget Overview
        </Typography> */}
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

export default BudgetOverview;