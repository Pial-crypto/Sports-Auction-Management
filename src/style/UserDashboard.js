import {
  Box,
  Paper,
  ListItem,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
// Constants
export const drawerWidth = 240;
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Styled Components
export const StyledListItem = styled(ListItem)(({ theme, selected }) => ({
  margin: '8px 16px',
  borderRadius: 8,
  backgroundColor: selected ? alpha('#fff', 0.2) : 'transparent',
  '&:hover': {
    backgroundColor: alpha('#fff', 0.1),
  },
  '& .MuiListItemIcon-root': {
    color: selected ? '#fff' : alpha('#fff', 0.7),
  },
  '& .MuiListItemText-primary': {
    color: selected ? '#fff' : alpha('#fff', 0.7),
    fontWeight: selected ? 'bold' : 'normal',
  }
}));

export const GlassCard = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(10px)",
  borderRadius: 16,
  padding: theme.spacing(3),
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 40px rgba(0, 0, 0, 0.2)",
  },
}));

export const StatBadge = styled(Box)(({ theme, color }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  background: alpha(color, 0.1),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    background: alpha(color, 0.18),
  },
}));