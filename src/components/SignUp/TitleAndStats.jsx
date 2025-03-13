"use client";
import { Box, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { MdSportsCricket } from "react-icons/md";
import StatsComponent from "../StatComponent/StatComponent";

const TitleAndStats = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Grid item xs={12} md={6}>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Box
          sx={{
            textAlign: "center",
            color: "white",
            mb: 4,
          }}
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <MdSportsCricket
              style={{
                fontSize: 90,
                marginBottom: 20,
                color: "black",
                textShadow: "0px 0px 10px rgba(255, 215, 0, 0.8)", // Gold glow
              }}
            />
          </motion.div>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              background: "linear-gradient(45deg, black 30%, #FFD700 90%)", // Black-to-gold gradient
              backgroundClip: "text",
              textFillColor: "transparent",
              letterSpacing: "1.5px",
            }}
          >
            🏆 Sports Auction Hub 🏆
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              fontSize: "1.1rem",
              fontWeight: "500",
              color: "black",
            }}
          >
            🌟 Join the <strong>leading</strong> sports auction management platform
          </Typography>
        </Box>
        <StatsComponent />
      </motion.div>
    </Grid>
  );
};

export default TitleAndStats;
