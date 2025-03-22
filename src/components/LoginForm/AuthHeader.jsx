import { Box, Typography } from "@mui/material";

const AuthHeader = () => {
  return (
    <Box sx={{ mb: 4, textAlign: "center" }}>
      <Typography
        variant="h4"
        sx={{
          color: "white",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "2px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        Welcome Back
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: "rgba(255,255,255,0.7)",
          mt: 1,
        }}
      >
        Sign in to continue to Sports Auction
      </Typography>
    </Box>
  );
};

export default AuthHeader;
