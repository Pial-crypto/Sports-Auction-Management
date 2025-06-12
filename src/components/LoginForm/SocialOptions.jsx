import React, {  } from "react";
import { Box, Button, Divider, Grid } from "@mui/material";
import { Google, Facebook } from '@mui/icons-material';

const SocialOptions=()=>{
    return(
        <Box sx={{ mt: 4 }}>
                    <Divider sx={{ 
                      my: 3, 
                      color: "rgba(255, 255, 255, 0.7)",
                      "&::before, &::after": {
                        borderColor: "rgba(255, 255, 255, 0.2)",
                      },
                    }}>
                      or continue with
                    </Divider>
        
                    {/* Removed Social Login Buttons */}
                  </Box>
    )
}

export default SocialOptions