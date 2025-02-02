"use client";
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Divider,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { styled, keyframes, alpha } from '@mui/material/styles';
import {
  Visibility,
  VisibilityOff,
  SportsSoccer,
  Google,
  Facebook,
  Gavel,
  EmojiEvents,
  Groups,
  TrendingUp,
  SportsKabaddi,
} from '@mui/icons-material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Glowing animation
const glow = keyframes`
  0% { box-shadow: 0 0 5px #3b82f6; }
  50% { box-shadow: 0 0 20px #3b82f6, 0 0 30px #2563eb; }
  100% { box-shadow: 0 0 5px #3b82f6; }
`;

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  color: 'white',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiInputAdornment-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.primary.dark, 0.3)} 100%)`,
  borderRadius: '50%',
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${glow} 2s infinite`,
  backdropFilter: 'blur(8px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)} 0%, ${alpha(theme.palette.primary.dark, 0.4)} 100%)`,
  },
}));

const StyledIcon = styled(Box)(({ theme }) => ({
  fontSize: 40,
  color: theme.palette.primary.main,
  filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))',
}));

const SocialButton = styled(Button)(({ theme }) => ({
  color: 'white',
  borderColor: alpha(theme.palette.primary.main, 0.3),
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    background: 'rgba(255, 255, 255, 0.1)',
    '& .MuiSvgIcon-root': {
      transform: 'scale(1.1)',
    },
  },
  '& .MuiSvgIcon-root': {
    transition: 'transform 0.3s ease',
    filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))',
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  transition: 'all 0.3s ease',
  animation: `${float} 3s ease-in-out infinite`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  '&:hover': {
    transform: 'translateY(-5px)',
    background: 'rgba(255, 255, 255, 0.15)',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
  },
}));

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [stats, setStats] = useState({
    bidding: 0,
    players: 0,
    tournaments: 0,
    success: 0
  });

  // Animate stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        bidding: prev.bidding < 1000 ? prev.bidding + 50 : 1000,
        players: prev.players < 500 ? prev.players + 25 : 500,
        tournaments: prev.tournaments < 100 ? prev.tournaments + 5 : 100,
        success: prev.success < 95 ? prev.success + 5 : 95
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  // Stats configuration with custom icons
  const statsConfig = [
    {
      icon: SportsKabaddi,
      label: 'Live Bidding',
      gradient: 'linear-gradient(45deg, #3b82f6, #2563eb)',
    },
    {
      icon: Groups,
      label: 'Pro Players',
      gradient: 'linear-gradient(45deg, #4f46e5, #4338ca)',
    },
    {
      icon: EmojiEvents,
      label: 'Tournaments',
      gradient: 'linear-gradient(45deg, #6366f1, #4f46e5)',
    },
    {
      icon: TrendingUp,
      label: 'Success Rate',
      gradient: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
    },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      width: '100vw',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      py: 4,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated Background Elements */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        opacity: 0.1,
        '& > div': {
          position: 'absolute',
          animation: `${float} 6s infinite`,
        },
      }}>
        <SportsSoccer sx={{ fontSize: 100, top: '10%', left: '5%' }} />
        <EmojiEvents sx={{ fontSize: 80, top: '40%', right: '10%' }} />
        <Gavel sx={{ fontSize: 60, bottom: '20%', left: '15%' }} />
      </Box>

      <Grid container justifyContent="center" spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
        {/* Left Side - Welcome Message */}
        <Grid item xs={12} md={5}>
          <Box sx={{ 
            color: 'white', 
            p: 4,
            animation: `${fadeIn} 1s ease-out`
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <SportsSoccer sx={{ fontSize: 40 }} />
              <Typography variant="h4" fontWeight="bold">
                Player Management
              </Typography>
            </Box>
            
            <Typography variant="h3" sx={{ mb: 3, fontWeight: 'bold' }}>
              Join the Future of Sports
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.8)' }}>
              Experience real-time bidding, AI-powered insights, and professional player management.
            </Typography>

            <Grid container spacing={2} sx={{ mb: 4 }}>
              {statsConfig.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <StatCard>
                    <IconWrapper>
                      <StyledIcon as={stat.icon} sx={{ 
                        background: stat.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }} />
                    </IconWrapper>
                    <Typography variant="h4" fontWeight="bold" 
                      sx={{ 
                        background: stat.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}>
                      {stats[Object.keys(stats)[index]]}
                      {index === 3 ? '%' : '+'}
                    </Typography>
                    <Typography variant="body2" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: 500,
                        letterSpacing: '0.5px',
                      }}>
                      {stat.label}
                    </Typography>
                  </StatCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Right Side - Sign Up Form */}
        <Grid item xs={12} md={5}>
          <StyledPaper elevation={4}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>
              Create Account
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Full Name"
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 2,
                    height: 48,
                    background: 'linear-gradient(45deg, #3b82f6 30%, #2563eb 90%)',
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </form>

            <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Or continue with
              </Typography>
            </Divider>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <SocialButton
                  variant="outlined"
                  fullWidth
                  startIcon={
                    <Google sx={{ 
                      color: '#EA4335',
                      fontSize: 24,
                    }} />
                  }
                >
                  Google
                </SocialButton>
              </Grid>
              <Grid item xs={6}>
                <SocialButton
                  variant="outlined"
                  fullWidth
                  startIcon={
                    <Facebook sx={{ 
                      color: '#1877F2',
                      fontSize: 24,
                    }} />
                  }
                >
                  Facebook
                </SocialButton>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Already have an account?{' '}
                <Button
                  color="primary"
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                >
                  Sign In
                </Button>
              </Typography>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default register; 