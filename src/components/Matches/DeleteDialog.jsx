
import React from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Delete,
} from '@mui/icons-material';
export const DeleteDialog = ({deleteDialogOpen,setDeleteDialogOpen,handleConfirmDelete}) => {
    return (
          <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
              >
                <DialogTitle sx={{ color: 'error.main' }}>
                  Confirm Delete
                </DialogTitle>
                <DialogContent>
                  <Typography>
                    Are you sure you want to delete this match? This action cannot be undone.
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                  <Button 
                    onClick={handleConfirmDelete} 
                    color="error" 
                    variant="contained"
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
    )
}