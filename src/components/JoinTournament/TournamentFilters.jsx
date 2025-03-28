import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const FilterButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'isActive'
})(({ theme, isActive }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1, 3),
  fontWeight: 600,
  backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
  color: isActive ? '#fff' : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: isActive 
      ? theme.palette.primary.dark 
      : theme.palette.action.hover,
  },
}));

const TournamentFilters = ({ currentFilter, onFilterChange }) => {
  return (
    <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
      <FilterButton
        isActive={currentFilter === 'active'}
        onClick={() => onFilterChange('active')}
      >
        Active
      </FilterButton>
      <FilterButton
        isActive={currentFilter === 'completed'}
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </FilterButton>
    </Box>
  );
};

export default TournamentFilters; 