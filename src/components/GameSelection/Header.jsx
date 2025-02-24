import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import { Preview, Save, Publish } from '@mui/icons-material';

const HeaderComponents = ({ selectedView }) => {
  return (
    <>
      <Typography variant="h5" fontWeight="bold" color="primary">
        {selectedView === 'CREATE' ? 'Create Tournament' :
         selectedView === 'HISTORY' ? 'Tournament History' :
         `${selectedView.charAt(0) + selectedView.slice(1).toLowerCase()} Tournaments`}
      </Typography>
      {selectedView === 'CREATE' && (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            startIcon={<Preview />}
            variant="outlined"
            color="primary"
            sx={{
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Preview
          </Button>
          <Button 
            startIcon={<Save />}
            variant="outlined"
            color="primary"
            sx={{
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Save Draft
          </Button>
          <Button 
            startIcon={<Publish />}
            variant="contained"
            sx={{ 
              background: 'linear-gradient(45deg, #06b6d4, #0891b2)',
              '&:hover': {
                background: 'linear-gradient(45deg, #0891b2, #06b6d4)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Publish
          </Button>
        </Box>
      )}
    </>
  );
};

HeaderComponents.propTypes = {
  selectedView: PropTypes.string.isRequired,
};

export default HeaderComponents;