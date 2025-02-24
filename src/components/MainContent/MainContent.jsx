"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const FeatureBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",  // Slightly more balanced grid
  gap: theme.spacing(4),
  marginTop: theme.spacing(6),
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.15)",  // Lighter background with some transparency
  borderRadius: 16,
  padding: theme.spacing(3),
  textAlign: "center",
  backdropFilter: "blur(8px)",  // Soft blur for modern feel
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",  // Slight shadow for depth
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",  // Increased shadow on hover for emphasis
  },
}));

const ActionCard = styled(Box)(({ theme }) => ({
  background: "linear-gradient(45deg, #2196f3, #21cbf3)",  // Smooth gradient for a modern effect
  borderRadius: "16px",  // Rounded corners for a softer, contemporary feel
  padding: theme.spacing(5),
  maxWidth: 500,
  margin: "0 auto",
  marginTop: theme.spacing(0),
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(10px)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",  // Slight scaling on hover for interaction
  },
}));

const StyledButton = styled("button")(({ theme }) => ({
  background: "linear-gradient(45deg, #ff9800, #ff5722)",  // Vibrant button colors
  borderRadius: "30px",
  color: "white",
  padding: "14px 50px",
  marginTop: theme.spacing(3),
  cursor: "pointer",
  border: "none",
  fontSize: "18px",
  fontWeight: "600",  // Bold text for emphasis
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
  },
  "&:focus": {
    outline: "none",
  },
}));

const MainContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(10),
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
        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: "#fff",  // Light color on gradient background for contrast
            fontWeight: "700",
            mb: 3,
            fontSize: "2.25rem",
            letterSpacing: "0.5px",
          }}
        >
          PLAYER AUCTION
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#f1f1f1",  // Slightly lighter text color
            mb: 4,
            fontSize: "1.1rem",
            lineHeight: "1.6",
            fontWeight: "400",
          }}
        >
          Join live auctions and bid on top players. Experience AI-powered recommendations and secure team management.
        </Typography>
        <StyledButton>GET STARTED</StyledButton>
      </ActionCard>

      {/* Features Section */}
      <FeatureBox>
        {features.map((feature, index) => (
          <FeatureItem key={index}>
            <Typography
              variant="h2"
              sx={{
                color: "#2196f3",  // Highlight the icons with blue for visual consistency
                mb: 1,
                fontWeight: "700",
              }}
            >
              {feature.icon}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#333",
                mb: 1,
                fontWeight: "800",
                textTransform: "uppercase",
                fontSize: "1.1rem",
              }}
            >
              {feature.title}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#333",
                mb: 1,
                fontWeight: "600",
                fontStyle: "italic",  // Soft emphasis for subtitles
              }}
            >
              {feature.subtitle}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#333",
                lineHeight: 1.7,
                fontWeight: "400",
              }}
            >
              {feature.description}
            </Typography>
          </FeatureItem>
        ))}
      </FeatureBox>

      <div style={{ height: 15}} />
    </MainContainer>
  );
};

export default MainContent;
