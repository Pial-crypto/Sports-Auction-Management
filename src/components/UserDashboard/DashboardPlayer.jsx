import React from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import {
  SportsCricket,
  SportsSoccer} from "@mui/icons-material";
import { motion } from "framer-motion";
import { StatBadge, GlassCard } from "@/style/UserDashboard";
import { Assessment,Timeline } from "@mui/icons-material";
export const DashBoardPlayer = ({ data,totalMatches,totalTournaments }) => {
    console.log(data)
  const cricketStats = data.slice(0, 4);
  const footballStats = data.slice(4, 8);
  const totalStats = data.slice(8); // For tournament and match counts

  const renderSection = (stats, title, icon, delay = 0) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <GlassCard sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{icon}</Avatar>
          <Typography variant="h6" fontWeight="bold" color="primary">
            {title}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + delay }}
              >
                <GlassCard 
                  sx={{ 
                    background: `linear-gradient(135deg, ${stat.color}20 0%, ${stat.color}10 100%)`,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <StatBadge color={stat.color}>
                    <Avatar 
                      sx={{ 
                        bgcolor: stat.color,
                        boxShadow: `0 4px 8px ${stat.color}40`
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Box>
                      <Typography 
                        variant="h4" 
                        fontWeight="bold"
                        sx={{ 
                          color: stat.color,
                          textShadow: `0 2px 4px ${stat.color}40`
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary',
                          fontWeight: 500
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </StatBadge>
                </GlassCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </GlassCard>
    </motion.div>
  );

  return (
    <Box>
      {/* Cricket Stats Section */}
      {renderSection(cricketStats, "Cricket Performance", <SportsCricket />, 0)}

      {/* Football Stats Section */}
      {renderSection(footballStats, "Football Performance", <SportsSoccer />, 0.2)}

      {/* Total Counts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <GlassCard 
          sx={{ 
            p: 2,
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(66, 165, 245, 0.1) 100%)'
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
            Overall Statistics
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={3}>
  {/* Total Tournaments */}
  <Grid item xs={12} sm={6}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <GlassCard
        sx={{
          background: `linear-gradient(135deg, #673AB720 0%, #673AB710 100%)`,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        }}
      >
        <StatBadge color="#673AB7">
          <Avatar
            sx={{
              bgcolor: '#673AB7',
              boxShadow: `0 4px 8px #673AB740`,
              width: 60,
              height: 60,
            }}
          >
            <Assessment />
          </Avatar>
          <Box>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                color: '#673AB7',
                textShadow: `0 2px 4px #673AB740`,
              }}
            >
              {totalTournaments}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              Total Tournaments
            </Typography>
          </Box>
        </StatBadge>
      </GlassCard>
    </motion.div>
  </Grid>

  {/* Total Matches */}
  <Grid item xs={12} sm={6}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <GlassCard
        sx={{
          background: `linear-gradient(135deg, #03A9F420 0%, #03A9F410 100%)`,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        }}
      >
        <StatBadge color="#03A9F4">
          <Avatar
            sx={{
              bgcolor: '#03A9F4',
              boxShadow: `0 4px 8px #03A9F440`,
              width: 60,
              height: 60,
            }}
          >
            <Timeline />
          </Avatar>
          <Box>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                color: '#03A9F4',
                textShadow: `0 2px 4px #03A9F440`,
              }}
            >
              {totalMatches}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              Total Matches
            </Typography>
          </Box>
        </StatBadge>
      </GlassCard>
    </motion.div>
  </Grid>
</Grid>

        </GlassCard>
      </motion.div>
    </Box>
  );
};