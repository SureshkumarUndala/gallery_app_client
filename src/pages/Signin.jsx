import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Checkbox, FormControlLabel, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signin = () => {
    const [user, setUser] = useState({ email: "", password: "" })
    const Navigate = useNavigate()
    const paperStyle = {
        padding: 30, width: 350, height: "65vh", margin: "50px auto",
        display: "flex", flexDirection: "column", justifyContent: "space-evenly"
    }
    const avatarStyle = { backgroundColor: "blue", marginBottom: "5px" }
    const linkStyle = { textDecoration: "none" }
    
    
  const login = () => {

  
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!regEx.test(user.email)){
      return alert("Invalid Email")
    }
    axios.post("https://galleryapplicationapi.onrender.com/login", user)
      .then((response) => {
        localStorage.setItem("token", response.data.token)
        alert(response.data.message)
        Navigate("/homepage")
      })
      .catch((error) => {
        alert(error.response.data.error)
      })

  }
    return (
        <Box>
            <Paper elevation={10} style={paperStyle}>
                <Box align="center">
                    <Avatar style={avatarStyle}> <LockOutlinedIcon /></Avatar>
                    <Typography variant='h4'>Sign In</Typography>

                </Box>
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
                <Button type="submit" variant="contained" color='primary' 
                onClick={login}
                fullWidth>Sign In</Button>
                <Typography variant='h6'>Don't have an account ? <Link href="/signup" style={linkStyle}>Sign Up</Link></Typography>




            </Paper>
        </Box>
    );
}

export default Signin