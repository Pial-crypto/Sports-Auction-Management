<<<<<<< HEAD
"use client";
import React from "react";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavBarContainer, StyledButton, LogoContainer, NavLinksContainer } from "@/style/NavBar";
=======
// components/NavBar/NavBar.jsx
import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  Container,
  IconButton,
  useScrollTrigger,
  Slide 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(30, 58, 138, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1, 2),
  borderRadius: '12px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 500,
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
>>>>>>> bf03a49c9d4caa690d73cd325bb47e79a9652fed

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HideOnScroll>
      <StyledAppBar 
        position="fixed" 
        sx={{ 
          background: isScrolled 
            ? 'rgba(30, 58, 138, 0.95)' 
            : 'rgba(30, 58, 138, 0.8)',
          transition: 'all 0.3s ease'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <LogoContainer>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <IconButton 
                  sx={{ 
                    p: 1, 
                    background: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.2)',
                    }
                  }}
                >
                  <SportsSoccerIcon sx={{ fontSize: 28, color: 'white' }} />
                </IconButton>
              </motion.div>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '1px'
                }}
              >
                AUCTIONT
              </Typography>
            </LogoContainer>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {["Home", "Auctions", "Tournament", "About"].map((item) => (
  <motion.div
    key={item}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <NavButton
      href={
        item === "Tournament"
          ? "/TournamentManagement"
          : item === "Home"
          ? "/"
          : `/${item.toLowerCase()}`
      }
    >
      {item}
    </NavButton>
  </motion.div>
))}

              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  sx={{
                    ml: 2,
                    background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '8px 24px',
                    boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #2563eb, #1d4ed8)',
                      boxShadow: '0 6px 20px 0 rgba(59, 130, 246, 0.6)',
                    }
                  }}
                >
                  Get Started
                </Button>
              </motion.div>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </HideOnScroll>
  );
};

export default NavBar;