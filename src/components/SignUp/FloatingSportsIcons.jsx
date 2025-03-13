import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { FaFootballBall, FaBaseballBall, FaTrophy } from "react-icons/fa";
import { GiCricketBat } from "react-icons/gi";

const FloatingIcons = () => {
  const icons = [FaFootballBall, FaBaseballBall, GiCricketBat, FaTrophy];

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          animate={{
            y: ["0%", "100%"],
            x: ["0%", `${Math.random() * 100}%`],
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${index * 25}%`,
            color: "rgba(255,255,255,0.1)",
            fontSize: "2rem",
          }}
        >
          <Icon />
        </motion.div>
      ))}
    </Box>
  );
};

export default FloatingIcons;