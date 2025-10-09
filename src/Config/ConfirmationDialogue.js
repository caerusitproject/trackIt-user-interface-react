import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector , useDispatch} from 'react-redux';
import * as actions from "../stores/actions"

export default function ConfirmationDialog(props) {
  const dispatch=useDispatch();
  const {drawerMessage,toggle} = useSelector((state)=>state.login);
  console.log('this is openSideDrawer',drawerMessage,toggle);
  return (
    <React.Fragment>
      <Dialog
        open={toggle}
        onClose={()=>{
          dispatch(actions.openSideDrawer("",false))
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {drawerMessage}
        </DialogTitle>
        <DialogActions>
          <Button 
          onClick={()=>{
             dispatch(actions.openSideDrawer("",false))
          }}
          >Disagree</Button>
          <Button 
          onClick={()=> props.agreedAction()}
          autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
