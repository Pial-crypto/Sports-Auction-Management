
import React from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const ConfirmDialog=({
    confirmDialog,
    setConfirmDialog,
   
    confirmApprove

})=>{
    return(
        <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, type: null, request: null })}
      >
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to approve this request?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, type: null, request: null })}>
            Cancel
          </Button>
          <Button onClick={confirmApprove} variant="contained" color="success">
            Confirm Approve
          </Button>
        </DialogActions>
      </Dialog>
    )
}
export default ConfirmDialog