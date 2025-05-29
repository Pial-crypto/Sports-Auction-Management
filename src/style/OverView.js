import { keyframes } from "framer-motion";

export const COLORS = {
  primary: '#4361EE',    // Modern Indigo
  secondary: '#3F37C9',  // Deep Purple
  success: '#4CAF50',    // Material Green
  warning: '#FB8C00',    // Material Orange
  error: '#E53935',      // Material Red
  info: '#00BCD4',       // Material Cyan
  background: '#F8FAFC',  // Light Cool Gray
  paper: '#FFFFFF',      // White
  text: '#1E293B',       // Slate Dark
  textSecondary: '#64748B', // Slate Medium
  border: '#E2E8F0'      // Slate Light
};


export const shine = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;