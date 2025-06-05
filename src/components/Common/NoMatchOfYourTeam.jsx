import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { SportsCricket } from "@mui/icons-material";

export const NoMatchOfYourTeam = () => {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.95) 100%)",
        borderRadius: 4,
        p: 4,
        m: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "16px",
            p: 4,
            textAlign: "center",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "200%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              animation: "shimmer 2s infinite linear",
            },
            "@keyframes shimmer": {
              "0%": { transform: "translateX(-100%)" },
              "100%": { transform: "translateX(100%)" }
            }
          }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <SportsCricket 
              sx={{ 
                fontSize: "4rem",
                color: "#06b6d4",
                filter: "drop-shadow(0 0 10px rgba(6,182,212,0.5))",
                mb: 2
              }} 
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Typography
              variant="h4"
              sx={{
                background: "linear-gradient(45deg, #6366f1, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
                mb: 2,
                textShadow: "0 0 10px rgba(255,255,255,0.3)",
                letterSpacing: "1px"
              }}
            >
              No Matches Available
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.7)",
                maxWidth: "500px",
                margin: "0 auto",
                lineHeight: 1.8,
                fontSize: "1.1rem",
                textShadow: "0 2px 4px rgba(0,0,0,0.2)"
              }}
            >
              The tournament has started but no matches have been scheduled yet of your team. 
              Please check back later for updates.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
              gap: "8px"
            }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#06b6d4"
                }}
              />
            ))}
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default NoMatchOfYourTeam;