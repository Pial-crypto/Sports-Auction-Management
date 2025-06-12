"use client";
// import { supabase } from '@/utils/supabaseClient';
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Divider, Grid, Snackbar, Alert } from "@mui/material";
import LoginForm from "@/components/LoginForm/LoginForm";
import { StyledPaper } from "@/style/LoginStyle/LoginStyle";
import { motion, AnimatePresence } from "framer-motion";
import { Google, Facebook, Sports, SportsBasketball, SportsSoccer, SportsVolleyball } from '@mui/icons-material';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SocialOptions from "@/components/LoginForm/SocialOptions";
import AuthFooter from "@/components/LoginForm/AuthFooter";
import storage from "@/class/storage";
import AuthHeader from "@/components/LoginForm/AuthHeader";
import FloatingIcons from "@/components/SignUp/FloatingSportsIcons";
import { ValidateLogin } from "@/function/validateLogin";
import SnackbarAlert from "@/components/LoginForm/SnackBarComponent";

const Login = () => {
  // console.log(process.env.GOOGLE_CLIENT_ID,"process.env.GOOGLE_CLIENT_ID")
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router=useRouter()
  const [message, setMessage] = useState(null); // Alert message
  const [severity, setSeverity] = useState("success"); // "success" | "error"
  

  const containerStyles = {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)",
    position: "relative",
    overflow: "hidden",
  };


  const paperContainer={
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    maxWidth: "450px",
    width: "100%",
    p: 4,
    borderRadius: "20px",
  }
  useEffect(() => {
    setMounted(true);
  }, []);



  const onSubmit = async (data) => {
    await ValidateLogin({
      data,
      setLoading,
      setSeverity,
      setMessage,
      router,
    });
   
  };

  const floatingIcons = [
    { Icon: SportsBasketball, delay: 0, color: '#FF6B6B' },
    { Icon: SportsSoccer, delay: 0.2, color: '#4ECDC4' },
    { Icon: SportsVolleyball, delay: 0.4, color: '#FFD93D' },
    { Icon: Sports, delay: 0.6, color: '#95E1D3' },
  ];

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <Box
      sx={containerStyles}
    >
      {mounted && (
        //  <FloatingIcons floatingIcons={floatingIcons}></FloatingIcons>
        <AnimatePresence>
          {floatingIcons.map(({ Icon, delay, color }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -50 }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                y: [0, -30, 0],
                x: [0, 20, 0],
              }}
              transition={{
                duration: 3,
                delay: delay,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                position: "absolute",
                top: `${Math.floor(Math.random() * 70 + 10)}%`,
                left: `${Math.floor(Math.random() * 70 + 10)}%`,
                color: color,
                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
              }}
            >
              <Icon sx={{ fontSize: 50 }} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <StyledPaper 
          elevation={4}
          sx={paperContainer}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
         <AuthHeader></AuthHeader>
          </motion.div>

          <LoginForm 
            onSubmit={onSubmit} 
            loading={loading}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <SocialOptions></SocialOptions>

          {/* Google Sign-In Button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<Google />}
            onClick={handleGoogleSignIn}
            sx={{ mt: 2, width: '100%' }}
          >
            Sign in with Google
          </Button>

        <AuthFooter></AuthFooter>

        
        </StyledPaper>
      </motion.div>


             {/* Snackbar for Success/Error Messages */}
             <SnackbarAlert message={message} severity={severity} setMessage={setMessage}></SnackbarAlert>

    </Box>
  );
};

export default Login;
