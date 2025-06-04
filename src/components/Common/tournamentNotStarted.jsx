import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { AccessTime, SportsCricket } from '@mui/icons-material';

const TournamentNotStarted = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
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
            background: 'linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(239,68,68,0.05) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: '20px',
            p: 6,
            textAlign: 'center',
            boxShadow: '0 8px 32px 0 rgba(239,68,68,0.25)',
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
              background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.15), transparent)',
              animation: 'shimmer 2s infinite linear',
            },
            '@keyframes shimmer': {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(100%)' }
            },
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.1) 100%)',
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
            <Box 
              component="span" 
              sx={{ 
                fontSize: '4rem',
                filter: 'drop-shadow(0 0 15px rgba(239,68,68,0.6))',
                mb: 3,
                display: 'inline-block'
              }}
            >
              ⚽
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
                background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                mb: 3,
                textShadow: '0 0 20px rgba(239,68,68,0.4)',
                letterSpacing: '1px',
              }}
            >
              Tournament has not started yet
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
              Please wait for the tournament to begin. We'll notify you when it starts.
            </Typography>
          </motion.div>

          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <AccessTime 
              sx={{ 
                fontSize: 45,
                color: '#ef4444',
                filter: 'drop-shadow(0 0 15px rgba(239,68,68,0.6))'
              }} 
            />
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
                  background: "#ef4444"
                }}
              />
            ))}
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  </motion.div>
);

export default TournamentNotStarted;