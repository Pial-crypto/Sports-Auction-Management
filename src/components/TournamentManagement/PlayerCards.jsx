import { Grid, Avatar, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { PlayerCard } from '@/style/TournamentManagementStyle'; // Ensure PlayerCard is correctly imported
import { GradientButton } from '@/style/TournamentManagementStyle'; // Ensure GradientButton is correctly imported
//import itemVariants from '@/constants/TournamentManagement/itemVariants';

export const PlayerCards = () => {
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
    <Grid container spacing={3}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={6} sm={4} md={2} key={index}>
          <PlayerCard
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </motion.div>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 600,
                color: '#1e293b',
                my: 2
              }}
            >
              Player {index + 1}
            </Typography>
            <GradientButton
              size="small"
              fullWidth
              color={index > 2 ? '#dc2626' : '#2563eb'}
              component={motion.button}
              whileTap={{ scale: 0.98 }}
            >
              {`${(index + 1) * 1000}`}
            </GradientButton>
          </PlayerCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default PlayerCards;
