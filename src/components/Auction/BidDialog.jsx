import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment
} from '@mui/material';

const BidDialog = ({ open, onClose, bidAmount, setBidAmount, handleBid, currentBid }) => {
  const [error, setError] = useState('');

  // Reset error when dialog opens/closes
  useEffect(() => {
    setError('');
  }, [open]);

  // Validate bid amount before submitting
  const validateAndSubmit = () => {
    const bid = Number(bidAmount);
    
    if (!bid || isNaN(bid)) {
      setError('Please enter a valid bid amount');
      return;
    }
    
    if (bid <= currentBid) {
      setError(`Bid must be higher than the current bid ($${currentBid})`);
      return;
    }
    
    // Clear error and submit
    setError('');
    handleBid();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Place Your Bid</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3, mt: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Current Highest Bid:
          </Typography>
          <Typography variant="h4" color="primary" fontWeight="bold">
            ${currentBid}
          </Typography>
        </Box>
      
        <TextField
          autoFocus
          margin="dense"
          label="Your Bid Amount"
          type="number"
          fullWidth
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          error={!!error}
          helperText={error}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        
        <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary' }}>
          Enter an amount higher than the current bid to place your bid.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={validateAndSubmit} 
          variant="contained"
          disabled={!bidAmount}
        >
          Confirm Bid
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BidDialog; 