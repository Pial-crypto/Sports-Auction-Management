import React from "react";
import { 
  Typography, 
  Link, 
  Grid
} from "@mui/material";
import { FooterSection } from "@/style/Footer";
import { handleQuickLinkClick } from "@/function/handleFooterNavigation";
import { motion } from "framer-motion";

const QuickLinks = () => {
  const links = ['About Us', 'Services', 'Players', 'News', 'Career', 'Contact'];

  return (
    <Grid item xs={12} md={4}>
      <FooterSection>
        <Typography color="white" variant="h6" gutterBottom>
          Quick Links
        </Typography>
        <Grid container spacing={2}>
          {links.map((text) => (
            <Grid item xs={6} key={text}>
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  component="button"
                  onClick={() => handleQuickLinkClick(text)}
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': { 
                      textDecoration: 'underline',
                      color: 'white',
                      opacity: 0.8
                    },
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  {text}
                </Link>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </FooterSection>
    </Grid>
  );
};

export default QuickLinks;