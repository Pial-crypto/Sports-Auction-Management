import { Paper, Button, TextField } from "@mui/material";
import { styled, keyframes } from "@mui/system";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const StyledPaper = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  padding: theme?.spacing(4) || 16,
  borderRadius: theme?.spacing(2) || 8,
  width: "100%",
  maxWidth: 450,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  animation: `${fadeIn} 0.6s ease-out`,
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: "white",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: theme?.spacing(1) || 4,
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
    "&:hover fieldset": { borderColor: theme?.palette?.primary?.main || "#1976d2" },
    "&.Mui-focused fieldset": { borderColor: theme?.palette?.primary?.main || "#1976d2", borderWidth: 2 },
  },
  "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme?.palette?.primary?.main || "#1976d2"} 30%, ${theme?.palette?.primary?.light || "#42a5f5"} 90%)`,
  padding: "12px",
  marginTop: theme?.spacing(3) || 12,
  borderRadius: theme?.spacing(1) || 4,
  textTransform: "none",
  fontSize: "1.1rem",
  fontWeight: 600,
  letterSpacing: 1,
}));
