import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { GiTrophyCup } from 'react-icons/gi';
import { useState } from 'react';
import { updateTournamentInfo } from '@/function/updateTournamentInfo';
import storage from '@/class/storage';
import { useRouter } from 'next/router';
//import { toast } from 'react-hot-toast';

const EndTournament = ({ tournament,setSnackbar}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleConfirm = async () => {
    try {
   const result= await updateTournamentInfo({...tournament, status: 'completed'});
   if(result){
      const user = storage.get('user');
      storage.set('user', {
        ...user,
        activeStatus: false
      });
      
      setSnackbar({
  open: true,
  message: 'Tournament ended successfylly',
  severity: 'success',
});
      handleClose();
      useRouter().push('/TournamentManagement')
    }
    } catch (error) {
     // toast.error('Failed to end tournament');
      console.error(error);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          variant="contained"
          onClick={handleClickOpen}
          startIcon={
            <Box component="span" sx={{ mr: 1 }}>
              <GiTrophyCup size={22} />
            </Box>
          }
          sx={{
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: 'white',
            px: 3,
            py: 1.2,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '0.95rem',
            letterSpacing: '0.5px',
            boxShadow: '0 4px 14px 0 rgba(220,38,38,0.39)',
            '&:hover': {
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              boxShadow: '0 6px 20px 0 rgba(220,38,38,0.5)',
            }
          }}
        >
          End Tournament
        </Button>
      </motion.div>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, rgba(30,41,59,0.98) 0%, rgba(15,23,42,0.98) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            backdropFilter: 'blur(10px)',
            p: 2
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            color: '#ef4444', 
            fontWeight: 'bold',
            fontSize: '1.5rem',
            pb: 1
          }}
        >
          End Tournament?
        </DialogTitle>
        <DialogContent>
          <DialogContentText 
            sx={{ 
              color: 'rgba(255,255,255,0.8)',
              my: 2,
              fontSize: '1rem',
              lineHeight: 1.6
            }}
          >
            Are you sure you want to end this tournament? This action cannot be undone.
            All ongoing matches will be marked as completed.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0, gap: 1 }}>
          <Button 
            onClick={handleClose}
            sx={{ 
              color: 'rgba(255,255,255,0.7)',
              px: 3,
              '&:hover': { 
                color: 'white',
                background: 'rgba(255,255,255,0.1)' 
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            sx={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              px: 3,
              '&:hover': {
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              }
            }}
          >
            End Tournament
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EndTournament;