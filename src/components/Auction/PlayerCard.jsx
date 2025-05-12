import React from 'react';
import { Box, Avatar, Typography, Chip, Grid, Paper, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { EmojiEvents, Person, School, Sports, Group } from '@mui/icons-material';

const COLORS = {
  primary: '#4F46E5',
  text: {
    title: '#312E81',
    secondary: '#64748B',
  }
};

const PlayerCard = ({ player }) => (
  <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
      <Avatar 
        src={ player.image ? player.image : "ABC"} 
        sx={{ 
          width: 100, 
          height: 100,
          border: `3px solid ${COLORS.primary}`,
          boxShadow: '0 4px 6px -1px rgb(37 99 235 / 0.2)',
        }} 
      />
      <Box>
        <Typography variant="h4" sx={{ color: COLORS.text.title, fontWeight: 700, mb: 1 }}>
          {player.name ? player.name : "ABC"}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip 
            label={`Base Price: $${player.basePrice || 5000}`}
            sx={{ 
              bgcolor: alpha(COLORS.primary, 0.1),
              color: COLORS.primary,
              fontWeight: 600,
            }}
          />
          {player.role && (
            <Chip 
              label={player.role}
              sx={{ 
                bgcolor: alpha('#10B981', 0.1),
                color: '#10B981',
                fontWeight: 600,
              }}
              icon={<Sports fontSize="small" />}
            />
          )}
        </Stack>
      </Box>
    </Box>
    
    <Grid container spacing={3}>
      {player.age && (
        <Grid item xs={6} sm={4}>
          <Paper elevation={0} sx={{ 
            p: 2, 
            textAlign: 'center',
            bgcolor: alpha(COLORS.primary, 0.05),
            border: `1px solid ${alpha(COLORS.primary, 0.1)}`,
            borderRadius: 2
          }}>
            <Person sx={{ color: COLORS.primary, mb: 1 }} />
            <Typography variant="body2" color="text.secondary">Age</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{player.age}</Typography>
          </Paper>
        </Grid>
      )}
      
      {player.experience && (
        <Grid item xs={6} sm={4}>
          <Paper elevation={0} sx={{ 
            p: 2, 
            textAlign: 'center',
            bgcolor: alpha(COLORS.primary, 0.05),
            border: `1px solid ${alpha(COLORS.primary, 0.1)}`,
            borderRadius: 2
          }}>
            <School sx={{ color: COLORS.primary, mb: 1 }} />
            <Typography variant="body2" color="text.secondary">Experience</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{player.experience} years</Typography>
          </Paper>
        </Grid>
      )}
      
      {player.previousTeam && (
        <Grid item xs={6} sm={4}>
          <Paper elevation={0} sx={{ 
            p: 2, 
            textAlign: 'center',
            bgcolor: alpha(COLORS.primary, 0.05),
            border: `1px solid ${alpha(COLORS.primary, 0.1)}`,
            borderRadius: 2
          }}>
            <Group sx={{ color: COLORS.primary, mb: 1 }} />
            <Typography variant="body2" color="text.secondary">Previous Team</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{player.previousTeam}</Typography>
          </Paper>
        </Grid>
      )}
    </Grid>
    
    {player.achievements && player.achievements.length > 0 && (
      <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: alpha('#10B981', 0.05), border: `1px solid ${alpha('#10B981', 0.2)}` }}>
        <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1, color: '#10B981', fontWeight: 600 }}>
          <EmojiEvents sx={{ mr: 1, fontSize: 20 }} /> Achievements
        </Typography>
        <Box component="ul" sx={{ pl: 4, m: 0 }}>
          {Array.isArray(player.achievements) ? (
            player.achievements.map((achievement, index) => (
              <Typography component="li" key={index} variant="body2" sx={{ mb: 0.5 }}>
                {achievement}
              </Typography>
            ))
          ) : (
            <Typography variant="body2">{player.achievements}</Typography>
          )}
        </Box>
      </Box>
    )}
  </Box>
);

export default PlayerCard; 