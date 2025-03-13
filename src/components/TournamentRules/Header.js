import React from 'react';
import {
  Typography,
} from '@mui/material';
const Header = () => {
  return (
      <Typography variant="h4" component="h1" sx={{ 
                    flexGrow: 1,
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}>
                    Tournament Rules & Regulations
                  </Typography>
  );
}

export default Header;