
import React, {  } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import { StatBadge,GlassCard } from "@/style/UserDashboard";
export const StatsComponent=({data})=>(
          <Grid container spacing={3}>
        {data.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard>
                <StatBadge color={stat.color}>
                  <Avatar sx={{ bgcolor: stat.color }}>
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </StatBadge>
              </GlassCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
)