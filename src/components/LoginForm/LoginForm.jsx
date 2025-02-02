import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  CircularProgress,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Typography
} from "@mui/material";
import { StyledTextField, LoginButton } from "@/style/LoginStyle/LoginStyle";

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = ({ onSubmit, loading }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <StyledTextField
              {...field}
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span style={{ color: "#1976d2" }}>📧</span>
                  </InputAdornment>
                ),
              }}
            />
          )}
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
                startAdornment: (
                  <InputAdornment position="start">
                    <span style={{ color: "#1976d2" }}>🔒</span>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? "🙈" : "👁️"}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <FormControlLabel
            control={<Checkbox sx={{ color: "rgba(255, 255, 255, 0.7)" }} />}
            label={<Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>Remember me</Typography>}
          />
        </Box>

        <LoginButton type="submit" variant="contained" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Login"}
        </LoginButton>
      </Box>
    </form>
  );
};

export default LoginForm;
