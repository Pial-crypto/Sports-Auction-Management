import React from 'react';
import {
  Box,
  Typography,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Campaign,
  Edit,
  Delete,
} from '@mui/icons-material';
import { StyledCard, PriorityChip, COLORS } from '@/style/Announcements';
import formatDateWithTime from '@/function/formateDatewithTime';
import storage from '@/class/storage';

const AnnouncementCard = ({ announcement, onEdit, onDelete }) => {
  const isValidDate = (dateString) => {
    const parsedDate = Date.parse(dateString);
    return !isNaN(parsedDate);
  };
  return (
    <StyledCard>
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3,
          p: 2,
          borderRadius: 2,
          bgcolor: alpha(COLORS.primary, 0.04),
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Campaign sx={{ color: COLORS.primary, fontSize: 32 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, color: COLORS.text.primary }}>
              {announcement.title}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <PriorityChip
              label={announcement.priority.toUpperCase()}
              priority={announcement.priority}
              size="medium"
            />
            <Chip
              label={announcement.type}
              size="medium"
              sx={{ 
                bgcolor: alpha(COLORS.primary, 0.08), 
                color: COLORS.primary,
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            />
          </Box>
        </Box>

        <Typography 
          variant="body1" 
          sx={{ 
            mb: 3, 
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: COLORS.text.primary 
          }}
        >
          {announcement.content}
        </Typography>
{ storage.get('user').role!=='player' &&( 
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Posted by {announcement.author} • {isValidDate(announcement.timestamp) ? formatDateWithTime(announcement.timestamp) : announcement.timestamp}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            
            <Tooltip title="Edit">
              <IconButton
                size="medium"
                sx={{ 
                  bgcolor: alpha(COLORS.primary, 0.08),
                  '&:hover': {
                    bgcolor: alpha(COLORS.primary, 0.15),
                  }
                }}
                onClick={() => onEdit(announcement)}
              >
                <Edit sx={{ color: COLORS.primary, fontSize: 22 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
            <IconButton
                size="medium"
                sx={{ 
                  bgcolor: alpha(COLORS.error, 0.08),
                  '&:hover': {
                    bgcolor: alpha(COLORS.error, 0.15),
                  }
                }}
                onClick={() => onDelete(announcement)}
              >
                <Delete sx={{ color: COLORS.error, fontSize: 22 }} />
              </IconButton>
          


            </Tooltip>
          </Box>
        </Box>
)
}
      </CardContent>
    </StyledCard>
  );
};

export default AnnouncementCard; 