import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";


// import { styled } from "@mui/material/styles";
// import { Box } from "@mui/material";
export const StyledContainer = styled(Box)(() => ({
  background: "linear-gradient(135deg, #E0E6F1 0%, #C5D3E4 100%)", // Light muted blue gradient for a soft, modern feel
  minHeight: "100vh",
  minWidth: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  overflow: "hidden",
  padding: "30px",
  backgroundImage: "url('/bal.jpg')",
// Correct way to reference the image in assets folder
  
  animation: "fadeIn 1.5s ease-in-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
}));


export const ContentWrapper = styled(Box)(() => ({
  width: "100%",
  maxWidth: "1200px",
  padding: "30px",
  background: "rgba(255, 255, 255, 0.8)", // Soft white with light opacity
  backdropFilter: "blur(12px)", // Subtle blur for a clean, modern effect
  borderRadius: "15px", // Smooth rounded corners
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)", // Soft shadow for depth
  marginTop: "30px",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)", // Subtle hover shadow effect
  },
}));
