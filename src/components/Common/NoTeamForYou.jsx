import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Groups, SentimentDissatisfied } from '@mui/icons-material';

const NoTeamForYou = () => {
  return (
    <Box
      sx={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.95) 100%)',
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
            background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0.05) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '20px',
            p: 6,
            textAlign: 'center',
            boxShadow: '0 8px 32px 0 rgba(99,102,241,0.25)',
            position: 'relative',
            overflow: 'hidden',
            maxWidth: '600px',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '200%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.15), transparent)',
              animation: 'shimmer 2s infinite linear',
            },
            '@keyframes shimmer': {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(100%)' }
            },
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.1) 100%)',
              transform: 'translateY(-5px)',
              transition: 'all 0.3s ease-in-out',
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
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
              <Groups 
                sx={{ 
                  fontSize: 45,
                  color: '#6366f1',
                  filter: 'drop-shadow(0 0 15px rgba(99,102,241,0.6))'
                }}
              />
              <SentimentDissatisfied 
                sx={{ 
                  fontSize: 45,
                  color: '#6366f1',
                  filter: 'drop-shadow(0 0 15px rgba(99,102,241,0.6))'
                }}
              />
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Typography
              variant="h4"
              sx={{
                background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                mb: 3,
                textShadow: '0 0 20px rgba(99,102,241,0.4)',
                letterSpacing: '1px',
              }}
            >
              No Team Available
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '400px',
                margin: '0 auto',
                mb: 4,
                lineHeight: 1.8,
                fontSize: '1.1rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              You haven't been assigned to any team yet. Please wait for team allocation or contact the tournament organizer.
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
                  background: "#6366f1"
                }}
              />
            ))}
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default NoTeamForYou;