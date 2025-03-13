// style/Register.js
import { styled } from "@mui/material/styles";
import { TextField, Paper, Button } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(1),
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 1)",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
    },
    "&.Mui-focused": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0,0,0,0.1)",
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
  },
  "& .MuiInputAdornment-root": {
    color: theme.palette.primary.main,
  },
}));

export const SocialButton = styled(Button)(({ theme }) => ({
  color: "white",
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  textTransform: "none",
  fontSize: "1rem",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .15)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 10px 4px rgba(0, 0, 0, .15)",
  },
}));