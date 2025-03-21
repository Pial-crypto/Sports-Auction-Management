"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Divider, Grid, Snackbar, Alert } from "@mui/material";
import LoginForm from "@/components/LoginForm/LoginForm";
import { StyledPaper } from "@/style/LoginStyle/LoginStyle";
import { motion, AnimatePresence } from "framer-motion";
import { Google, Facebook, Sports, SportsBasketball, SportsSoccer, SportsVolleyball } from '@mui/icons-material';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {
  console.log(process.env.GOOGLE_CLIENT_ID,"process.env.GOOGLE_CLIENT_ID")
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router=useRouter()
  const [message, setMessage] = useState(null); // Alert message
  const [severity, setSeverity] = useState("success"); // "success" | "error"
  
  useEffect(() => {
    setMounted(true);
  }, []);



  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(data);
      const loggedUser={email:data.email,password:data.password}
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loggedUser), // ✅ Use `data` instead of `formData`
      });

      console.log("Hey guys");

      const responseData = await res.json();

      if (res.ok) {
        console.log(responseData,"responseData")
        setSeverity("success");
        setMessage("Logged in successful!");
       router.push('/')
       
      } else {
        setSeverity("error");
        console.log(responseData.error,"responseData.error")
        setMessage(responseData.error);
        
        
      }
    } catch (error) {
      console.error("Error:", error);
      setSeverity("error");
        setMessage(responseData.error);
        
    }finally{
      setLoading(false); // Stop loading
    }
  };

  const floatingIcons = [
    { Icon: SportsBasketball, delay: 0, color: '#FF6B6B' },
    { Icon: SportsSoccer, delay: 0.2, color: '#4ECDC4' },
    { Icon: SportsVolleyball, delay: 0.4, color: '#FFD93D' },
    { Icon: Sports, delay: 0.6, color: '#95E1D3' },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {mounted && (
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
          sx={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            maxWidth: "450px",
            width: "100%",
            p: 4,
            borderRadius: "20px",
          }}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ mb: 4, textAlign: "center" }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Welcome Back
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: "rgba(255,255,255,0.7)",
                  mt: 1 
                }}
              >
                Sign in to continue to Sports Auction
              </Typography>
            </Box>
          </motion.div>

          <LoginForm 
            onSubmit={onSubmit} 
            loading={loading}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <Box sx={{ mt: 4 }}>
            <Divider sx={{ 
              my: 3, 
              color: "rgba(255, 255, 255, 0.7)",
              "&::before, &::after": {
                borderColor: "rgba(255, 255, 255, 0.2)",
              },
            }}>
              or continue with
            </Divider>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button onClick={()=>signIn("google")}
                  variant="outlined" 
                  fullWidth
                  startIcon={<Google />}
                  sx={{
                    color: "white",
                    borderColor: "rgba(255,255,255,0.3)",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  startIcon={<Facebook />}
                  sx={{
                    color: "white",
                    borderColor: "rgba(255,255,255,0.3)",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Facebook
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
              Don't have an account?{" "}
              <Link href="/auth/register" passHref>
                <Button 
                  sx={{ 
                    textTransform: "none",
                    color: "#4FC3F7",
                    "&:hover": {
                      color: "#81D4FA",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </Typography>
          </Box>
        </StyledPaper>
      </motion.div>

             {/* Snackbar for Success/Error Messages */}
             <Snackbar open={!!message} autoHideDuration={4000} onClose={() => setMessage(null)}>
  <Alert 
    severity={severity} 
    onClose={() => setMessage(null)} 
    sx={{ maxWidth: "400px" }} // ⬅️ Increase width for readability
  >
    {message}
  </Alert>
</Snackbar>
    </Box>
  );
};

export default Login;
