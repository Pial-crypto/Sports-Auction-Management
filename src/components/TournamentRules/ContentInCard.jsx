import React from 'react';
import { CardContent, Typography, Tooltip, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { AnimatedIconButton } from '@/style/TournamentRules'; // Ensure this is the correct path
import { CategoryChip } from '@/style/TournamentRules';// Ensure this is the correct path
import RULE_TYPES from '@/constants/TournamentRules/tournamentRules';// Ensure this is the correct path

const ContentsInCard = ({ rule, handleEditRule, handleDeleteRule }) => {
  return (
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            mr: 2,
            p: 1,
            borderRadius: 2,
            bgcolor: `${RULE_TYPES[rule.category].color}.lighter`,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {RULE_TYPES[rule.category].icon}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            {rule.title}
          </Typography>
          <CategoryChip
            label={RULE_TYPES[rule.category].label}
            color={RULE_TYPES[rule.category].color}
            size="small"
          />
        </Box>
      </Box>
      <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
        {rule.description}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Tooltip title="Edit Rule">
          <AnimatedIconButton size="small" color="primary" onClick={() => handleEditRule(rule)}>
            <Edit />
          </AnimatedIconButton>
        </Tooltip>
        <Tooltip title="Delete Rule">
          <AnimatedIconButton size="small" color="error" onClick={() => handleDeleteRule(rule.id)}>
            <Delete />
          </AnimatedIconButton>
        </Tooltip>
      </Box>
    </CardContent>
  );
};

export default ContentsInCard;
