import { Box, Button, Typography } from "@mui/material";
import Link from "next/link"; // ✅ Correct import for Next.js

const AuthFooter = () => {
  return (
    <Box sx={{ mt: 3, textAlign: "center" }}>
      <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
        Don't have an account?{" "}
        <Link href="/auth/register" passHref>
          <Button
            sx={{
              textTransform: "none",
              color: "#4FC3F7",
              "&:hover": {
                color: "#81D4FA",
              },
            }}
          >
            Sign Up
          </Button>
        </Link>
      </Typography>
    </Box>
  );
};

export default AuthFooter;
