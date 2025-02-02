"use client";
import React from "react";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const NavBarContainer = styled(AppBar)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(10px)",
  boxShadow: "none",
  padding: theme.spacing(1, 2),
  borderRadius: "10px",
  marginTop: theme.spacing(2),
  width: "90%",
}));

const StyledButton = styled(Button)({
  background: "linear-gradient(45deg, #ff9800, #ff5722)",
  borderRadius: 25,
  color: "white",
  padding: "8px 20px",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const NavBar = () => {
  return (
    <NavBarContainer position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 2 }}>
          <img src="https://pngimg.com/d/baseball_PNG19056.png" alt="Logo" style={{ height: 40 }} />
          <Typography variant="h6" sx={{ color: "#fff" }}>Player Management</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Tournaments</Button>
          <Button color="inherit">Auctions</Button>
          <Button color="inherit">About</Button>
          <StyledButton variant="contained">Get Started</StyledButton>
        </Box>
      </Toolbar>
    </NavBarContainer>
  );
};

export default NavBar;
