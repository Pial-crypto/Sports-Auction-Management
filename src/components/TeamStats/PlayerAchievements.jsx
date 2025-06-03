import React from 'react';
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Avatar,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { GlassCard } from '@/style/TeamStat';
import { 
  SportsCricket, 
  EmojiEvents, 
  Timeline,
  SportsBaseballOutlined,
  AssistantOutlined
} from '@mui/icons-material';

export const PlayerAchievements = ({ tournament, myTopPerformers,myMaxMOTM }) => {
  const isCricket = tournament?.gameType?.toLowerCase() === 'cricket';
  
  const achievements = isCricket ? [
    {
      name: myTopPerformers?.topScorer?.name|| 'Unknown',
      value: myTopPerformers?.topScorer?.value|| 0,
      achievement: 'Maximum Runs',
      icon: <Timeline />
    },
    {
      name: myTopPerformers?.topWicketTaker?.name || 'Unknown',
      value: myTopPerformers?.topWicketTaker?.value || 0,
      achievement: 'Maximum Wickets',
      icon: <SportsCricket />
    },
    {
      name:myMaxMOTM?.maxName || 'Unknown',

      value: myMaxMOTM?.maxCount|| 0,
      achievement: 'Man of the Match',
      icon: <EmojiEvents />
    }
  ] : [
    {
  
      name: myTopPerformers.topScorer.name|| 'Unknown',
      value: myTopPerformers.topScorer.value|| 0,
      achievement: 'Maximum Goals',
      icon: <SportsBaseballOutlined />
    },
    {
      name: myTopPerformers?.topAssistMaker?.name || 'Unknown',
      value:  myTopPerformers?.topAssistMaker?.value || 0,
      achievement: 'Maximum Assists',
      icon: <AssistantOutlined />
    },
   {
      name:myMaxMOTM?.maxName || 'Unknown',

      value: myMaxMOTM?.maxCount|| 0,
      achievement: 'Man of the Match',
      icon: <EmojiEvents />
    }
  ];

  return (
    <Grid item xs={12}>
      <GlassCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Player Achievements
          </Typography>
          <Grid container spacing={3}>
            {achievements.map((achievement, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha('#fff', 0.1),
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: alpha('#fff', 0.15),
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      mr: 2,
                      bgcolor: `hsl(${index * 120}, 70%, 50%)`,
                      '& .MuiSvgIcon-root': {
                        fontSize: '1.5rem'
                      }
                    }}
                  >
                    {achievement.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1">
                      {achievement.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        '& strong': {
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 700
                        }
                      }}
                    >
                      {achievement.achievement}: <strong>{achievement.value}</strong>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </GlassCard>
    </Grid>
  );
};