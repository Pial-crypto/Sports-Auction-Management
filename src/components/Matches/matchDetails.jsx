 {/* Match Details Dialog
      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <StyledDialogTitle>
          Full Match Details
          <IconButton
            onClick={() => setDetailsDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
          >
            <Close />
          </IconButton>
        </StyledDialogTitle>
        <DialogContent>
          {selectedMatch && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: alpha('#2196F3', 0.05) }}>
                    <Typography variant="h6" gutterBottom color="primary">
                      Match Officials
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2">Umpires:</Typography>
                        <Typography>
                          {selectedMatch.matchDetails.umpires.join(', ')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2">Match Referee:</Typography>
                        <Typography>
                          {selectedMatch.matchDetails.referee}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                
                {selectedMatch.status === 'completed' && (
                  <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: alpha('#4CAF50', 0.05) }}>
                      <Typography variant="h6" gutterBottom color="success.main">
                        Match Result
                      </Typography>
                      <Typography>
                        {selectedMatch.matchDetails.result}
                      </Typography>
                    </Paper>
                  </Grid>
                )}

                {selectedMatch.status === 'live' && (
                  <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: alpha('#FF9800', 0.05) }}>
                      <Typography variant="h6" gutterBottom color="warning.main">
                        Live Updates
                      </Typography>
                      <Typography>
                        Current Over: {selectedMatch.currentOver}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog> */}