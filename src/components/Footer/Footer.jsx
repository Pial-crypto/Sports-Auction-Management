"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterContainer = styled(Box)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.7)",
  padding: theme.spacing(3),
  textAlign: "center",
  marginTop: theme.spacing(10),
  marginBottom:theme.spacing(10),
  color: "white",
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Typography variant="body2">© 2025 Player Management. All rights reserved.</Typography>
    </FooterContainer>
  );
};

export default Footer;
