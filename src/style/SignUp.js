// styles/RegisterStyles.js
import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const BoxContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-blend: overlay;
  background-size: cover;
  padding: 16px;
  position: relative;
  overflow: hidden;
  margin-top: 50px;
  &::before {
    content: '""';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.0);
    z-index: 1;
  }
`;
