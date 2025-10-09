// Login.jsx
import React from 'react';
import {
  LoginPageBg,
  LoginCard,
  LoginAppTitle,
  TrackColorline,
  Bar,
  GoogleBtn,
  DividerOr,
  ForgotLink,
  Inputgroup,
  InputgroupButtons,
  TextCenter
} from '../../styled_components/login.styled';
import {TextField,InputAdornment,Button, IconButton} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import PasswordIcon from '@mui/icons-material/Password';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Paper from "@mui/material/Paper";
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import * as actions from "../../stores/actions";
import { useDispatch,useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { validateEmail, checkPasswordComplexity } from '../../Config/utils';
import { resetPasswordService } from '../../services/users.services';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function PasswordReset() {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const dispatch=useDispatch()
  const navigate =useNavigate();
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  console.log("Token:", token);
  // const [showPassword, setShowPassword] = React.useState(false)
  const [value, setValue] = React.useState({
    newpassword:'',
    confirmpassword:''
  })

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  const handleChange =(e)=>{
    setValue({...value,[e.target.name]:e.target.value})
  }

 const resetterLogins=()=>{
    setValue({...value,
        newpassword:'',
        confirmpassword:''
      })
 }
 const handleSubmit = (e)=>{
   e.preventDefault();
  console.log('login form___',value)
  let validateForm=validate();

  if(validateForm?.status == 'success'){
        //login api call 
        let userData={
          newPassword:value?.newpassword,
          token:token
        }
        dispatch(actions.openLoader())
        resetPasswordService(userData)
        .then((res)=>{
            if(res){
              dispatch(actions.closeLoader());
              resetterLogins()
              dispatch(actions.openSnackbar({message:res?.message,status:'success'}))
            }  
        }).catch((err)=>{
            dispatch(actions.closeLoader());
            dispatch(actions.openSnackbar({message:err?.message,status:'error'}))
           
        })
  }else{
     dispatch(actions.openSnackbar({message:validateForm?.message,status:'error'}))
  }

 }


 const validate=()=>{

  let enable = false;
  let message='';

    if(value && !checkPasswordComplexity(value?.newpassword) || value?.newpassword?.length == 0){
        enable = true
        message= 'New Password format is incorrect!'
    }

     if(value && !checkPasswordComplexity(value?.confirmpassword) || value?.confirmpassword?.length == 0){
        enable = true
        message= 'Confirm Password format is incorrect!'
    }

    if(value &&value?.newpassword !== value?.confirmpassword){
        enable = true
        message= 'New Password and Confirm Password do not match!'
    }
    return {status:enable && enable == true ? 'error' : 'success', message:message}
 }



  return (
      <Paper elevation={13}>
      <LoginPageBg>
          <LoginCard>
            <LoginAppTitle style={{marginBottom:"20px"}}>
              {/* Track&nbsp;&nbsp;<span>It</span> */}
              <b>Reset Password</b>
            </LoginAppTitle>
            
          {/* // form handling for inouts // */}
            <form onSubmit={handleSubmit} autoComplete="off">
                <Inputgroup>
                        <TextField 
                          type={"text" }
                          id="outlined-basic" 
                          label="New Password" 
                          name="newpassword"
                          value={value.newpassword}
                          variant="outlined" 
                          autoComplete='on'
                          onChange={handleChange}
                          slotProps={{
                          // input: {
                          //   startAdornment: (
                          //     <InputAdornment position="start">
                          //        <IconButton onClick={()=>setShowPassword((prev)=>!prev)}>
                          //           {!showPassword ? <Visibility/> : <VisibilityOff/>}
                          //        </IconButton>
                          //     </InputAdornment>
                          //   )
                          // }
                          }}
                        />
                    
                      <TextField 
                          id="outlined-basic" 
                          type={"text" }
                          label="Confirm Password" 
                          name="confirmpassword"
                          autoComplete='on'
                          value={value.confirmpassword}
                          variant="outlined" 
                          onChange={handleChange}
                          slotProps={{
                          // input: {
                          //   startAdornment: (
                          //     <InputAdornment position="start">
                          //       <IconButton onClick={()=>setShowPassword((prev)=>!prev)}>
                          //         {!showPassword ? <Visibility/> : <VisibilityOff/>}
                          //       </IconButton>
                          //     </InputAdornment>
                          //   )
                          // }
                          }}
                        />
                    </Inputgroup>
                      <InputgroupButtons>
                      <Button 
                        type="submit"
                        variant="contained" 
                        style={{width:"70%", marginTop:"20px"}}
                        disabled={value && value?.newpassword?.length > 0 && value?.confirmpassword?.length > 0 ? false : true}
                        >Reset Password</Button>
                        <TextCenter>
                          <small> <Link to = '/login'>Sign in</Link></small>
                      </TextCenter>
                      </InputgroupButtons>
            </form>
          </LoginCard>
      </LoginPageBg>
      </Paper>
  );
}  

export default PasswordReset;
