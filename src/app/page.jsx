// src/app/Homepage.jsx or your relevant page file

"use client";
import React from "react";
import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic";

// Dynamically import NavBar with SSR disabled
const NavBar = dynamic(() => import('@/components/NavBar/NavBar'), { ssr: false });
import MainContent from "@/components/MainContent/MainContent";
import Footer from "@/components/Footer/Footer";

const StyledContainer = styled(Box)(() => ({
  background: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
  minHeight: "100vh",
  minWidth: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
}));

const Homepage = () => {
  return (
    <StyledContainer>
      <NavBar />
      <Container>
        <MainContent />
      </Container>
      <Footer />
    </StyledContainer>
  );
};

export default Homepage;
