"use client";
import { useState } from 'react';

import React from "react";
import { motion } from "framer-motion";
import { Grid, Container } from "@mui/material";
import FloatingIcons from "@/components/SignUp/FloatingSportsIcons";
import TitleAndStats from "@/components/SignUp/TitleAndStats";
import RegisterFormComponent from "@/components/SignUp/Form";

import { BoxContainer } from "@/style/SignUp";



const Register = () => {

 
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  
  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };
  
  return (
    <BoxContainer
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Floating Sports Icons */}
      <FloatingIcons />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Grid container justifyContent="center" spacing={4}>
          {/* Left Side - Title and Stats */}
          <TitleAndStats />

          {/* Right Side - Registration Form */}
          <RegisterFormComponent/>
        </Grid>
      </Container>
    </BoxContainer>
  );
};

export default Register;
