import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../stores/actions"

export default function SuccessFailureSnackbar() {
    const dispatch=useDispatch();
    const {message,status,opener} = useSelector((state)=> state.login);
    const vertical='top',horizontal='right';
    const [open, setOpen] = React.useState(false)

  const handleClose = (event, reason) => {
    // "clickaway" means user clicked outside → usually you ignore that
    if (reason === "clickaway") return;
    setOpen(false);
  };

   console.log('this is snackbar__',message)

  return (
    <>
    <Snackbar 
        open={opener} 
        autoHideDuration={3000} 
        onClose={()=>{
          dispatch(actions.closeSnackbar())
        }}
        anchorOrigin={{ vertical, horizontal }}
    >
        <Alert
          onClose={()=>{
          dispatch(actions.closeSnackbar())
        }}
          severity={status}
          // variant='outlined'
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
      </>
  )
}
