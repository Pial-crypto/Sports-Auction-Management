import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Grid, Paper, Typography, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Close from '@mui/icons-material/Close';
import TeamDetails from './TeamDetails';
import RequestDetails from './RequestDetails';  // Assuming you have this component created
import AttachedDocuments from './AttatchedDoc';  // The document component you created

const RequestDialog = ({ openDialog, setOpenDialog, COLORS, selectedRequest,StyledDialogTitle }) => {
  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: COLORS.paper,
          backgroundImage: `linear-gradient(135deg, ${alpha('#FFF', 0.03)} 0%, ${alpha('#FFF', 0.05)} 100%)`,
          border: `1px solid ${alpha('#FFF', 0.1)}`,
          borderRadius: 2,
        }
      }}
    >
      <StyledDialogTitle>
        Request Details
        <IconButton
          onClick={() => setOpenDialog(false)}
          sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
        >
          <Close />
        </IconButton>
      </StyledDialogTitle>
      
      <DialogContent 
        dividers 
        sx={{ 
          bgcolor: alpha(COLORS.paper, 0.95),
          color: COLORS.text.primary,
          '& .MuiDivider-root': {
            borderColor: alpha(COLORS.border, 0.2),
          }
        }}
      >
        {selectedRequest && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(COLORS.paper, 0.05) }}>
                <Typography variant="h6" gutterBottom color="primary">
                  {selectedRequest.type} Details
                </Typography>
                <Grid container spacing={2}>
                  {selectedRequest.type === 'Team Registration' ? (
                    <TeamDetails COLORS={COLORS} selectedRequest={selectedRequest} />
                  ) : (
                    <RequestDetails
                      match={selectedRequest.match}
                      score={selectedRequest.score}
                      umpire={selectedRequest.umpire}
                      matchDate={selectedRequest.matchDate}
                    />
                  )}
                </Grid>
              </Paper>
            </Grid>

            <AttachedDocuments COLORS={COLORS} documents={selectedRequest.documents} />
          </Grid>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestDialog;
