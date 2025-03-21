"use client";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { Visibility, VisibilityOff, Lock, LockOpen } from "@mui/icons-material";
import { validateForm } from "@/function/validateForm";
import { Person, AdminPanelSettings, Work } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Snackbar,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
  Link,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
} from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import { FaUserPlus } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { StyledTextField, StyledPaper, SocialButton } from "@/style/Register";
import { data } from "react-router-dom";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const RegisterFormComponent = () => {

   const router=useRouter()
   const [message, setMessage] = useState(null); // Alert message
   const [severity, setSeverity] = useState("success"); // "success" | "error"
   const [loading, setLoading] = useState(false); // Loading state
   const onSubmit = async (data) => {
    console.log(data);
    const newUser={name:data.fullName,email:data.email,password:data.password,role:data.role}

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser), // ✅ Use `data` instead of `formData`
      });

      console.log("Hey guys");

      const responseData = await res.json();

      if (res.ok) {
        setSeverity("success");
        setMessage("Registration successful!");
       router.push('/')
      } else {
        setSeverity("error");
        setMessage(responseData.error);
        
       // setMessage(responseData.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setSeverity("error");
      setMessage("Registration failed. Please try again.");
     

    }finally{
      setLoading(false); // Stop loading
    }
  };
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validateForm),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "player", // ✅ Ensure role has a default value
    }
  });

  const roles = [
    { value: "organizer", label: "🏆 Tournament Organizer" },
    { value: "player", label: "⚡ Player" },
    { value: "manager", label: "👔 Team Manager" },
  ];

  return (
    <Grid item xs={12} md={6}>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <StyledPaper
          elevation={6}
          sx={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: 3,
            p: 4,
          }}
        >
   <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              
              {/* Full Name Field */}
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <motion.div variants={itemVariants}>
                    <StyledTextField
                      {...field}
                      label="Full Name"
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaUserPlus />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>
                )}
              />

              {/* Email Field */}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <motion.div variants={itemVariants}>
                    <StyledTextField
                      {...field}
                      label="Email Address"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MdEmail />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <motion.div variants={itemVariants}>
                    <StyledTextField
                      {...field}
                      label="Password"
                      type="password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>
                )}
              />

              {/* Confirm Password Field */}
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <motion.div variants={itemVariants}>
                    <StyledTextField
                      {...field}
                      label="Confirm Password"
                      type="password"
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOpen />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>
                )}
              />

              {/* Role Selection - ✅ Fixed the issue */}
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <motion.div variants={itemVariants}>
                    <FormControl fullWidth>
                      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: "#333" }}>
                        Select Your Role 🎭
                      </Typography>
                      <RadioGroup {...field} value={field.value ?? ""} sx={{ gap: 1 }}>
                        {roles.map((role) => {
                          const Icon = role.value === "admin" ? AdminPanelSettings : role.value === "user" ? Person : Work;
                          return (
                            <FormControlLabel
                              key={role.value}
                              value={role.value}
                              control={
                                <Radio
                                  sx={{
                                    color: "#1976D2",
                                    "&.Mui-checked": { color: "#1565C0" },
                                  }}
                                />
                              }
                              label={
                                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                  <Icon fontSize="small" sx={{ color: "#1565C0" }} /> {role.label}
                                </Typography>
                              }
                            />
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                  </motion.div>
                )}
              />

              {/* Submit Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 2,
                    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    height: "56px",
                    fontSize: "1.1rem",
                    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                  }}
                >
                      {loading ? <CircularProgress size={24} /> : " 🚀 Create Account"}
                 
                </Button>
              </motion.div>
            </Box>
          </form>

          <Divider sx={{ my: 4 }}>Or continue with</Divider>

                {/* Social Login Buttons */}
                <Grid container spacing={2}>
            <Grid item xs={6}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <SocialButton
                  fullWidth
                  startIcon={<Google />}
                  sx={{
                    background: "linear-gradient(45deg, #4285f4 30%, #34a853 90%)",
                  }}
                >
                  Google
                </SocialButton>
              </motion.div>
            </Grid>
            <Grid item xs={6}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <SocialButton
                  fullWidth
                  startIcon={<Facebook />}
                  sx={{
                    background: "linear-gradient(45deg, #3b5998 30%, #2196f3 90%)",
                  }}
                >
                  Facebook
                </SocialButton>
              </motion.div>
            </Grid>
          </Grid>

          <Typography variant="body1" sx={{ mt: 4, textAlign: "center" }}>
            Already have an account?{" "}
            <Link href="/auth/login" sx={{ fontWeight: "bold", color: "#1a237e", textDecoration: "none" }}>
              Sign In
            </Link>
          </Typography>
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

    </Grid>
  );
};

export default RegisterFormComponent;
