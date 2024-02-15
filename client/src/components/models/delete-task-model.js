import React from 'react'
import { useQueryClient } from 'react-query';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography
} from '@mui/material'
import { useDeleteTask, useAuthContext } from '../../hooks';


function DeleteTaskModel({
    deleteConfirmationOpen,
    setDeleteConfirmationOpen,
    taskSelected,
    setOpenSnackbar,
    setSnackbarMsg,
}) {

    const queryClient = useQueryClient();

    const { auth } = useAuthContext()

    const { isError, error, isLoading, mutate: deleteTask } = useDeleteTask({
        onSuccess: () => {
            setOpenSnackbar(true);
            setSnackbarMsg('This task was deleted.')
            setDeleteConfirmationOpen(false);
            queryClient.invalidateQueries(["gettasks", auth?.user?._id])
            setTimeout(() => {
                setOpenSnackbar(false);
            }, 1500);
        }
    });

    const submitDeleteTask = () => {
        deleteTask(taskSelected?.id);

    }
    return (
        <Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this task?
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

export default DeleteTaskModel