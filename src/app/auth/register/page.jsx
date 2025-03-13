"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Container,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
} from "@mui/icons-material";
import {
  FaUserPlus,
  FaTrophy,
  FaFootballBall,
  FaBaseballBall,
} from "react-icons/fa";
import { GiCricketBat, GiWhistle } from "react-icons/gi";
import { MdSportsCricket, MdEmail } from "react-icons/md";
import { BsFillTelephoneFill, BsPeopleFill } from "react-icons/bs";
import { StyledTextField, StyledPaper, SocialButton } from "../../../style/Register";
import StatsComponent from "@/components/StatComponent/StatComponent";
import FloatingIcons from "@/components/SignUp/FloatingSportsIcons";
import TitleAndStats from "@/components/SignUp/TitleAndStats";
import RegisterFormComponent from "@/components/SignUp/Form";


// Validation Schema
const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(11, "Must be exactly 11 digits")
    .max(11, "Must be exactly 11 digits"),
  teamName: yup.string().required("Team name is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain uppercase, lowercase, number and special character"
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
      phone: "",
      teamName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      //  background: "linear-gradient(135deg, #E1E2F1FF 0%, #DEE2E9FF 100%)",
     //   backgroundImage: `url('/bal.jpg')`,
     
        backgroundBlend: "overlay",
        backgroundSize: "cover",
        py: 4,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.0)",
          zIndex: 1
        }
      }}
    >
      {/* Floating Sports Icons */}
     <FloatingIcons></FloatingIcons>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Grid container justifyContent="center" spacing={4}>
          {/* Left Side - Title and Stats */}
          <TitleAndStats></TitleAndStats>

          

          {/* Right Side - Registration Form */}
          <RegisterFormComponent
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      showPassword={showPassword}
      showConfirmPassword={showConfirmPassword}
      togglePassword={() => setShowPassword(!showPassword)}
      toggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
     
    />
        </Grid>
      </Container>
    </Box>
  );
};

export default Register;