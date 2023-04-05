import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Checkbox, FormControlLabel, Link, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [user, setUser] = useState({username:"", email:"", password:""})
    const Navigate = useNavigate()

  //stylings
    const paperStyle = {
        padding: 30, width: 350, height: "65vh", margin: "50px auto",
        display: "flex", flexDirection: "column", justifyContent: "space-evenly"
    }
    const avatarStyle = { backgroundColor: "blue", marginBottom: "5px" }
    const linkStyle = { textDecoration: "none" }



    
  const register = (e) =>{
 
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!regEx.test(user.email)){
      return alert("Invalid Email")
    }
    
    axios.post("https://galleryapplicationapi.onrender.com/register",user)
    .then((response)=>{
   
      alert(response.data.status)
      Navigate("/")
     
    })
    .catch((error)=>{
      
      alert(error.response.data.error)
    })
 
  }  
    
    return (
        <Box>
            <Paper elevation={10} style={paperStyle}>
                <Box align="center">
                    <Avatar style={avatarStyle}> <LockOutlinedIcon /></Avatar>
                    <Typography variant='h4'>Sign Up</Typography>

                </Box>
                <TextField label="UserName" 
                variant='standard' 
                placeholder='Enter UserName' 
                onChange={(e)=>setUser({...user, username:e.target.value})}
                required
                fullWidth
                />

                <TextField label="Email" variant='standard' placeholder='Enter Email'
                  onChange={(e)=>setUser({...user, email:e.target.value})}
                
                fullWidth required />
                <TextField label="password"
                type="password"
                 variant='standard' 
                 placeholder='Enter password'
                   helperText="Do Not Share Your Password With Anyone" 
                   onChange={(e)=>setUser({...user, password:e.target.value})}
                   
                   fullWidth required />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                <Button type="submit"
                 variant="contained"
                  color='primary' 
                  onClick={register}
                  fullWidth>Sign Up</Button>




            </Paper>
        </Box>
    );
 
}

export default Signup