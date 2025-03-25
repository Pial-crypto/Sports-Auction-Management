import { MonetizationOn, AccountBalance, Category, PriceCheck } from '@mui/icons-material';
import { COLORS } from '@/style/Budget';

export const initialBudgetData = {
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
      category: 'Venue'
    },
    {
      id: 2,
      description: 'Registration Fees Collected',
      amount: 3000,
      type: 'income',
      date: '2024-01-14',
      category: 'Prize Money'
    },
  ],
}; 