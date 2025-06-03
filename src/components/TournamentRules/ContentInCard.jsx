import React from 'react';
import { Card, CardContent, Typography, Tooltip, Box, Chip, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { AnimatedIconButton } from '@/style/TournamentRules';
import { CategoryChip } from '@/style/TournamentRules';
import RULE_TYPES from '@/constants/TournamentRules/tournamentRules';
import { motion } from 'framer-motion';
import storage from '@/class/storage';

const ContentsInCard = ({ rule, handleEditRule, handleDeleteRule }) => {
  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <Card 
      component={motion.div}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, 1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'visible',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        '&:hover': {
          border: '1px solid rgba(0, 0, 0, 0.12)',
          boxShadow: (theme) => `0 8px 32px rgba(0, 0, 0, 0.12),
                                inset 0 0 0 1px ${theme.palette.primary.light}30`,
        },
      }}
    >
      <CardContent sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        p: 3,
        background: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(250,250,250,0.5))',
      }}>
        {/* Category Icon with animated background */}
        <Box
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          sx={{ 
            position: 'absolute',
            top: -20,
            left: 20,
            bgcolor: `${RULE_TYPES[rule.category].color}.lighter`,
            borderRadius: '12px',
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 20px ${RULE_TYPES[rule.category].color}40`,
            border: `2px solid ${RULE_TYPES[rule.category].color}50`,
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: `0 6px 24px ${RULE_TYPES[rule.category].color}60`,
            }
          }}
        >
          {RULE_TYPES[rule.category].icon}
        </Box>

        {/* Category Chip with gradient */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <CategoryChip
            label={RULE_TYPES[rule.category].label}
            color={RULE_TYPES[rule.category].color}
            size="small"
            sx={{
              background: `linear-gradient(45deg, ${RULE_TYPES[rule.category].color}, ${RULE_TYPES[rule.category].color}90)`,
              fontWeight: 600,
              color: 'white',
              textShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }}
          />
        </Box>

        {/* Title with gradient underline */}
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            mt: 2,
            fontSize: '1.1rem',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -4,
              left: 0,
              width: '40px',
              height: '3px',
              background: `linear-gradient(90deg, ${RULE_TYPES[rule.category].color}, transparent)`,
              borderRadius: '2px'
            }
          }}
        >
          {rule.title}
        </Typography>

        {/* Description with better tooltip */}
        <Tooltip 
          title={rule.description.length > 150 ? rule.description : ""}
          placement="top"
          arrow
          sx={{ 
            backgroundColor: 'rgba(0,0,0,0.9)',
            borderRadius: '8px',
            maxWidth: 300,
          }}
        >
          <Typography 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              lineHeight: 1.6,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              minHeight: '4.8em',
              fontSize: '0.95rem'
            }}
          >
            {truncateText(rule.description, 150)}
          </Typography>
        </Tooltip>

        {/* Action Buttons with hover effects */}
       {storage.get("user").role==="organizer" && <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: 1,
          mt: 'auto',
          opacity: 0.7,
          transition: 'opacity 0.2s',
          '&:hover': { opacity: 1 }
        }}>
          <Tooltip title="Edit Rule" arrow>
            <IconButton 
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              size="small"
              sx={{
                color: 'primary.main',
                bgcolor: 'primary.lighter',
                '&:hover': {
                  bgcolor: 'primary.light',
                }
              }}
              onClick={() => handleEditRule(rule)}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Rule" arrow>
            <IconButton
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              size="small"
              sx={{
                color: 'error.main',
                bgcolor: 'error.lighter',
                '&:hover': {
                  bgcolor: 'error.light',
                }
              }}
              onClick={() => handleDeleteRule(rule.id)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
}
      </CardContent>
    </Card>
  );
};

export default ContentsInCard;
