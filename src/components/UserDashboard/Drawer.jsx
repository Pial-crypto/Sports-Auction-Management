const { StyledListItem } = require("@/style/UserDashboard");
const { Stars, Home, Assessment, Edit, ExitToApp } = require("@mui/icons-material");
const { Box, Avatar, Typography, Chip, Divider, List, ListItemIcon, ListItemText, Drawer } = require("@mui/material");
import { drawerWidth } from "@/style/UserDashboard";
const sidebarItems = [
  { label: "Dashboard", icon: <Home /> },
  { label: "Statistics", icon: <Assessment /> },
  { label: "Profile", icon: <Edit /> },
  { label: "Logout", icon: <ExitToApp /> },
];

export const DrawerComponent=({user,handleSectionChange,selectedSection})=>(
    <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
        background: 'linear-gradient(180deg, #1976d2 0%, #1565c0 100%)',
      },
    }}
  >
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              margin: '0 auto',
              bgcolor: '#fff',
              color: '#1976d2'
            }}
          >
            <Stars />
          </Avatar>
          <Typography variant="h6" sx={{ color: '#fff', mt: 2 }}>
            {user.name}
          </Typography>
          <Chip
            label={user.role?.toUpperCase()}
            sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.1)', color: '#fff' }}
          />
        </Box>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
      <List>
      {sidebarItems.map((item) => (
        <StyledListItem
          component="li" // Changed from button prop
          onClick={() => handleSectionChange(item.label)}
          key={item.label}
          selected={selectedSection === item.label}
          sx={{
            cursor: 'pointer', // Add pointer cursor
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </StyledListItem>
      ))}
    </List>
      </Drawer>
)