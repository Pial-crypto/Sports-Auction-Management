const { Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Button } = require("@mui/material");

export const LogoutDialog=({setLogoutDialog,logoutDialog,handleLogout,loading})=>(
     <Dialog open={logoutDialog} onClose={() => setLogoutDialog(false)}>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>
            Are you sure you want to logout?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLogoutDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleLogout}
              color="error"
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Logout"}
            </Button>
          </DialogActions>
        </Dialog>
)