import { Typography } from "@mui/material"
import { COLORS } from "@/style/OverView"
import { shine } from "@/style/OverView"
export const Header=({phase})=>{
    return(
    <>
      <Typography 
        variant="h3" 
        sx={{
          fontWeight: 800,
          mb: 4,
          background: `linear-gradient(135deg, 
            ${COLORS.primary}, 
            ${COLORS.secondary} 50%, 
            ${COLORS.primary} 100%)`,
          backgroundSize: '200% auto',
          animation: `${shine} 3s linear infinite`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          letterSpacing: '-0.02em',
          textShadow: '0 2px 10px rgba(67, 97, 238, 0.2)',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-8px',
            left: 0,
            width: '60px',
            height: '4px',
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
            borderRadius: '2px',
          }
        }}
      >
        Tournament Overview

        
      </Typography>
         <Typography variant="subtitle1" color="text.secondary"
           sx={{
          fontWeight: 800,
          mb: 4,
          background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.secondary})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          letterSpacing: '-0.02em',
        }}
         >
            Phase: {phase || "Not Started"}
          </Typography>

          </>
    )
}