
import React from "react";
import { 
  Box, 
  Typography, 
  Link, 
  Grid, 
  Container, 
  IconButton, 
  Divider, 
  Card 
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { 
  GitHub, 
  LinkedIn, 
  Twitter, 
  Facebook, 
  Instagram,
  Email,
  Phone,
  LocationOn,
  ArrowUpward
} from "@mui/icons-material";
import { motion } from "framer-motion"; // Make sure to install framer-motion

export const FooterContainer = styled(Box)(({ theme }) => ({
    background: "linear-gradient(135deg, #28313B 0%, #485461 100%)",
    color: "white",
    position: "relative",
    overflow: "hidden",
    minWidth: "100vw",
    paddingTop: theme.spacing(4),
    marginBottom:"0px",
    paddingBottom: theme.spacing(4),
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'linear-gradient(90deg, #3498db 0%, #2ecc71 100%)', // Accent line
    },
  }));
  
 export const FooterSection = styled(Card)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.03)', // Slightly transparent
    backdropFilter: 'blur(10px)',
    padding: theme.spacing(3),
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    height: '100%',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
    },
  }));
  
 export const SocialIcon = styled(IconButton)(({ theme }) => ({
    color: 'white',
    margin: theme.spacing(1),
    transition: 'all 0.3s ease-in-out',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    '&:hover': {
      transform: 'scale(1.2)',
      background: 'rgba(255, 255, 255, 0.1)',
    },
  }));
  
  export const ScrollTopButton = styled(motion.div)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    zIndex: 1000,
  }));