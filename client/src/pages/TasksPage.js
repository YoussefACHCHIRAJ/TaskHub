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
  Modal,
  Box,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  AlertTitle,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  DatePicker,
  LocalizationProvider
} from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useGetTasks } from '../hooks/useGetTasks';
import { useStoreNewTask } from '../hooks/useStoreNewTask';
import { useDeleteTask } from '../hooks/useDeleteTask';
import { fDate } from '../utils/formatTime';

import Scrollbar from '../components/scrollbar';
import Row from '../components/row/row';

import Iconify from '../components/iconify';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function createData(id, title, start, due, description, responsables) {
  return {
    id,
    title,
    start,
    due,
    description,
    responsables,
  };
}
function getStyles(member, responsables, theme) {
  return {
    fontWeight:
      responsables.indexOf(member) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function TaskPage() {
  const theme = useTheme();
  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [dateStart, setDateStart] = React.useState(null);
  const [deadline, setDeadline] = React.useState(null);

  const [titleError, setTitleError] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');
  const [startError, setStartError] = React.useState('');
  const [dueError, setDueError] = React.useState('');

  const [responsables, setResponsables] = React.useState([]);
  const [taskSelected, setTaskSelected] = React.useState(null);

  const { errors, isLoading, storeNewTask } = useStoreNewTask('http://localhost:8080/tasks/create',
    { title, description, dateStart, deadline, responsables });
  const { tasks, teamMembers, error, isTasksLoading } = useGetTasks('http://localhost:8080/tasks/');
  const { deleteError, deleteIsLoading, deleteTask } = useDeleteTask(`http://localhost:8080/tasks/delete/${taskSelected}`);

  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState(false);

  React.useEffect(() => {
    if (errors) {
      setTitleError(errors.title || '');
      setDescriptionError(errors.description || '');
      setStartError(errors.start || '');
      setDueError(errors.due || '');
    }
  }, [errors]);

  let rows = [];
  let members = [];
  if (!isTasksLoading && tasks) {
    rows = tasks.map(task => createData(task._id, task.title, fDate(task.dateStart), fDate(task.deadline), task.description, task.responsables));
    members = teamMembers.map(member => ({ id: member._id, name: member.name }));
  }

  const handleOpenMenu = (event, taskId) => {
    setTaskSelected(taskId);
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
    setTaskSelected(null);
  };

  const handleCloseModal = () => {
    setTitle(null);
    setDescription(null);
    setDateStart(null);
    setDeadline(null);
    setResponsables([]);

    setTitleError(null)
    setDescriptionError(null)
    setStartError(null)
    setDueError(null)
    setOpenModal(false);
  };

  const handleChangeResponsables = (event) => {
    const {
      target: { value },
    } = event;
    setResponsables(typeof value === 'string' ? value.split(',') : value,);
  };

  const submitTasks = async e => {
    e.preventDefault();

    const isTaskAdd = await storeNewTask();

    if (isTaskAdd) {
      handleCloseModal();
      if (!isTasksLoading) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  }

  const submitDeleteTask = async () => {
    const isTaskDeleted = await deleteTask();
    if (isTaskDeleted) {
      setOpenSnackbar(true);
      setDeleteConfirmationOpen(false);
      if (!deleteIsLoading) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }

    } else {
      console.log(deleteError);
    }
  }


  return (
    <>
      <Helmet>
        <title> Tasks | Minimal UI </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tasks
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setOpenModal(true)}>
            New Task
          </Button>
        </Stack>

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { sx: '80%', sm: '65%' }, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '10px' }}>
            <Typography variant='h4' gutterBottom >Add New task</Typography>
            <Box component='form'>
              <Stack spacing={2}>
                <TextField
                  onChange={e => setTitle(e.target.value)}
                  helperText={titleError}
                  id="outlined-basic"
                  label="Task title"
                  variant="outlined"
                  fullWidth
                  required
                  FormHelperTextProps={{
                    style: {
                      color: '#f44336',
                    },
                  }}
                />
                <TextField
                  onChange={e => setDescription(e.target.value)}
                  helperText={descriptionError}
                  id="outlined-multiline-flexible"
                  label="task description"
                  maxRows={4}
                  multiline
                  fullWidth
                  required
                  FormHelperTextProps={{
                    style: {
                      color: '#f44336',
                    },
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack direction={{ sx: 'column', sm: 'row' }} gap={2}>
                    <div>
                      <DatePicker
                        onChange={date => setDateStart(date)}
                        label='date start'
                      />
                      {startError && <Typography variant="body2" fontSize={12} paddingLeft={2} color="error">{startError}</Typography>}
                    </div>
                    <div>
                      <DatePicker
                        onChange={date => setDeadline(date)}
                        label='deadline'
                      />
                      {dueError && <Typography variant="body2" fontSize={12} paddingLeft={2} color="error">{dueError}</Typography>}
                    </div>
                  </Stack>
                </LocalizationProvider>

                <FormControl sx={{ m: 1, width: '100%' }}>
                  <InputLabel id="demo-multiple-name-label">Responsables</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={responsables}
                    onChange={handleChangeResponsables}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                  >
                    {members.map((member) => (
                      <MenuItem
                        key={member.id}
                        value={member.name}
                        style={getStyles(member, responsables, theme)}
                      >
                        {member.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button disabled={isLoading} variant="contained" onClick={submitTasks}>Add this task</Button>
                <Button onClick={handleCloseModal}>Cancel</Button>
              </Stack>
            </Box>
          </Box>
        </Modal>


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
                        <TableCell align="center"> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <Row key={row.id} row={row} handleOpenMenu={handleOpenMenu} />
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
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          This deleted
        </Alert>
      </Snackbar>
    </>
  );
}
