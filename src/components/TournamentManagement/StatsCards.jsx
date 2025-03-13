import { Grid, Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { StatsCard } from '@/style/TournamentManagementStyle'; // Assuming you have this component
import { GradientButton } from '@/style/TournamentManagementStyle';// Assuming you have this component
//import cardItems from '@/constants/TournamentManagement/cardItems'; // Assuming the cardItems array is in this file
//import itemVariants from '@/constants/TournamentManagement/itemVariants';
export const StatsCards = ({cardItems}) => {
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
    <Grid container spacing={3} sx={{ mt: 3, mb: 5 }}>
      {cardItems.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StatsCard
            variants={itemVariants} // Make sure itemVariants is defined elsewhere in your code
            whileHover={{
              scale: 1.03,
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            }}
          >
            <Box sx={{ mb: 2 }}>
              {card.icon}
            </Box>
            <Typography variant="h6" fontWeight="bold" color="#1e293b">
              {card.title}
            </Typography>
            <Typography variant="h3" sx={{ color: card.color, my: 2 }}>
              {card.value}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {card.subtitle}
            </Typography>
            

            <a href={card.path}>
            <GradientButton
          
          
          fullWidth
          color={card.color}
          component={motion.button}
          whileTap={{ scale: 0.98 }}
        >
          {index === 4 ? 'SETTLE' : 'MANAGE'}
        </GradientButton>
            </a>
          </StatsCard>
        </Grid>
      ))}
    </Grid>
  );
};

// export default StatsCards;
