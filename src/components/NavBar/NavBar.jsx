"use client";
import React from "react";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavBarContainer, StyledButton, LogoContainer, NavLinksContainer } from "@/style/NavBar";

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
