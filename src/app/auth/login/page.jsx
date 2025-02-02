"use client";
import React, { useState } from "react";
import { Box, Typography, Button, Divider, Grid } from "@mui/material";
import LoginForm from "@/components/LoginForm/LoginForm";
import { StyledPaper } from "@/style/LoginStyle/LoginStyle";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        p: 3,
      }}
    >
      <StyledPaper elevation={4}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
            Login
          </Typography>
        </Box>

        <LoginForm onSubmit={onSubmit} loading={loading} />

        <Box sx={{ mt: 4 }}>
          <Divider sx={{ my: 3, color: "rgba(255, 255, 255, 0.7)" }}>or continue with</Divider>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth>Google</Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth>Facebook</Button>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography sx={{ color: "white" }}>
            Don't have an account? <Button sx={{ textTransform: "none", color: "lightblue" }}>Sign Up</Button>
          </Typography>
        </Box>
      </StyledPaper>
    </Box>
  );
};

export default Login;
