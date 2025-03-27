import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { 
  PriorityHigh, 
  Schedule,
  Campaign,
  EmojiEvents,
  CheckCircle,  // For Low priority
  Info,         // For Medium priority
} from '@mui/icons-material';

const statsConfig = [
  { 
    icon: <PriorityHigh />, 
    label: 'High Priority', 
    type: 'highPriority',
    color: '#dc2626',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)'
  },
  { 
    icon: <Info />, 
    label: 'Medium Priority', 
    type: 'mediumPriority',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)'
  },
  { 
    icon: <CheckCircle />, 
    label: 'Low Priority', 
    type: 'lowPriority',
    color: '#059669',
    gradient: 'linear-gradient(135deg, #10b981, #059669)'
  },
  { 
    icon: <Schedule />, 
    label: 'Scheduled', 
    type: 'scheduled',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #818cf8, #6366f1)'
  },
  { 
    icon: <Campaign />, 
    label: 'General', 
    type: 'general',
    color: '#2563eb',
    gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)'
  },
  { 
    icon: <EmojiEvents />, 
    label: 'Results', 
    type: 'results',
    color: '#9333ea',
    gradient: 'linear-gradient(135deg, #a855f7, #9333ea)'
  }
];

const QuickStats = ({ announcements, filterType, onFilterChange }) => {
  const getCount = (type) => {
    switch(type) {
      case 'highPriority':
        return announcements.filter(a => a.priority === 'high').length;
      case 'mediumPriority':
        return announcements.filter(a => a.priority === 'medium').length;
      case 'lowPriority':
        return announcements.filter(a => a.priority === 'low').length;
      case 'scheduled':
        return announcements.filter(a => a.type === 'schedule').length;
      case 'general':
        return announcements.filter(a => a.type === 'general').length;
      case 'results':
        return announcements.filter(a => a.type === 'results').length;
      default:
        return 0;
    }
  };

  return (
    <Grid container spacing={3}>
      {statsConfig.map((stat, index) => (
        <Grid item xs={12} sm={6} md={2} key={index}>
          <Box
            onClick={() => onFilterChange(stat.type)}
            sx={{
              background: filterType === stat.type ? stat.gradient : 'white',
              borderRadius: '16px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: filterType === stat.type 
                ? '0 8px 16px rgba(37, 99, 235, 0.2)'
                : '0 4px 6px rgba(0, 0, 0, 0.1)',
              transform: filterType === stat.type ? 'translateY(-2px)' : 'none',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {React.cloneElement(stat.icon, { 
                sx: { 
                  color: filterType === stat.type ? 'white' : stat.color,
                  fontSize: 40,
                  transition: 'all 0.3s ease',
                } 
              })}
              <Box>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700,
                    color: filterType === stat.type ? 'white' : stat.color,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {getCount(stat.type)}
                </Typography>
                <Typography 
                  sx={{ 
                    color: filterType === stat.type ? 'white' : 'text.secondary',
                    fontWeight: filterType === stat.type ? 600 : 500,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuickStats; 