import React from 'react';
import { Button } from '@mui/material';
import { Save } from '@mui/icons-material';

const DialogActionsComponent = ({ setOpenDialog, handleSaveRule }) => {
  return (
    <>
      <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
      <Button variant="contained" startIcon={<Save />} onClick={handleSaveRule}>
        Save Rule
      </Button>
    </>
  );
};

export default DialogActionsComponent;
