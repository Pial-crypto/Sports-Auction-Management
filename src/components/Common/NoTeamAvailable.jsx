import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Groups, EmojiPeople } from '@mui/icons-material';

export const NoTeamAvailable = () => {
  return (
    <Box
      sx={{
        minHeight: '70vh',
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(14,165,233,0.05) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(56,189,248,0.2)',
            borderRadius: '24px',
            p: 6,
            textAlign: 'center',
            maxWidth: '600px',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '200%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.15), transparent)',
              animation: 'shimmer 2.5s infinite linear',
            },
            '@keyframes shimmer': {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(100%)' }
            }
          }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 4 }}>
              <Groups sx={{ 
                fontSize: 50,
                color: '#38bdf8',
                filter: 'drop-shadow(0 0 12px rgba(56,189,248,0.5))'
              }} />
              <EmojiPeople sx={{ 
                fontSize: 50,
                color: '#38bdf8',
                filter: 'drop-shadow(0 0 12px rgba(56,189,248,0.5))'
              }} />
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Typography
              variant="h4"
              sx={{
                background: 'linear-gradient(45deg, #38bdf8, #0ea5e9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                mb: 3,
                textShadow: '0 0 20px rgba(56,189,248,0.3)',
                letterSpacing: '0.5px',
              }}
            >
              Waiting for Team Assignment
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '450px',
                margin: '0 auto',
                mb: 4,
                lineHeight: 1.8,
                fontSize: '1.1rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
        You don't have any team for this tournament yet. Start auction to begin the tournament and assign players to their respective teams." 
                
            </Typography>
          </motion.div>

          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '2rem'
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
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#38bdf8'
                }}
              />
            ))}
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default NoTeamAvailable;