import React,{useRef} from 'react';
import TextField from '@mui/material/TextField';
import ConfirmEmailTrigger from './ConfirmEmailTrigger'
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';
import Button from '@mui/material/Button';

export default function ForgetPassword() {

  const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  };

  const contentBox = {
    maxWidth: '400px',
    width: '100%',
    padding: '20px',
    textAlign: 'center',
  };

  const valueRef = useRef(null);
  const [value, setValue] = React.useState({
    email:'',
    captchaValue:''
  })
  const [enable, setEnable] = React.useState(false)


    React.useEffect(() => {
      loadCaptchaEnginge(6);
    }, []);
  
  console.log('enable or disable__',enable,value.email,value.captchaValue)

   const handleSubmit = (e) => {
      e.preventDefault();
      //api call from exsisting email and true 
      // response should be returned if true then LOC 44 should be executed
      if (valueRef.current.value && validateCaptcha(valueRef.current.value) === true && 
        value.email && value.email.length > 0
        ) {
            console.log('Captcha Matched');
            setEnable(true)
          }else{
              setEnable(false)
              alert('Something went wromg')
          }
    };


  return (
    <div style={containerStyle}>
      {!enable ? 
       <section style={contentBox}>
        <h3>Reset your password</h3>
        <p>
          Enter your user account's verified email address and we will send you a password reset link.
        </p>
         <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="filled-basic"
          label="Please enter your email"
          variant="filled"
          onChange={(e)=>{
              setValue({
                ...value,email:e.target.value
              })
          }}
          style={{ marginTop: '20px', minHeight: '80px' }}
        />

         <LoadCanvasTemplate />
          <TextField
            fullWidth
            label="Enter Captcha"
            variant="standard"
            inputRef={valueRef} // use inputRef instead of ref for MUI
            style={{ marginTop: '20px', minHeight: '80px' }}
          />
          <Button type='submit' 
          variant="contained" fullWidth>Submit</Button>
        </form>
      </section> : <ConfirmEmailTrigger/> 
    }
     

    </div>
  );
}
