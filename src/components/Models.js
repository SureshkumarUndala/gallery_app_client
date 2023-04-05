import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'

const Models = () => {
  return (
    <div>
        <Dialog>
            <DialogTitle>Add a new Photo</DialogTitle>
            <DialogContent>
                <TextField label="Label"  />
                <TextField label="photo URL" />
            </DialogContent>
            <DialogActions>
                <Button color="inherit">cancel</Button>
                <Button color="success">submit</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default Models