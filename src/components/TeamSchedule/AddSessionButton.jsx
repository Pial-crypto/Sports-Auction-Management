import {
  Fab,
 
} from '@mui/material';
import { handleAddSession } from '@/function/handleTeamSchedule';
import { Add } from '@mui/icons-material';

export const AddSessionButton=({setSelectedPractice,setEditDialogOpen})=>{
     return(
          <Fab
                    color="primary"
                    onClick={()=>handleAddSession(setSelectedPractice,setEditDialogOpen)}

                    sx={{
                      position: 'fixed',
                      bottom: 16,
                      right: 16,
                      backgroundColor: '#4CAF50',
                      '&:hover': {
                        backgroundColor: '#388E3C'
                      }
                    }}
                  >
                    <Add />
                  </Fab>
     )
}