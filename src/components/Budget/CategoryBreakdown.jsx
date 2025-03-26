import React from 'react';
import { 
  Grid, 
  CardContent, 
  Box, 
  Typography, 
  IconButton, 
  LinearProgress,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions 
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { StyledCard } from '@/style/Budget';
import { alpha } from '@mui/material/styles';
import { COLORS } from '@/style/Budget';
import { Zoom } from '@mui/material';
import { toast } from 'react-toastify';

const CategoryBreakdown = ({ 
  categories, 
  onUpdateCategory,
  onAddTransaction,
  mainBudget
}) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [amount, setAmount] = React.useState('');
  const [type, setType] = React.useState('expense');

  const handleOpenDialog = (category, transactionType) => {
    setSelectedCategory(category);
    setType(transactionType);
    setAmount('');
    setOpenDialog(true);
  };

  const handleSubmit = () => {
    if (!amount || isNaN(amount) || amount <= 0) return;

    // Check if trying to refund more than spent
    if (type === 'income' && Number(amount) > selectedCategory.spent) {
      alert(`You can't refund more than spent amount (৳${selectedCategory.spent.toLocaleString()}) in ${selectedCategory.name}`);
      return;
    }

    // Check if trying to spend more than remaining budget
    if (type === 'expense' && Number(amount) > mainBudget.remaining) {
      alert(`You don't have enough budget to spend. Remaining budget: ৳${mainBudget.remaining.toLocaleString()}`);
      return;
    }

    // Check if trying to refund more than total budget
    if (type === 'income' && Number(amount) > mainBudget.totalBudget) {
      alert(`Refund amount cannot exceed total budget (৳${mainBudget.totalBudget.toLocaleString()})`);
      return;
    }

    const transaction = {
      id: Date.now(),
      description: `${type === 'expense' ? 'Spent on' : 'Refunded from'} ${selectedCategory.name}`,
      amount: Number(amount),
      type,
      date: new Date().toISOString().split('T')[0],
      category: selectedCategory.name
    };

    onUpdateCategory(selectedCategory.id, type, Number(amount));
    onAddTransaction(transaction);
    setOpenDialog(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Category Breakdown
          </Typography>
        </Grid>
        {categories.map((category) => (
          <Grid item xs={12} md={6} key={category.id}>
            <Zoom in={true} timeout={500}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton 
                      sx={{ 
                        bgcolor: alpha(COLORS[category.color], 0.1),
                        mr: 2,
                        '&:hover': {
                          bgcolor: alpha(COLORS[category.color], 0.2),
                        }
                      }}
                    >
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
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                    <Button
                      startIcon={<Add />}
                      onClick={() => handleOpenDialog(category, 'expense')}
                      variant="contained"
                      color={category.color}
                      size="small"
                    >
                      Add Expense
                    </Button>
                    <Button
                      startIcon={<Remove />}
                      onClick={() => handleOpenDialog(category, 'income')}
                      variant="outlined"
                      color={category.color}
                      size="small"
                    >
                      Refund
                    </Button>
                  </Box>
                </CardContent>
              </StyledCard>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {type === 'expense' ? 'Add Expense' : 'Add Refund'} - {selectedCategory?.name}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Amount"
            
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              
              startAdornment: <Typography>৳</Typography>
            }}
            inputProps={{
              min: 1
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CategoryBreakdown; 