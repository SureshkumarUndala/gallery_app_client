import { AppBar, Toolbar, Box, Typography, InputBase, Button, Container, Card, CardActions } from '@mui/material'
import { CardContent, Modal, DialogActions, Dialog, DialogContent, DialogTitle, CardMedia, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {axios} from "axios"



import Person4RoundedIcon from '@mui/icons-material/Person4Rounded';

const Homepage = () => {
  const [posts, setPosts] = useState([])
  const [query, setquery] = useState('')
  const [open, setopen] = useState(false)
  const [label, setlabel] = useState("")
  const [image, setImage] = useState("")
  const Navigate = useNavigate()

  const inputStyle = {
    marginLeft: "70px",
    marginRight: "30px",
    border: "2px solid black",
    borderRadius: "6px",
    width: "800px",
    
    }


    const fetchPosts =()=>{
      fetch("https://galleryapplicationapi.onrender.com/myposts", {
        method: "get",
        headers: {
          "Authorization": "bearer " + localStorage.getItem("token")
        },
  
      }).then(res => res.json())
        .then(data => setPosts(data.posts))
    }
 



  const deletepost =async(label)=>{
    console.log("hello")
     const delteposts = await fetch('https://galleryapplicationapi.onrender.com/deletepost/'+label,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "bearer " + localStorage.getItem("token")
      },
    

    }).catch(err=>console.log(err))
    fetchPosts()
  
    

  }


  const addPost = async () => {
    await fetch("https://galleryapplicationapi.onrender.com/addpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        label: label,
        image: image

      })

    }).then(res => console.log(res.json())
    )
    setopen(false)
    fetchPosts()


  }

  const logout = ()=>{
    localStorage.removeItem("token")
        Navigate("/")
  }




  return (

    <>
      {open ? <Dialog open={open} >
        <DialogTitle>Add a new Photo</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "500px", height: "100px", display: "flex", flexDirection: "column", justifyContent: 'space-evenly' }}>
            <TextField label="Label" onChange={(e) => { setlabel(e.target.value) }} fullWidth />

          </Box>

          <TextField label="photo URL" onChange={(e) => { setImage(e.target.value) }} fullWidth />
        </DialogContent>
        <DialogActions >
          <Button color="inherit" onClick={() => setopen(false)}>cancel</Button>
          <Button variant="contained" onClick={addPost} >submit</Button>
        </DialogActions>
      </Dialog> :
        <Box>
          <AppBar position='static' color='transparent' sx={{ height: "auto", padding: "10px" }}>
            <Toolbar sx={{ display: "flex" }}>

              <Box marginRight={"15px"}>
                <Person4RoundedIcon fontSize='large' />
              </Box>
              <Box flexGrow={0.1}>
                <Typography variant='h6'   >My Unsplash</Typography>
                <Typography>devchallenges.io</Typography>
              </Box>
              <Box flexGrow={0.6}>
                <InputBase style={inputStyle} 
                  placeholder="Search by Name" onChange={(e)=>setquery(e.target.value)} />
              </Box>
            

              <Button type='submit' variant="contained" color='success' onClick={() => setopen(true)}>Add Photo</Button>
              <Box marginLeft={"30px"}>
              <Button  variant="contained" color='error'  onClick={logout}>logout</Button>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>}



      <Container sx={{ display: "flex", flexWrap:"wrap-reverse" }}>
        {
          posts.filter(item=> item.label.toLowerCase().includes(query)).map((item, index) => (
            <Box width="300px" margin="20px auto">
              <Card>
                <CardMedia component="img" height="140" image={item.image} />         <CardContent>
                  <Typography variant='h5' component="div" gutterBottom>{item.label}</Typography>              
                </CardContent>
                < CardActions>
                  <Button size="small" variant="outlined" onClick={()=>deletepost(item.label)}>Delete</Button>
                </CardActions>
              </Card>
            </Box>

          ))
        }

      </Container>



    </>
  )
}

export default Homepage