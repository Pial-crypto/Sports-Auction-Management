import {
  Button,
  Stack} from '@mui/material';
  import { NavigationToolbar } from '@/style/TeamSchedule';

export const TabSchedule=({setSelectedSection,selectedSection,navigationConfig})=>(
      <NavigationToolbar>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2} 
            justifyContent="center"
            alignItems="center"
          >
            {navigationConfig.map((item) => (
              <Button
                key={item.id}
                startIcon={item.icon}
                variant={selectedSection === item.id ? "contained" : "outlined"}
                onClick={() => setSelectedSection(item.id)}
                color="primary"
                sx={{
                  borderRadius: 2,
                  px: 3
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </NavigationToolbar>
)