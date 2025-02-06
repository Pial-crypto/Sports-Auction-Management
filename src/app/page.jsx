"use client";
import React from "react";
import { Container } from "@mui/material";
import NavBar from "@/components/NavBar/NavBar";
import MainContent from "@/components/MainContent/MainContent";
import Footer from "@/components/Footer/Footer";
import { StyledContainer, ContentWrapper } from "@/style/HomePage";

const Homepage = () => {
  return (
    <StyledContainer>
      <NavBar />
      <Container>
        <ContentWrapper>
          <MainContent />
        </ContentWrapper>
      </Container>
      <Footer />
    </StyledContainer>
  );
};

export default Homepage;
