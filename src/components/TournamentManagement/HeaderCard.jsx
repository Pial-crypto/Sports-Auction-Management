import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import { MainCard } from '@/style/TournamentManagementStyle'; // Assuming you have this custom component


export const HeaderCard = () => {
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  return (
    <MainCard variants={itemVariants} whileHover={{ scale: 1.01 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={2}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <Box sx={{ bgcolor: '#3b82f6', borderRadius: '50%', p: 1 }}>
              <SportsSoccerIcon sx={{ fontSize: 32, color: 'white' }} />
            </Box>
          </motion.div>
          <Typography variant="h4" fontWeight="bold">
            TOURNAMENT MANAGEMENT
          </Typography>
        </Box>
        <Box>
          <Tooltip title="Settings">
            <IconButton
              sx={{ color: 'white' }}
              component={motion.button}
              whileHover={{ scale: 1.1 }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Close">
            <IconButton
              sx={{ color: '#f87171' }}
              component={motion.button}
              whileHover={{ scale: 1.1 }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </MainCard>
  );
};
