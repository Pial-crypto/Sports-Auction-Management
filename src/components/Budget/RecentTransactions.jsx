import React from 'react';
import { Grid, CardContent, Box, Typography, IconButton } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { StyledCard } from '@/style/Budget';
import { alpha } from '@mui/material/styles';
import { COLORS } from '@/style/Budget';

const RecentTransactions = ({ transactions }) => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Recent Transactions
      </Typography>
    </Grid>
    {transactions.map((transaction) => (
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

export default RecentTransactions; 