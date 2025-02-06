import { styled, alpha } from "@mui/material/styles";
import { TextField, Paper, Button } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  color: "white",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
    "&:hover fieldset": { borderColor: theme.palette.primary.main },
    "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-focused": { color: theme.palette.primary.main },
  },
}));

export const SocialButton = styled(Button)(({ theme }) => ({
  color: "white",
  borderColor: alpha(theme.palette.primary.main, 0.3),
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  "&:hover": { borderColor: theme.palette.primary.main, background: "rgba(255, 255, 255, 0.1)" },
}));

export default StyledTextField;
