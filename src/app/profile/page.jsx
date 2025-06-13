"use client"

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Avatar,
  Grid,
  IconButton,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Edit, Save } from '@mui/icons-material';

const DarkCard = styled(Paper)(({ theme }) => ({
  background: '#1a2233',
  borderRadius: 24,
  padding: theme.spacing(3),
  color: 'white',
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
}));

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(session?.user?.name || '');
  const [role, setRole] = useState(session?.user?.role || 'User');
  const [image, setImage] = useState(session?.user?.image || '/default-avatar.png');

  useEffect(() => {
    if (!session) {
      router.push('/auth/login');
    }
  }, [session, router]);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setRole(session.user.role || 'User');
      setImage(session.user.image || '/default-avatar.png');
    }
  }, [session]);

  const handleSave = () => {
    // Here you would typically update the user's profile in your database
    setIsEditing(false);
  };

  if (!session) {
    return null; // Redirecting, so no need to render anything
  }

  return (
    <Box sx={{ p: 4, background: '#0f172a', minHeight: '100vh' }}>
      <DarkCard>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              <Typography variant="h4">My Profile</Typography>
              <IconButton onClick={() => setIsEditing(!isEditing)} sx={{ color: '#06b6d4' }}>
                {isEditing ? <Save /> : <Edit />}
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Avatar
                src={image}
                sx={{
                  width: 180,
                  height: 180,
                  border: '4px solid #06b6d4',
                  margin: 'auto',
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            {isEditing ? (
              <Box>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  margin="normal"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  fullWidth
                  margin="normal"
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
              </Box>
            ) : (
              <Box>
                <Typography variant="h6">Name: {name}</Typography>
                <Typography variant="h6">Role: {role}</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </DarkCard>
    </Box>
  );
};

export default Profile; 