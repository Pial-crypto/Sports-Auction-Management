"use client";
import React from "react";
import { 
  Box, 
  Typography, 
  Grid
} from "@mui/material";
import { 
  GitHub, 
  LinkedIn, 
  Twitter, 
  Facebook, 
  Instagram
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { FooterSection, SocialIcon } from "@/style/Footer";
import { handleSocialClick } from "@/function/handleFooterNavigation";

const NewsLetterSection = () => {
  return (
    <Grid item xs={12} md={4}>
      <FooterSection>
        <Typography color="white" variant="h6" gutterBottom>
          Stay Connected
        </Typography>
        <Typography color="white" variant="body2" sx={{ mb: 2 }}>
          Follow us on social media for the latest updates.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <SocialIcon 
            component={motion.div} 
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSocialClick('facebook')}
          >
            <Facebook />
          </SocialIcon>
          <SocialIcon 
            component={motion.div}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSocialClick('twitter')}
          >
            <Twitter />
          </SocialIcon>
          <SocialIcon 
            component={motion.div}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSocialClick('linkedin')}
          >
            <LinkedIn />
          </SocialIcon>
          <SocialIcon 
            component={motion.div}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSocialClick('instagram')}
          >
            <Instagram />
          </SocialIcon>
          <SocialIcon 
            component={motion.div}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSocialClick('github')}
          >
            <GitHub />
          </SocialIcon>
        </Box>
      </FooterSection>
    </Grid>
  );
};

export default NewsLetterSection;