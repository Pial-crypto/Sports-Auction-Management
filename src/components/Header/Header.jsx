"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const ActionCard = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(10px)",
  borderRadius: 20,
  padding: theme.spacing(5),
  maxWidth: 500,
  margin: "0 auto",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)",
}));

const StyledButton = styled("button")(({ theme }) => ({
  background: "linear-gradient(45deg, #ff9800, #ff5722)",
  borderRadius: 25,
  color: "white",
  padding: "12px 45px",
  marginTop: theme.spacing(2),
  cursor: "pointer",
  border: "none",
  fontSize: "16px",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const Header = () => {
  return (
    <ActionCard>
      <Typography variant="h3" component="h1" sx={{ color: "white", mb: 3 }}>
        PLAYER AUCTION
      </Typography>
      <Typography variant="body1" sx={{ color: "#ddd", mb: 4 }}>
        Join live auctions and bid on top players. Experience AI-powered recommendations and secure team management.
      </Typography>
      <StyledButton>GET STARTED</StyledButton>
    </ActionCard>
  );
};

export default Header;
