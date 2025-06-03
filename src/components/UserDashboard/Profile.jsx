import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  TextField,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Edit,
  CameraAlt,
  Lock,
  CalendarToday,
  AccessTime,
  Email,
  Person,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { GlassCard } from "@/style/UserDashboard";
import moment from "moment";
import { formatDateOnly, formatTimeOnly, getMembershipDuration, UpdateProfile } from "@/function/handleUserDashboard";
import storage from "@/class/storage";
import fetchAllUsers from "@/function/fetchAllUser";

export const RenderProfile = ({user}) => {
  const [createdAt,setCreatedAt]=useState('')
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar || null);
  const [editedUser, setEditedUser] = useState({
    name: user.name || "User Name",
    email: user.email || "user@example.com",
  });

  fetchAllUsers().then((data)=>{
    data.find((item)=>{if(item.id===user.id)
    {
      setCreatedAt(item.createdAt)
    }
    
  })
  })


  console.log("Createdat",createdAt)
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Get random color for avatar
  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  };

  // Form validation
  const validateForm = () => {
    if (!editedUser.name?.trim()) {
      setError("Name is required");
      return false;
    }
    if (!editedUser.email?.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(editedUser.email)) {
      setError("Invalid email format");
      return false;
    }
    // Only validate changed fields
    if (editedUser.name === user.name && editedUser.email === user.email) {
      setError("No changes made");
      return false;
    }
    return true;
  };


