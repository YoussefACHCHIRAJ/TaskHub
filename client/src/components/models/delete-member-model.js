/* eslint-disable react/prop-types */
import React from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography
} from '@mui/material'
import useDeleteMember from '../../hooks/useDeleteMember';


const DeleteMemberModal = ({
    deleteConfirmationOpen,
    setDeleteConfirmationOpen,
    memberSelected,
    setOpenSnackbar,
    setSnackbarMsg,
    refetchMembers,
}) => {
    const { isError, error, isLoading, mutate: deleteMember } = useDeleteMember({
        onSuccess: () => {
            setOpenSnackbar(true);
            setSnackbarMsg('This member was deleted.')
            setDeleteConfirmationOpen(false);
            refetchMembers()
            setTimeout(() => {
                setOpenSnackbar(false);
            }, 1500);
        }
    });
    const submitDeleteTask = async () => {
        deleteMember(memberSelected?.id);

    }
    return (
        <Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to remove <span className='font-bold'>{memberSelected?.name}</span> from your team?
                    This member's account will be deleted for ever.
                </DialogContentText>
                {isError && error?.authorization &&
                    (<Typography className='block sm:px-2' variant='caption' color='error'>{error?.authorization?.message}</Typography>)}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDeleteConfirmationOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button disabled={isLoading} onClick={submitDeleteTask} color="primary">
                    Delete
                </Button>
            </DialogActions>

        </Dialog>
    )
}

export default DeleteMemberModal