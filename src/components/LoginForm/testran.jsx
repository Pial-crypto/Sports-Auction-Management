// SnackbarAlert.js
import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = ({ message, severity, setMessage }) => {
  return (
    <Snackbar open={!!message} autoHideDuration={4000} onClose={() => setMessage(null)}>
      <Alert 
        severity={severity} 
        onClose={() => setMessage(null)} 
        sx={{ maxWidth: "400px" }} // ⬅️ Increase width for readability
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
