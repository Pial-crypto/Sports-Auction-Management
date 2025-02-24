
import React from "react";
import { 
  Box, 
  Typography, 
  Grid} from "@mui/material";
import { 
  Email,
  Phone,
  LocationOn} from "@mui/icons-material";
import { FooterSection } from "@/style/Footer";

const CompanyInfo=()=>{
    return(
        <>
           <Grid item xs={12} md={4}>
            <FooterSection>
              <Typography color="white" variant="h6" gutterBottom component="div">
                Player Management
              </Typography>
              <Typography color="white"  variant="body2" sx={{ mb: 2 }}>
                Empowering athletes to reach their full potential through innovative management solutions.
              </Typography>
              <Box color="white"  sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Email sx={{ mr: 1 }} fontSize="small" />
                <Typography color="white"  variant="body2">contact@playermanagement.com</Typography>
              </Box>
              <Box color="white" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Phone sx={{ mr: 1 }} fontSize="small" />
                <Typography color="white" variant="body2">+1 (555) 123-4567</Typography>
              </Box>
              <Box color="white" sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1 }} fontSize="small" />
                <Typography color="white" variant="body2">123 Sports Avenue, NY 10001</Typography>
              </Box>
            </FooterSection>
          </Grid>
        </>
    )
}

export default CompanyInfo