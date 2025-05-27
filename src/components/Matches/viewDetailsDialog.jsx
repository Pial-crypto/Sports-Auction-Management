import React from 'react';
import {
  Typography,
  Grid,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Close,
} from '@mui/icons-material';
import { StyledDialogTitle } from '@/style/Matches';
import { MatchStatusChip } from '@/style/Matches';

export const DetaisDialog = ({setViewDialogOpen, viewDialogOpen, handleMatchDetails, selectedMatch,tournament}) => {
  console.log("Selected Match in Details Dialog:", tournament);
  return (
    <Dialog 
      open={viewDialogOpen} 
      onClose={() => setViewDialogOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <StyledDialogTitle>
        Quick Match Overview
        <IconButton
          onClick={() => setViewDialogOpen(false)}
          sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
        >
          <Close />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        {selectedMatch && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: alpha('#2196F3', 0.05) }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom color="primary">
                      Match Information
                    </Typography>
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell><strong>Stage</strong></TableCell>
                          <TableCell>{selectedMatch?.type || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Venue</strong></TableCell>
                          <TableCell>{selectedMatch?.venue || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Date</strong></TableCell>
                          <TableCell>{`${selectedMatch?.date || 'N/A'} ${selectedMatch?.time || ''}`}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Status</strong></TableCell>
                          <TableCell>
                            <MatchStatusChip
                              label={(selectedMatch?.status || 'N/A').toUpperCase()}
                              status={selectedMatch?.status || 'N/A'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom color="primary">
                      Team Statistics
                    </Typography>
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell><strong>{selectedMatch?.team1Name || 'Team 1'}</strong></TableCell>
                          <TableCell>{selectedMatch?.team1Score || 'Not yet started'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>{selectedMatch?.team2Name || 'Team 2'}</strong></TableCell>
                          <TableCell>{selectedMatch?.team2Score || 'Not yet started'}</TableCell>
                        </TableRow>
                        {selectedMatch?.status === 'live' && (
                          <TableRow>
                            <TableCell><strong>
                              
                             {
                              tournament.gameType=="cricket" ? "Current Over" : (tournament.gameType=="football"? 'Current time' : "N/A")                             }
                              
 </strong></TableCell>
                            <TableCell>{selectedMatch?.currentOver || 'N/A'}</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};