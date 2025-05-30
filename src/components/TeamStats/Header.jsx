const { Box, Typography } = require("@mui/material");

export const Header=()=>(
           <Box sx={{ mb: 4 }}>
                <Typography 
                  variant="h3" 
                  fontWeight="bold"
                  sx={{
                    background: 'linear-gradient(45deg, #fff, #64b5f6)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 2,
                  }}
                >
                  Team Statistics
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Overall Performance & Analytics
                </Typography>
              </Box>
)