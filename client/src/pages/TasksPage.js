import * as React from 'react';
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

import { DeleteTaskModal, CreateTaskModal } from '../components/models';
import { useGetTasks } from '../hooks/useGetTasks';
import { fDate } from '../utils/formatTime';

import Scrollbar from '../components/scrollbar';
import Row from '../components/row/row';

import Iconify from '../components/iconify';
import useAuthContext from '../hooks/useAuthContext';
import CategorizeTasksModale from '../components/models/categorize-tasks-model';



function createData(id, title, start, due, description, responsables, categorize) {
  return {
    id,
    title,
    start,
    due,
    description,
    responsables,
    categorize
  };
}


export default function TaskPage() {
  const { user } = useAuthContext();


  const [taskSelected, setTaskSelected] = React.useState(null);


  const { tasks, teamMembers, error, isTasksLoading } = useGetTasks('http://localhost:3001/tasks/');

  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState(false);
  const [categorize, setCategorize] = React.useState('All');
  const [rows, setRows] = React.useState([]);
  const [members, setMembers] = React.useState([]);
  const [snackbarMsg, setSnackbarMsg] = React.useState('');
  
  React.useEffect(() => {
    if (!isTasksLoading && tasks) {
      const newRows = tasks.map(task => createData(task._id, task.title, fDate(task.dateStart), fDate(task.deadline), task.description, task.responsables, categorize));
      setRows(newRows);
      const newMembers = teamMembers.map(member => ({ id: member._id, name: member.name }));
      setMembers(newMembers);
    }
  }, [isTasksLoading, tasks, teamMembers, categorize]);

  const handleOpenMenu = (event, taskId) => {
    setTaskSelected(taskId);
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
    setTaskSelected(null);
  };

  React.useEffect(() => console.log('origin:', taskSelected), [taskSelected]);

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
            <CategorizeTasksModale categorize={categorize} setCategorize={setCategorize} />
            {user.member.post.toLowerCase() === 'admin' && (<Button className='bg-black hover:bg-gray-900' variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setOpenModal(true)}>
              New Task
            </Button>)}
          </Stack>
        </Stack>

        <CreateTaskModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          members={members}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarMsg={setSnackbarMsg}
        />
        <DeleteTaskModal
          deleteConfirmationOpen={deleteConfirmationOpen}
          setDeleteConfirmationOpen={setDeleteConfirmationOpen}
          taskSelected={taskSelected}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarMsg={setSnackbarMsg}
        />


        {isTasksLoading ? <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} disableShrink /> :
          rows.length === 0 ?
            <Alert severity="info">
              <AlertTitle>info</AlertTitle>
              There is no Tasks
            </Alert>
            :
            <Card>
              {error && <Typography variant='body2'>{error}</Typography>}
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
                        {user.member.post.toLowerCase() === 'admin' && (<TableCell align="center"> </TableCell>)}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <Row key={row.id} row={row} handleOpenMenu={handleOpenMenu} options={Boolean(true)} />
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
        <MenuItem sx={{ color: 'error.main' }} onClick={() => setDeleteConfirmationOpen(true)} >
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete task
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
