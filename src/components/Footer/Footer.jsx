"use client";
import React from "react";
import { 
  Typography, 
  Grid, 
  Container, 
  IconButton, 
  Divider} from "@mui/material";
import { 
  ArrowUpward
} from "@mui/icons-material";
import { FooterContainer,ScrollTopButton } from "@/style/Footer";
import CompanyInfo from "./CompanyInfo";
import QuickLinks from "./QuickLinks";
import NewsLetterSection from "./NewsLetterSection";


const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info Section */}
       
<CompanyInfo></CompanyInfo>
          {/* Quick Links Section */}
        
<QuickLinks></QuickLinks>
          {/* Newsletter Section */}
         <NewsLetterSection></NewsLetterSection>
        </Grid>

        <Divider  sx={{ my:2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Copyright Text with reduced gap */}
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          © {new Date().getFullYear()} Player Management. All rights reserved.
        </Typography>
      </Container>

      <ScrollTopButton
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <IconButton
          onClick={scrollToTop}
          sx={{
            backgroundColor: 'white',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
          }}
        >
          <ArrowUpward />
        </IconButton>
      </ScrollTopButton>
    </FooterContainer>
  );
};

export default Footer;
