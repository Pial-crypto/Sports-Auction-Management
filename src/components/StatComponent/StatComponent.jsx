import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { Groups, EmojiEvents, TrendingUp, SportsKabaddi } from "@mui/icons-material";
import { motion } from "framer-motion";

const StatsComponent = () => {
  const [stats, setStats] = useState({ bidding: 0, players: 0, tournaments: 0, success: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        bidding: prev.bidding < 1000 ? prev.bidding + 50 : 1000,
        players: prev.players < 500 ? prev.players + 25 : 500,
        tournaments: prev.tournaments < 100 ? prev.tournaments + 5 : 100,
        success: prev.success < 95 ? prev.success + 5 : 95,
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const statsConfig = [
    { icon: <SportsKabaddi />, label: "Live Bidding", value: stats.bidding },
    { icon: <Groups />, label: "Pro Players", value: stats.players },
    { icon: <EmojiEvents />, label: "Tournaments", value: stats.tournaments },
    { icon: <TrendingUp />, label: "Success Rate", value: `${stats.success}%` },
  ];

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        color: "white",
        p: 4,
        borderRadius: 3,
      }}
    >
      <Grid container spacing={2}>
        {statsConfig.map((stat, index) => (
          <Grid item xs={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  textAlign: "center",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                }}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                >
                  {stat.icon}
                </motion.div>
                <Typography variant="h4">{stat.value}</Typography>
                <Typography>{stat.label}</Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsComponent;