"use client"

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Collapse,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListSubheader,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandMore, Home, Assessment, Edit, ExitToApp, Group, SportsEsports } from '@mui/icons-material';

// Styled components
const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
}));

const ExpandMoreButton = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const drawerWidth = 240;

const Dashboard = () => {
  const [role, setRole] = useState('Player'); // Change this to 'Organizer', 'Player', or 'Manager'
  const [expanded, setExpanded] = useState(false);
  const [selectedSection, setSelectedSection] = useState('Profile');

  // Demo data
  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
  ];

  const previousData = {
    Player: {
      achievements: ['MVP 2021', 'Top Scorer 2020'],
      age: 25,
      previousTeams: ['Team A', 'Team B'],
      previousTournaments: ['Tournament X', 'Tournament Y'],
    },
    Organizer: {
      achievements: ['Best Organizer 2021'],
      age: 35,
      previousTournaments: ['Tournament A', 'Tournament B'],
    },
    Manager: {
      achievements: ['Manager of the Year 2020'],
      age: 40,
      managedTeams: ['Team X', 'Team Y'],
    },
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const renderContent = () => {
    const data = previousData[role];
    switch (selectedSection) {
      case 'Profile':
        return (
          <>
            <Grid item xs={12} md={4}>
              <StatsCard elevation={2}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>{role.charAt(0)}</Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight="bold">{role} Profile</Typography>
                    <Typography color="textSecondary" fontWeight="bold">Name: {role} Name</Typography>
                    <Typography color="textSecondary" fontWeight="bold">Age: {data.age}</Typography>
                    <Typography color="textSecondary" fontWeight="bold">Achievements: {data.achievements.join(', ')}</Typography>
                  </Box>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Box>
              </StatsCard>
            </Grid>
            <Grid item xs={12} md={8}>
              <StatsCard elevation={2}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  {role === 'Player' ? 'Performance Statistics' : role === 'Organizer' ? 'Events Overview' : 'Team Overview'}
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  {role === 'Player' ? (
                    <BarChart data={chartData}>
                      <Bar dataKey="value" fill="#1976d2" />
                      <XAxis dataKey="name" />
                      <YAxis />
                    </BarChart>
                  ) : (
                    <LineChart data={chartData}>
                      <Line type="monotone" dataKey="value" stroke="#1976d2" />
                      <XAxis dataKey="name" />
                      <YAxis />
                    </LineChart>
                  )}
                </ResponsiveContainer>
                <CardActions disableSpacing>
                  <Typography variant="body1" fontWeight="bold">
                    {role === 'Player' ? 'Previous Teams & Tournaments' : role === 'Organizer' ? 'Previous Tournaments' : 'Managed Teams'}
                  </Typography>
                  <ExpandMoreButton
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMoreButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <List
                      subheader={<ListSubheader>Details</ListSubheader>}
                      sx={{ maxHeight: 200, overflow: 'auto' }}
                    >
                      {role === 'Player' && (
                        <>
                          {data.previousTeams.map((team, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <Group color="primary" />
                              </ListItemIcon>
                              <ListItemText primary={`Team: ${team}`} />
                            </ListItem>
                          ))}
                          {data.previousTournaments.map((tournament, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <SportsEsports color="secondary" />
                              </ListItemIcon>
                              <ListItemText primary={`Tournament: ${tournament}`} />
                            </ListItem>
                          ))}
                        </>
                      )}
                      {role === 'Organizer' && (
                        data.previousTournaments.map((tournament, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <SportsEsports color="secondary" />
                            </ListItemIcon>
                            <ListItemText primary={`Tournament: ${tournament}`} />
                          </ListItem>
                        ))
                      )}
                      {role === 'Manager' && (
                        data.managedTeams.map((team, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <Group color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={`Team: ${team}`} />
                          </ListItem>
                        ))
                      )}
                    </List>
                  </CardContent>
                </Collapse>
              </StatsCard>
            </Grid>
          </>
        );
      case 'Statistics':
        return (
          <Grid item xs={12}>
            <StatsCard elevation={2}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Detailed Statistics
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <Line type="monotone" dataKey="value" stroke="#1976d2" />
                  <XAxis dataKey="name" />
                  <YAxis />
                </LineChart>
              </ResponsiveContainer>
            </StatsCard>
          </Grid>
        );
      case 'EditProfile':
        return (
          <Grid item xs={12}>
            <StatsCard elevation={2}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Edit Profile
              </Typography>
              <Typography paragraph>
                Here you can edit your profile details.
              </Typography>
            </StatsCard>
          </Grid>
        );
      case 'Logout':
        return (
          <Grid item xs={12}>
            <StatsCard elevation={2}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Logout
              </Typography>
              <Typography paragraph>
                You have been logged out.
              </Typography>
            </StatsCard>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            User Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: 'background.default' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button selected={selectedSection === 'Profile'} onClick={() => handleSectionChange('Profile')}>
              <ListItemIcon>
                <Home color="primary" />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button selected={selectedSection === 'Statistics'} onClick={() => handleSectionChange('Statistics')}>
              <ListItemIcon>
                <Assessment color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Statistics" />
            </ListItem>
            <ListItem button selected={selectedSection === 'EditProfile'} onClick={() => handleSectionChange('EditProfile')}>
              <ListItemIcon>
                <Edit color="action" />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" />
            </ListItem>
            <ListItem button selected={selectedSection === 'Logout'} onClick={() => handleSectionChange('Logout')}>
              <ListItemIcon>
                <ExitToApp color="error" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'background.paper' }}>
        <Toolbar />
        <Grid container spacing={3}>
          {renderContent()}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;