"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Person, Lock } from "@mui/icons-material";
import { motion } from "framer-motion";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = ({ onSubmit, loading, showPassword, setShowPassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
const submitButtonContainer={
  mt: 2,
  py: 1.5,
  bgcolor: "#4FC3F7",
  fontSize: "1rem",
  fontWeight: "bold",
  textTransform: "none",
  borderRadius: "10px",
  boxShadow: "0 4px 15px rgba(79, 195, 247, 0.3)",
  "&:hover": {
    bgcolor: "#81D4FA",
    boxShadow: "0 6px 20px rgba(79, 195, 247, 0.4)",
  },
}
  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      borderRadius: "10px",
      background: "transparent",
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.2)",
        borderWidth: "1px",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255,255,255,0.4)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4FC3F7",
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.7)",
      "&.Mui-focused": {
        color: "#4FC3F7",
      },
    },
    "& .MuiInputAdornment-root": {
      "& .MuiSvgIcon-root": {
        color: "#4FC3F7",
      },
    },
    "& .MuiIconButton-root": {
      marginRight: "-10px",
      background: "transparent",
      "&:hover": {
        background: "transparent",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
            sx={textFieldSx}
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Box 
                      sx={{ 
                        fontSize: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "24px",
                        height: "24px",
                      }}
                    >
                      {showPassword ? "🙈" : "🐵"}
                    </Box>
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={textFieldSx}
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={submitButtonContainer}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </motion.div>
      </Box>
    </form>
  );
};

export default LoginForm;
