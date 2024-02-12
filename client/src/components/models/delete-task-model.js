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
import useDeleteTask from '../../hooks/useDeleteTask';


function DeleteTaskModel({
    deleteConfirmationOpen,
    setDeleteConfirmationOpen,
    taskSelected,
    setOpenSnackbar,
    setSnackbarMsg,
    refetchTasks,
}) {
    const { isError, error, isLoading, mutate: deleteTask } = useDeleteTask({
        onSuccess: () => {
            setOpenSnackbar(true);
            setSnackbarMsg('This task was deleted.')
            setDeleteConfirmationOpen(false);
            refetchTasks()
            setTimeout(() => {
                setOpenSnackbar(false);
            }, 1500);
        }
    });
    const submitDeleteTask = async () => {
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