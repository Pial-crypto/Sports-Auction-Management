import React, {  } from "react";
import { Box, Button, Divider, Grid } from "@mui/material";
import { Google, Facebook } from '@mui/icons-material';
// import { supabase } from '@/utils/supabaseClient';

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
        
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Button onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
                          variant="outlined" 
                          fullWidth
                          startIcon={<Google />}
                          sx={{
                            color: "white",
                            borderColor: "rgba(255,255,255,0.3)",
                            "&:hover": {
                              borderColor: "white",
                              backgroundColor: "rgba(255,255,255,0.1)",
                            },
                          }}
                        >
                          Google
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button 
                          variant="outlined" 
                          fullWidth
                          startIcon={<Facebook />}
                          sx={{
                            color: "white",
                            borderColor: "rgba(255,255,255,0.3)",
                            "&:hover": {
                              borderColor: "white",
                              backgroundColor: "rgba(255,255,255,0.1)",
                            },
                          }}
                        >
                          Facebook
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
    )
}

export default SocialOptions