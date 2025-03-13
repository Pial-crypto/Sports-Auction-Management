import React from 'react';
import { Add } from '@mui/icons-material';
import { GradientButton } from '@/style/TournamentRules'; // Ensure this is the correct path

const GradButton = ({ handleAddRule, rules }) => {
  return (
    <GradientButton
      startIcon={<Add />}
      size="large"
      onClick={handleAddRule}
      disabled={rules.length >= 15}
    >
      Add New Rule ({rules.length}/15)
    </GradientButton>
  );
};

export default GradButton;
