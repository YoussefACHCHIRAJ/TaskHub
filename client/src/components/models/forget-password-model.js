import React from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material'

function ForgetPasswordModel({ open, setOpen }) {
  return <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Forget Password ?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Take a moment to relax and catch your breath before attempting to recall your password. 
                    If you can&apos;t remember it right away, give it another try.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                    Ok
                </Button>
            </DialogActions>

        </Dialog>
}


export default ForgetPasswordModel