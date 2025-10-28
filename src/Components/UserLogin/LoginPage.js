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
import { loginUsersService } from '../../services/users.services';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { v4 as uuidv4 } from 'uuid';
import CaerusLogo from '../../assets/CaerusLogo.png'


function Login() {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const dispatch=useDispatch()
  const navigate =useNavigate();
  const [value, setValue] = React.useState({
    email:'',
    password:'',
    domain:''
  })
 const [showPassword, setShowPassword] = React.useState(false)

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  const handleChange =(e)=>{
    setValue({...value,[e.target.name]:e.target.value})
  }

 const resetterLogins=()=>{
    setValue({...value,
        email:'',
        password:'',
        domain:''
      })
 }
 const handleSubmit = (e)=>{
   e.preventDefault();
  console.log('login form___',value)
  let validateForm=validate();
  delete value?.domain
  if(validateForm?.status == 'success'){
        //login api call 
        let userData={
          email:value?.email,
          domain:value?.domain
        }
        dispatch(actions.openLoader())
        loginUsersService(value)
        .then((res)=>{
            if(res){
              dispatch(actions.closeLoader());
              localStorage.setItem('access-token',(res?.data?.accessToken))
              localStorage.setItem('refresh-token',(res?.data?.refreshToken))
              localStorage.setItem('X-Correlation-Id',(uuidv4().toString()))
              // store user data in local storage
              dispatch(actions.loginSucess(userData))
              // dispatch(actions.fetchUserDataProfile())
              resetterLogins()
              navigate('/home')
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

   if(value && !validateEmail(value?.email) || value?.email?.length == 0 ){
      enable = true
      message= 'Format of email is invalid!'
    }

    if(value && !checkPasswordComplexity(value?.password) || value?.password?.length == 0){
        enable = true
        message= 'Password format is not satisfactory!'
    }

    if(value && value?.domain?.length == 0){
        enable = true
        message= 'Domain is Required!'
    }

    return {status:enable && enable == true ? 'error' : 'success', message:message}
 }



  return (
      <Paper elevation={13}>
      <LoginPageBg>
          <LoginCard>
            <LoginAppTitle>
            <img src={CaerusLogo} alt='caerus logo'/>
              {/* Track&nbsp;&nbsp;<span>It</span> */}
              {/* <b>TMS</b> */}
            </LoginAppTitle>

            <TrackColorline>
              <Bar color="#e94141" />
              <Bar color="#34a853" />
              <Bar color="#4285f4" />
              <Bar color="#fbbc05" />
            </TrackColorline>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                <Button 
                  variant="outlined" 
                  // fullWidth
                  sx={{
                    margin:"0 auto",
                    borderColor: "black",
                    color: "black",
                    width:"85%",
                    "&:hover": {
                      borderColor: "black",
                      backgroundColor: "rgba(0,0,0,0.04)", // subtle hover
                    }
                  }}
                >
                  <GoogleIcon />
                </Button>

                <Button 
                  variant="outlined" 
                  // fullWidth
                  sx={{
                    borderColor: "black",
                     width:"85%",
                     margin:"0 auto",
                    color: "black",
                    "&:hover": {
                      borderColor: "black",
                      backgroundColor: "rgba(0,0,0,0.04)",
                    }
                  }}
                >
                  <MicrosoftIcon />
                </Button>
               </div>


            <DividerOr><span>OR</span></DividerOr>
          {/* // form handling for inouts // */}
            <form onSubmit={handleSubmit} autoComplete="off">
                <Inputgroup>
                        <TextField 
                          type="text"
                          id="outlined-basic" 
                          label="Email" 
                          name="email"
                          value={value.email}
                          variant="outlined" 
                          autoComplete='on'
                          onChange={handleChange}
                          slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                 <IconButton>
                                    <PersonIcon />
                                 </IconButton>
                              </InputAdornment>
                            )
                          }
                          }}
                        />
                    
                      <TextField 
                          id="outlined-basic" 
                          type={!showPassword ?"password":"text" }
                          label="Password" 
                          name="password"
                          autoComplete='on'
                          value={value.password}
                          variant="outlined" 
                          onChange={handleChange}
                          slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <IconButton onClick={()=>setShowPassword((prev)=>!prev)}>
                                  {!showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                          }}
                        />
                        <FormControl sx={{ minWidth: 272,marginBottom:'10px' }}>
                            <InputLabel id="demo-simple-select-helper-label">Domain</InputLabel>
                            <Select
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              name="domain"
                              value={value.domain}
                              label="Domain"
                              onChange={handleChange}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={'10'}>Domain 1</MenuItem>
                              <MenuItem value={'20'}>Domain 2</MenuItem>
                              <MenuItem value={'30'}>Domain 3</MenuItem>
                            </Select>
                          </FormControl>
                          </Inputgroup>
                      <InputgroupButtons>
                      <Button 
                        type="submit"
                        variant="contained" 
                        style={{width:"70%"}}
                        disabled={value && value?.email?.length > 0 && value?.password?.length > 0 && value?.domain?.length > 0 ? false : true}
                        >Log In</Button>
                        <TextCenter>
                        <small><Link to='/forget_password'>Forgot Password?</Link></small>
                        <small>New to Track It <Link to = '/register-user'>Sign Up</Link></small>
                      </TextCenter>
                      </InputgroupButtons>
            </form>
          </LoginCard>
      </LoginPageBg>
      </Paper>
  );
}  

export default Login;
