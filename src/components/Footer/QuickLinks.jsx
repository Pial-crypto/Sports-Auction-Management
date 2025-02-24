import React from "react";
import { 
  Typography, 
  Link, 
  Grid} from "@mui/material";
import { FooterSection } from "@/style/Footer";

const QuickLinks = () => {
  return (
 <>
    <Grid item xs={12} md={4}>
            <FooterSection>
              <Typography color="white" variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Grid container spacing={2}>
                {['About Us', 'Services', 'Players', 'News', 'Career', 'Contact'].map((text) => (
                  <Grid color="white" item xs={6} key={text}>
                    <Link
                      href="#"
                      color="inherit"
                      sx={{
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {text}
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </FooterSection>
          </Grid>
          </>
  );
};

export default QuickLinks;