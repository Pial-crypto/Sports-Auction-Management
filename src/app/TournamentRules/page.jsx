'use client'

import React, { useState } from 'react';
import {
  Container,
  Box,
  Fade,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { StyledDialog } from '@/style/TournamentRules';
import Header from '@/components/TournamentRules/Header';
import ContentsInCard from '@/components/TournamentRules/ContentInCard';
import DialogActionsComponent from '@/components/TournamentRules/DialogActionsComponent';
import ControlForm from '@/components/TournamentRules/ControlForm';
import FormFields from '@/components/TournamentRules/FormFields';
import GradButton from '@/components/TournamentRules/GradButton';
import { handleAddRule,handleEditRule,handleDeleteRule,handleSaveRule,handleTemplateSelect } from '@/function/rules';
import { fetchCurrentTournamentHook } from '@/hook/fetchCurrentTournament';
import { fetchCurrentTournamentRulesHook } from '@/hook/fetchCurrentTournamentRules';
import rulesMockData from '@/constants/TournamentRules/rulesMockData';
const TournamentRules = () => {
  const [rules, setRules] = useState(rulesMockData);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [newRule, setNewRule] = useState({
    title: '',
    description: '',
    category: '',
  });
  const [error, setError] = useState('');
  const [tournament,setTournament]=useState(null)

 fetchCurrentTournamentHook(setTournament)
 //console.log(tournament,"tournament")

fetchCurrentTournamentRulesHook(tournament,setRules)
//console.log(rules,"rules")


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in={true}>
        <Box>
          {/* Header */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Header />
            <GradButton handleAddRule={() => handleAddRule(setError, 
              setNewRule, setEditingRule, setOpenDialog,
               rules,tournament)} rules={rules} />

          </Box>

          {/* Rules Grid */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 4,
            mt: 3,
            '& > div': {
              height: '100%'
            }
          }}>
            {rules.map((rule) => (
              <Fade key={rule.id} in={true}>
                <div>
                  <ContentsInCard
                    rule={rule}
                    handleEditRule={() => handleEditRule(rule, setNewRule, setEditingRule, setOpenDialog)}
                    handleDeleteRule={() => handleDeleteRule(rule.id, setRules, rules)}
                  />
                </div>
              </Fade>
            ))}
          </Box>

          {/* Add/Edit Rule Dialog */}
          <StyledDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              {editingRule ? 'Edit Rule' : 'Add New Rule'}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                {error && (
                  <Box sx={{ mb: 2, color: 'error.main' }}>
                    {error}
                  </Box>
                )}
                <ControlForm 
                  newRule={newRule}
                  setNewRule={setNewRule}
                />
                <FormFields
                  newRule={newRule}
                  setNewRule={setNewRule}
                  handleTemplateSelect={(template) => handleTemplateSelect(template, newRule, setNewRule)}
                  tournament={tournament}
                />
              </Box>
            </DialogContent>
            <DialogActionsComponent 
              setOpenDialog={setOpenDialog}
              handleSaveRule={() => handleSaveRule(setError, setNewRule, 
                setEditingRule, setOpenDialog, rules, newRule, editingRule, setRules,tournament)}
            />
          </StyledDialog>
        </Box>
      </Fade>
    </Container>
  );
};

export default TournamentRules;