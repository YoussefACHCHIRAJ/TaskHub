import React from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material'

const DeleteMemberModel = ({
    deleteConfirmationOpen,
    setDeleteConfirmationOpen,
    memberSelected,
    setOpenSnackbar,
    setSnackbarMsg
}) => {
    const submitDeleteTask = async () => {
            setOpenSnackbar(true);
            setSnackbarMsg('This member was removed.');
            setDeleteConfirmationOpen(false);
    }
    console.log('member selected: ', memberSelected);
    return (
        <Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
            <DialogTitle>Remove member from Team</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to remove this member from your team?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDeleteConfirmationOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={submitDeleteTask} color="primary">
                    Remove
                </Button>
            </DialogActions>

        </Dialog>
    )
}

export default DeleteMemberModel