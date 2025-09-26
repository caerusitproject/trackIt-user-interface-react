import React, { useState } from "react";
import {
  Container,
  Card,
  Title,
  FormGroup,
  Label,
  Input,
  RegisterCard,
  TextCenter,InputWrapper,
  PhoneInputWrapper
} from "../../styled_components/register.styled";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';
import {
  validateEmail,checkPasswordComplexity,
  firstLastName,validatePhoneNo} from "../../Config/utils";
import {storeRegisterUser} from "../../services/users.services"
import { useDispatch } from "react-redux";
import * as actions from "../../stores/actions";
import PhoneInput from 'react-phone-input-2'
import {InputAdornment} from "@mui/material";
import 'react-phone-input-2/lib/style.css'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function RegisterUser() {
  const dispatch = useDispatch();
  const [showPassword, setshowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneno:"",
    // actualPhoneNo:"",
    countryCode:''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetterForm=()=>{
    setFormData({...formData,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneno:"",
    countryCode:''
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let forwardForm= isValidate();
    if(forwardForm?.status == 'success'){
      // form submission will happen here
      let updatedPhoneno=''
      if(formData && formData?.phoneno?.length == 12){
        updatedPhoneno=formData?.phoneno?.slice(2)
      }else if(formData && formData?.phoneno?.length == 13){
         updatedPhoneno=formData?.phoneno?.slice(3)
      }
      // delete formData.phoneno;
      const payload = { ...formData ,phoneNumber:updatedPhoneno}
       dispatch(actions.openLoader())
        storeRegisterUser(payload)
        .then((res)=>{
                if(res){
                    dispatch(actions.closeLoader())
                    resetterForm()
                    dispatch(actions.openSnackbar({message:res?.message,status:'success'}))
                }
        }).catch((err)=>{
            console.log('register_user',err)
            dispatch(actions.closeLoader())
            dispatch(actions.openSnackbar({message:err?.message,status:'error'}))
            
        })
      console.log("Form Submitted:",payload, checkPasswordComplexity(formData?.password));
    }else{
      dispatch(actions.openSnackbar(forwardForm))
    }
  };
  console.log('phoneno___',formData.actualPhoneNo,formData.countryCode)
  const isValidate=()=>{
    let enable = false;
    let message = ''
    let updatedPhoneno=''

     if(formData && formData?.phoneno?.length == 12){
        updatedPhoneno=formData?.phoneno?.slice(2)
      }else if(formData && formData?.phoneno?.length == 13){
         updatedPhoneno=formData?.phoneno.slice(3)
      }
    if(formData && !validateEmail(formData?.email) && formData?.email.length == 0 ){
      enable = true
      message= 'Format of email is invalid!'
    }
    if(formData && !firstLastName(formData?.firstName) && formData?.firstName.length == 0){
      enable = true
      message= 'First Name is not valid!'
    }
    if(formData && !firstLastName(formData?.lastName) && formData?.lastName.length == 0){
      enable = true
      message= 'Last Name is not valid!'
    }
    if(formData && !checkPasswordComplexity(formData?.password) && formData?.password.length == 0){
      enable = true
      message= 'Password format is not satisfactory!'
    }

    if(formData && !validatePhoneNo(updatedPhoneno) && formData?.phoneno?.length == 0){
      enable = true
      message= 'Please enter a valid Phone Number !'
    }
    return {status:enable && enable == true ? 'error' : 'success', message:message}
  }

  return (
    <Container>
      <RegisterCard>
        <Title>Register</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <InputWrapper>
                   <div style={{border:'1px solid #cacaca',height:'29px',borderRadius: "3px 0 0 3px",width:'25px',backgroundColor:'#f5f5f5',padding:'2.1px',margin:'0 auto'}}>
                     {showPassword ? 
                     <Visibility onClick={()=>setshowPassword((prev)=> !prev)} style={{width:26,marginTop:2}}/>
                     :
                     <VisibilityOff onClick={()=>setshowPassword((prev)=> !prev)} style={{width:26,marginTop:2}}/>
                      } 
                    </div> 
                  <Input
                    type={!showPassword ? "text" : "password" }
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    /> 
                    
            </InputWrapper>
          
              {/* Password checker bar */}
                {formData && formData.password && 
                  <PasswordStrengthBar 
                  style={{width:"100%",margin:"0 auto",marginTop:"10px"}}
                  minLength={8}
                  password={formData?.password} />
                
                }
          </FormGroup>
            {/* <div style={{width:"100%"}}> */}
          {/* <FormGroup >
            <Label htmlFor="Phone Number">Phone Number</Label>
              <PhoneInputWrapper
                country={'in'}
                enableSearch={true}
                value={formData.phoneno}
                onKeyDown={(e,phone)=>{
                  if(phone && phone.length > 10){
                    e.preventDefault()
                  }
                }}
                onChange={(phone,countries,value)=>{
                  // console.log('country code__',count)
                  setFormData({...formData,phoneno:phone,
                    countryCode:countries?.dialCode
                  })
                  }
                }
              />
              
          </FormGroup> */}

          <FormGroup>
            <Label htmlFor="Phone Number">Phone Number</Label>
            <PhoneInputWrapper
              country={"in"}
              enableSearch={true}
              value={formData.phoneno}
              onKeyDown={(e, phone) => {
                if (phone && phone.length > 10) {
                  e.preventDefault();
                }
              }}
              onChange={(phone, countries, value) => {
                setFormData({
                  ...formData,
                  phoneno: phone,
                  countryCode: countries?.dialCode,
                });
              }}
            />
            </FormGroup>
            {/* </div> */}

          <Button 
              variant='contained'
              style={{margin:"0 auto"}} 
              type="submit"
              fullWidth
              disabled={(formData?.email.length > 0 && formData?.firstName.length > 0 &&
                formData?.lastName.length > 0 && formData?.password.length > 0 && formData?.phoneno?.length > 0) ? false : true
              }
          >
          Register</Button>

          <TextCenter>
            <small>
              Already have an account? <Link to="/">Login</Link>
            </small>
          </TextCenter>
        </form>
      </RegisterCard>
    </Container>
  );
}
