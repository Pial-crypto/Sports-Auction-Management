import React from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import { Description, AttachFile } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';


const AttachedDocuments = ({ documents,COLORS }) => {
  return (
    <Grid item xs={12}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(COLORS.paper, 0.05) }}>
        <Typography variant="h6" gutterBottom color="primary">
          Attached Documents
        </Typography>
        <List>
          {documents.map((doc, index) => (
            <ListItem key={index}>
              <ListItemIcon><Description color="primary" /></ListItemIcon>
              <ListItemText 
                primary={
                  <Typography sx={{ color: COLORS.text.primary }}>
                    {doc}
                  </Typography>
                }
              />
              <Button startIcon={<AttachFile />}>
                Download
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Grid>
  );
};

export default AttachedDocuments;
