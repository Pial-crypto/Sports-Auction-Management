"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link
} from "@mui/material";
import { Visibility, VisibilityOff, Google, Facebook } from "@mui/icons-material";
import StyledTextField from "@/style/Register";
import { StyledPaper, SocialButton } from "@/style/Register";
import StatsComponent from "@/components/StatComponent/StatComponent";

// Validation Schema
const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", py: 4 }}>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item xs={12} md={5}>
          <StatsComponent />
        </Grid>
        <Grid item xs={12} md={5}>
          <StyledPaper elevation={4}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold" }}>
              Create Account
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => <StyledTextField {...field} label="Full Name" error={!!errors.fullName} helperText={errors.fullName?.message} fullWidth />}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <StyledTextField {...field} label="Email" error={!!errors.email} helperText={errors.email?.message} fullWidth />}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
                  Sign Up
                </Button>
              </Box>
            </form>

            <Divider sx={{ my: 4 }}>Or continue with</Divider>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <SocialButton fullWidth startIcon={<Google />}>
                  Google
                </SocialButton>
              </Grid>
              <Grid item xs={6}>
                <SocialButton fullWidth startIcon={<Facebook />}>
                  Facebook
                </SocialButton>
              </Grid>
            </Grid>

            <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
              Already have an account? <Link href="/signin" sx={{ fontWeight: "bold",color:"white" }}>Sign In</Link>
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
