"use client";
import React from "react";
import { 
  Box, 
  Typography, 
  Grid} from "@mui/material";
import { 
  GitHub, 
  LinkedIn, 
  Twitter, 
  Facebook, 
  Instagram} from "@mui/icons-material";
import { motion } from "framer-motion"; // Make sure to install framer-motion
import { FooterSection } from "@/style/Footer";
import { SocialIcon } from "@/style/Footer";

const NewsLetterSection=()=>{
    return(
        <>
         <Grid item xs={12} md={4}>
            <FooterSection>
              <Typography color="white" variant="h6" gutterBottom>
                Stay Connected
              </Typography>
              <Typography color="white" variant="body2" sx={{ mb: 2 }}>
                Follow us on social media for the latest updates.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <SocialIcon color="white" component={motion.div} whileHover={{ y: -3 }}>
                  <Facebook />
                </SocialIcon>
                <SocialIcon component={motion.div} whileHover={{ y: -3 }}>
                  <Twitter />
                </SocialIcon>
                <SocialIcon component={motion.div} whileHover={{ y: -3 }}>
                  <LinkedIn />
                </SocialIcon>
                <SocialIcon component={motion.div} whileHover={{ y: -3 }}>
                  <Instagram />
                </SocialIcon>
                <SocialIcon component={motion.div} whileHover={{ y: -3 }}>
                  <GitHub />
                </SocialIcon>
              </Box>
            </FooterSection>
          </Grid>
        </>
    )
}

export default NewsLetterSection