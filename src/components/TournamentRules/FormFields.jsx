import React from 'react';
import { TextField, Box, Typography, Chip } from '@mui/material';
import RULE_TYPES from '@/constants/TournamentRules/tournamentRules';

const FormFields = ({ newRule, setNewRule, handleTemplateSelect, tournament }) => {
  const gameType = tournament?.gameType?.toUpperCase() || 'CRICKET'; // Default to CRICKET if no game type

  return (
    <>
      <TextField
        fullWidth
        label="Rule Title"
        value={newRule.title}
        onChange={(e) => setNewRule({ ...newRule, title: e.target.value })}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Rule Description"
        value={newRule.description}
        onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
        sx={{ mb: 2 }}
      />

      {newRule.category && (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Quick Templates for {gameType.toLowerCase()}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {RULE_TYPES[newRule.category].getTemplates(gameType).map((template, index) => (
              <Chip
                key={index}
                label={template}
                onClick={() => handleTemplateSelect(template)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: RULE_TYPES[newRule.category].color + '.lighter',
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default FormFields;