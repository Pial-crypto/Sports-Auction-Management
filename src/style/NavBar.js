import { styled } from "@mui/material/styles";
import { AppBar, Button, Box } from "@mui/material";

export const NavBarContainer = styled(AppBar)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.6)",
  backdropFilter: "blur(15px)",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  padding: theme.spacing(1, 3),
  borderRadius: "12px",
  marginTop: theme.spacing(2),
  width: "80%",
  display: "flex",
  justifyContent: "center",
}));

export const StyledButton = styled(Button)({
  background: "linear-gradient(45deg, #ff6f00, #d84315)",
  borderRadius: 25,
  color: "white",
  padding: "10px 22px",
  fontWeight: "bold",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.08)",
    background: "linear-gradient(45deg, #ff8f00, #bf360c)",
  },
});

export const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  "& img": {
    height: "45px",
  },
  "& h6": {
    fontWeight: "bold",
    letterSpacing: "1px",
  },
});

export const NavLinksContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  "& button": {
    fontSize: "1rem",
    fontWeight: "500",
    color: "#fff",
    transition: "color 0.2s ease-in-out",
    "&:hover": {
      color: "#ff9100",
    },
  },
});
