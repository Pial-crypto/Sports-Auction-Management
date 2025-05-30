const { Box, CircularProgress, Typography } = require("@mui/material");

export const LoadingStage=()=>(
      <Box 
          sx={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0,0,0,0.8)',
            zIndex: 9999,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} sx={{ color: '#fff' }} />
            <Typography sx={{ mt: 2, color: '#fff' }}>
              Loading Statistics...
            </Typography>
          </Box>
        </Box>
)