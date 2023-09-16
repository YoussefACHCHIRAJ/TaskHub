import React, { useEffect } from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material'
import { useDeleteTask } from '../../hooks/useDeleteTask';

const DeleteTaskModal = ({
    deleteConfirmationOpen,
    setDeleteConfirmationOpen,
    taskSelected,
    setOpenSnackbar,
    setSnackbarMsg
}) => {
    const { deleteError, deleteIsLoading, deleteTask } = useDeleteTask(`http://localhost:3001/tasks/delete/${taskSelected}`);
    useEffect(() => console.log('model: ', taskSelected), [taskSelected])
    const submitDeleteTask = async () => {
        const isTaskDeleted = await deleteTask();
        if (isTaskDeleted) {
            setOpenSnackbar(true);
            setSnackbarMsg('This task was deleted.')
            setDeleteConfirmationOpen(false);
            if (!deleteIsLoading) {
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }

        } else {
            console.log('error: ', deleteError);
        }
    }
    return (
        <Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this task?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDeleteConfirmationOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button disabled={deleteIsLoading} onClick={submitDeleteTask} color="primary">
                    Delete
                </Button>
            </DialogActions>

        </Dialog>
    )
}

export default DeleteTaskModal