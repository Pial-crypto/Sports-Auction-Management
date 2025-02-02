"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const FeatureBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: theme.spacing(4),
  marginTop: theme.spacing(6),
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: 16,
  padding: theme.spacing(3),
  textAlign: "center",
  backdropFilter: "blur(8px)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

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

const MainContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(5), // Added margin for spacing
  padding: theme.spacing(4, 2),
  textAlign: "center",
}));

const features = [
  { icon: "🏠", title: "HOME", subtitle: "LIVE", description: "Manage your team securely." },
  { icon: "🎮", title: "LIVE AUCTIONS", subtitle: "AI-CIRCUIT", description: "Real-time bidding experience." },
  { icon: "🤖", title: "AI-POWERED", subtitle: "RECOMMENDATIONS", description: "Smart player suggestions." },
  { icon: "ℹ️", title: "ABOUT US", subtitle: "LEARN MORE", description: "Discover our platform." },
];

const MainContent = () => {
  return (
    <MainContainer>
      {/* Auction Info */}
      <ActionCard>
        <Typography variant="h3" component="h1" sx={{ color: "white", mb: 3 }}>
          PLAYER AUCTION
        </Typography>
        <Typography variant="body1" sx={{ color: "#ddd", mb: 4 }}>
          Join live auctions and bid on top players. Experience AI-powered recommendations and secure team management.
        </Typography>
        <StyledButton>GET STARTED</StyledButton>
      </ActionCard>

      {/* Features Section */}
      <FeatureBox>
        {features.map((feature, index) => (
          <FeatureItem key={index}>
            <Typography variant="h2" sx={{ mb: 1 }}>{feature.icon}</Typography>
            <Typography variant="h6" sx={{ color: "white", mb: 1 }}>{feature.title}</Typography>
            <Typography variant="subtitle2" sx={{ color: "#ffcc80", mb: 1 }}>{feature.subtitle}</Typography>
            <Typography variant="body2" sx={{ color: "white" }}>{feature.description}</Typography>
          </FeatureItem>
        ))}
      </FeatureBox>
    </MainContainer>
  );
};

export default MainContent;
