"use client";
import React, { useState } from "react";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import { NavBarContainer, StyledButton } from "@/style/NavBar";
import { useEffect } from "react";
import { LoginStatus } from "@/function/checekLoginStatus";
const NavBar = ({ activePage }) => {

 // console.log(activePage)

  const [isLoggedIn,setIsLoggedIn]=useState(false);
 // console.log("Is logged in",isLoggedIn)


  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await LoginStatus();
      if (isLoggedIn) {
       setIsLoggedIn(true)
      } else {
        // Handle logged-out behavior
        //console.log("User is not logged in");
        
      }
    };

    checkLogin();  // Call the function on page load
  }, []);


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
              href={ item.path!='Home' && !isLoggedIn?"/auth/login":item.path}
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