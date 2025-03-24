import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Box, Button, Typography, Snackbar } from '@mui/material';
import { Preview, Save, Publish } from '@mui/icons-material';
import { previewStyle, publishStyle, saveDraftStyle } from '@/style/GameSelection';
import { jsPDF } from 'jspdf';
import { handleSaveDraft } from '@/function/handleSaveDraft';
import { validateForm } from '@/function/validateCreateTournamentForm';
import { handlePublish } from '@/function/handleTournamentPublicaiton';
import storage from '@/class/storage';
const MIN_REGISTRATION_FEE = 100;
const DEFAULT_TOURNAMENT_ICON = "https://images.unsplash.com/photo-1522778119026-d647f0596c20";

const HeaderComponents = ({ selectedView, formData }) => {
  const [error, setError] = useState(null);
const user = storage.get("user");
const [forceRender,setForceRender] = useState(false);
const {activeStatus} = storage.get("user");

  const handlePublishCall = async () => {
   
    if(!activeStatus){
      handlePublish(formData,setError,MIN_REGISTRATION_FEE,setForceRender)
    }else{
      setError("Finish your current tournament to create a new one");
    }
  };
 

   const callSaveDraft = () => {
    handleSaveDraft(formData,setError,MIN_REGISTRATION_FEE)
  };

  return (
    <>
      <Typography variant="h5" fontWeight="bold" color="primary">
        {selectedView === 'CREATE' ? 'Create Tournament' :
         selectedView === 'HISTORY' ? 'Tournament History' :
         `${selectedView.charAt(0) + selectedView.slice(1).toLowerCase()} Tournaments`}
      </Typography>
      {selectedView === 'CREATE' && (
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          <Button 
            startIcon={<Save />}
            variant="outlined"
            color="primary"
            onClick={callSaveDraft}
            sx={saveDraftStyle}
          >
            Save Draft
          </Button>
          <Button 
            onClick={handlePublishCall}
            startIcon={<Publish />}
            variant="contained"
            sx={publishStyle}
          >
            Publish
          </Button>
        </Box>
      )}

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

HeaderComponents.propTypes = {
  selectedView: PropTypes.string.isRequired,
  formData: PropTypes.object.isRequired,
};

export default HeaderComponents;