const handleProfileUpdate = async () => {
  if (!validateForm()) return;
  
  setLoading(true);
  setError("");
  
  try {
    const updateData = {
      id: user.id,
      name: editedUser.name.trim(),
      email: editedUser.email.trim()
    };

    // Add avatar only if it exists and has changed
    if (avatar && avatar !== user.avatar) {
      updateData.avatar = avatar;
    }

    console.log("Sending update data:", updateData);
    const result = await UpdateProfile(updateData);
    
    if (result.success) {
   setSuccess("Profile updated successfully!");
      // Update local state with the returned data
      setEditedUser(result.data);
      // Update any other state that shows user data
      setEditing(false);

      // Update parent component's user data
      if (typeof window !== 'undefined') {
        const localUser = storage.get('user');
        storage.set('user', {
          ...localUser,
          name: updateData.name,
          email: updateData.email
        });
      }
      
      setEditing(false);
    } else {
      setError(result.error || "Failed to update profile");
    }
  } catch (err) {
    console.error("Profile update error:", err);
    setError("Failed to update profile. Please try again.");
  } finally {
    setLoading(false);
  }
};
  // Handle password reset
  const handlePasswordReset = async () => {
    if (!validatePasswords()) return;

    setLoading(true);
    setError("");
    
    try {
      const updateData = {
        id: user.id,
        currentPassword: passwords.current,
        password: passwords.new
      };

      const result = await UpdateProfile(updateData);
      
      if (result.success) {
        setSuccess("Password updated successfully!");
        setPasswordDialog(false);
        setPasswords({ current: "", new: "", confirm: "" });
      } else {
        setError(result.error || "Failed to update password");
      }
    } catch (err) {
      console.error("Password update error:", err);
      setError("Failed to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add password validation function
  const validatePasswords = () => {
    console.log("password",passwords)
    console.log(storage.get('user').password)
    if (!passwords.current) {
      setError("Current password is required");
      return false;
    }
    if (!passwords.new) {
      setError("New password is required");
      return false;
    }
    if (passwords.new !== passwords.confirm) {
      setError("New passwords don't match");
      return false;
    }
    if (passwords.new.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if(passwords.current!=storage.get('user').password){
      setError("Current password is wrong");
       return false;
    }

     if(passwords.new===storage.get('user').password){
      console.log("Both are same")
      setError("Must enter a new password to reset");
       return false;
    }
    return true;
  };


  // Rest of the JSX remains the same...
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard 
        sx={{ 
          p: 4,
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(66, 165, 245, 0.1) 100%)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        {(error || success) && (
          <Alert 
            severity={error ? "error" : "success"} 
            sx={{ mb: 2 }}
            onClose={() => {setError(""); setSuccess("");}}
          >
            {error || success}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Left Column - Avatar & Basic Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar
                    src={avatar}
                    sx={{
                      width: 150,
                      height: 150,
                      margin: '0 auto',
                      bgcolor: avatar ? 'transparent' : stringToColor(editedUser.name),
                      fontSize: '3rem',
                      fontWeight: 'bold',
                      border: '4px solid white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  >
                    {!avatar && getInitials(editedUser.name)}
                  </Avatar>
                </Box>
              </motion.div>

              <Typography variant="h5" sx={{ mt: 3, fontWeight: 'bold' }}>
                {editedUser.name}
              </Typography>
              <Chip
                label={user.role?.toUpperCase()}
                color="primary"
                sx={{ mt: 1, mb: 2 }}
              />

              {/* Joined Info */}
              <Box sx={{ mt: 3, textAlign: 'left' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  <CalendarToday sx={{ mr: 1, fontSize: 'small' }} />
                  Joined: {createdAt && formatDateOnly(createdAt)}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  <AccessTime sx={{ mr: 1, fontSize: 'small' }} />
                  Time: { createdAt && formatTimeOnly(createdAt)}
                </Typography>
                <Typography variant="subtitle2" color="primary">
                  Member for {getMembershipDuration(createdAt)} days
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Column - Profile Details */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Profile Details</Typography>
              <Box>
                <Button 
                  startIcon={<Lock />}
                  onClick={() => setPasswordDialog(true)}
                  sx={{ mr: 1 }}
                >
                  Reset Password
                </Button>
                <Button 
                  startIcon={editing ? null : <Edit />}
                  onClick={() => editing ? handleProfileUpdate() : setEditing(true)}
                  variant={editing ? "contained" : "outlined"}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : editing ? "Save Changes" : "Edit Profile"}
                </Button>
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={editing ? editedUser.name : user.name}
                  onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                  error={editing && !editedUser.name}
                  helperText={editing && !editedUser.name ? "Name is required" : ""}
                  InputProps={{
                    readOnly: !editing,
                    startAdornment: <Person sx={{ mr: 1, color: 'primary.main' }} />
                  }}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={editing ? editedUser.email : user.email}
                  onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                  error={editing && (!editedUser.email || !/\S+@\S+\.\S+/.test(editedUser.email))}
                  helperText={
                    editing && (!editedUser.email 
                      ? "Email is required" 
                      : !/\S+@\S+\.\S+/.test(editedUser.email) 
                        ? "Invalid email format" 
                        : ""
                    )
                  }
                  InputProps={{
                    readOnly: !editing,
                    startAdornment: <Email sx={{ mr: 1, color: 'primary.main' }} />
                  }}
                  disabled={loading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Password Reset Dialog */}
        <Dialog 
          open={passwordDialog} 
          onClose={() => !loading && setPasswordDialog(false)}
          PaperProps={{
            sx: {
              width: '100%',
              maxWidth: 400,
              p: 2
            }
          }}
        >
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              type="password"
              label="Current Password"
              value={passwords.current}
              onChange={(e) => setPasswords({...passwords, current: e.target.value})}
              sx={{ mt: 2, mb: 2 }}
              error={!passwords.current}
              helperText={!passwords.current ? "Current password is required" : ""}
            />
            <TextField
              fullWidth
              type="password"
              label="New Password"
              value={passwords.new}
              onChange={(e) => setPasswords({...passwords, new: e.target.value})}
              sx={{ mb: 2 }}
              error={passwords.new.length > 0 && passwords.new.length < 6}
              helperText={
                passwords.new.length > 0 && passwords.new.length < 6 
                  ? "Password must be at least 6 characters" 
                  : ""
              }
            />
            <TextField
              fullWidth
              type="password"
              label="Confirm New Password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
              error={passwords.new !== passwords.confirm && passwords.confirm.length > 0}
              helperText={
                passwords.new !== passwords.confirm && passwords.confirm.length > 0 
                  ? "Passwords don't match" 
                  : ""
              }
            />
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setPasswordDialog(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePasswordReset}
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Update Password"}
            </Button>
          </DialogActions>
        </Dialog>
      </GlassCard>
    </motion.div>
  );
};