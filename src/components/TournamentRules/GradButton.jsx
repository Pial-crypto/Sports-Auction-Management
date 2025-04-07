import React from 'react';
import { Add } from '@mui/icons-material';
import { GradientButton } from '@/style/TournamentRules'; // Ensure this is the correct path
import storage from '@/class/storage';

const GradButton = ({ handleAddRule, rules }) => {
  return (
    <GradientButton
      startIcon={<Add />}
      size="large"
      onClick={handleAddRule}
      disabled={rules.length >= 15 || storage.get('user').role!="organizer"}
    >
      Add New Rule ({rules.length}/15)
    </GradientButton>
  );
};

export default GradButton;
