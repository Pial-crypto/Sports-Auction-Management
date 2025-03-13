import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';
import RULE_TYPES from '@/constants/TournamentRules/tournamentRules'; // Ensure this is the correct path

const ControlForm = ({ newRule, setNewRule }) => {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Rule Category</InputLabel>
      <Select
        value={newRule.category}
        onChange={(e) => setNewRule({ ...newRule, category: e.target.value })}
        label="Rule Category"
      >
        {Object.entries(RULE_TYPES).map(([key, value]) => (
          <MenuItem value={key} key={key}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {value.icon}
              <Typography>{value.label}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ControlForm;
