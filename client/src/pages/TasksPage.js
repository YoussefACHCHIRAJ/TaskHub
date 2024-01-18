import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Container,
  MenuItem,
  Popover,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  AlertTitle,
} from '@mui/material';

import { DeleteTaskModel, CreateTaskModel, UpdateTaskModel, AskForCreateTeamModal, TaskCategorySelectorModal } from '../components/models';
import useGetTasks from '../hooks/useGetTasks';
import { fDate } from '../utils/formatTime';

import Scrollbar from '../components/scrollbar';
import Row from '../components/row/row';

import Iconify from '../components/iconify';
import useAuthContext from '../hooks/useAuthContext';



function createData(id, title, start, due, description, responsibleUsers) {
  return {
    id,
    title,
    start,
    due,
    description,
    responsibleUsers,
    };
}


export default function TaskPage() {
  const { auth } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const [taskSelected, setTaskSelected] = useState(null);
  const [rows, setRows] = useState([]);
  const [members, setMembers] = useState([]);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [category, setCategory] = useState('All');

  const { data, error, isLoading, isError, refetch: reftechTasksData } = useGetTasks();

  useEffect(() => {
    if (!isLoading && data) {
      const newRows = data?.tasks && data?.tasks?.map(task => createData(task._id, task.title, fDate(task.dateStart), fDate(task.deadline), task.description, task.responsibleUsers));
      setRows(newRows);
      const newMembers = data?.teamMembers && data.teamMembers.map(member => ({ id: member._id, name: member.name }));
      setMembers(newMembers);
    }
  }, [isLoading, data, category]);

  const handleOpenMenu = (event, task) => {
    setTaskSelected(task);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setTaskSelected(null);
  };

  if (isLoading) return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} disableShrink />

  if (isError) return (<Typography variant='h6' color='error' sx={{ paddingInline: '3em' }}>
    <Alert severity="error">
      <AlertTitle>error</AlertTitle>
      {error.message}<br />
      This could be due a server issue.<br />
      Check if you are connecting to the server or internet.<br />
    </Alert>
  </Typography>)

  if (!auth?.user?.team) {
    return (
      <AskForCreateTeamModal />
    )
  }

  return (
    <>
      <Helmet>
        <title> Tasks | TaskHub </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            Tasks
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <TaskCategorySelectorModal category={category} setCategory={setCategory} />
            {auth?.user?.role?.toLowerCase() === 'leader' && (<Button className='bg-black hover:bg-gray-900' variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setOpenModal(true)}>
              New Task
            </Button>)}
          </Stack>
        </Stack>

        <CreateTaskModel
          openModal={openModal}
          setOpenModal={setOpenModal}
          members={members}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarMsg={setSnackbarMsg}
          reftechTasksData={reftechTasksData}
        />
        <DeleteTaskModel
          deleteConfirmationOpen={deleteConfirmationOpen}
          setDeleteConfirmationOpen={setDeleteConfirmationOpen}
          taskSelected={taskSelected}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarMsg={setSnackbarMsg}
          refetchTasks={reftechTasksData}
        />

        <UpdateTaskModel
          openUpdate={openUpdate}
          setOpenUpdate={setOpenUpdate}
          members={members}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarMsg={setSnackbarMsg}
          taskSelected={taskSelected}
          tasks={rows}
          refetchTasks={reftechTasksData}
        />


        {isLoading ? <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} disableShrink /> :
          rows.length === 0 ?
            <Alert severity="info">
              <AlertTitle>info</AlertTitle>
              There is no Tasks
            </Alert>
            :
            <Card>
              <Scrollbar>
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell />
                        <TableCell>Task title</TableCell>
                        <TableCell align="center">Start</TableCell>
                        <TableCell align="center">Due</TableCell>
                        <TableCell align="center">Status</TableCell>
                        {auth?.user?.role?.toLowerCase() === 'leader' && (<TableCell align="center"> </TableCell>)}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <Row key={row.id} row={row} selectedCategory={category} handleOpenMenu={handleOpenMenu} options={Boolean(true)} />
                      ))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>

              </Scrollbar>
            </Card>
        }
      </Container>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem sx={{ color: 'error.main' }} onClick={() => { setDeleteConfirmationOpen(true); setOpen(false) }} >
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete task
        </MenuItem>
        <MenuItem sx={{ color: 'success.main' }} onClick={() => { setOpenUpdate(true); setOpen(false) }} >
          <Iconify icon={'mdi:pencil'} sx={{ mr: 2 }} />
          Update task
        </MenuItem>
      </Popover>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
