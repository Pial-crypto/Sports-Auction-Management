"use client";
import React from "react";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import { NavBarContainer, StyledButton } from "@/style/NavBar";

const NavBar = ({ activePage }) => {

  console.log(activePage)
  // Define the menu items in an array
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Tournaments", path: "/TournamentManagement" },
    { label: "Auctions", path: "/Auction" },
    { label: "About", path: "/about" },
    { label: "Profile", path: "/UserDashboard" },
  ];

  return (
    <NavBarContainer position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 2 }}>
          <img src="https://pngimg.com/d/baseball_PNG19056.png" alt="Logo" style={{ height: 40 }} />
          <Typography variant="h6" sx={{ color: "#fff" }}>Player Management</Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {menuItems.map((item) => (
            <Button
            
              key={item.path}
              color="inherit"
              href={item.path}
              sx={{
                backgroundColor: activePage === item.label ? "#ffffff" : "transparent",
                color: activePage === item.label ? "black" : "inherit",
                "&:hover": {
                  color: "black",
                  backgroundColor: "#ffffff",
                },
              }}
            >
              {item.label}
            </Button>
          ))}

          {/* Get Started Button */}
          <StyledButton
            variant="contained"
            sx={{
              "&:hover": {
                backgroundColor: "#ffeb3b",
              },
            }}
          >
            Get Started
          </StyledButton>
        </Box>
      </Toolbar>
    </NavBarContainer>
  );
};

export default NavBar;