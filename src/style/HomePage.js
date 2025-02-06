import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledContainer = styled(Box)({
  background: "linear-gradient(135deg, #1a2980 0%, #26d0ce 100%)",
  minHeight: "100vh",
  minWidth: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  overflow: "hidden",
  padding: "20px",
  animation: "fadeIn 1.5s ease-in-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
});

export const ContentWrapper = styled(Box)({
  width: "100%",
  maxWidth: "1200px",
  padding: "20px",
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "15px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  marginTop: "20px",
});
