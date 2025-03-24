import React from "react";
import { Box, Card, Button, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

// Styled Components
export const PageWrapper = styled(Box)(() => ({
  paddingTop: '80px', // Space for NavBar
  minWidth: '100%',
  background: '#f8fafc',
  minHeight: '100vh',
  position: 'relative',
  zIndex: 1,
}));

export const MainCard = styled(motion(Card))(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  color: 'white',
  boxShadow: '0 10px 30px rgba(30, 58, 138, 0.1)',
  marginTop: theme.spacing(2),
}));

export const StatsCard = styled(motion(Card))(({ theme }) => ({
  background: '#ffffff',
  borderRadius: '16px',
  padding: theme.spacing(3),
  textAlign: 'center',
  position: 'relative',
  overflow: 'visible',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
  },
}));

export const PlayerCard = styled(motion(Card))(({ theme }) => ({
  padding: theme.spacing(2.5),
  textAlign: 'center',
  background: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  '& .MuiAvatar-root': {
    width: 70,
    height: 70,
    margin: '0 auto',
    background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
  },
}));

export const GradientButton = styled(Button)(({ theme, color = '#2563eb',disabled }) => ({
  background:disabled ? '#ccc' : `linear-gradient(45deg, ${color}, ${color}CC)`,
  borderRadius: '12px',
  color: disabled ? '#666' : 'white',
  padding: '8px 24px',
  transition: 'all 0.3s ease',
  textTransform: 'none',
  pointerEvents: disabled ? 'none' : 'auto',
  fontWeight: 600,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px ${color}40`,
  },
}));


