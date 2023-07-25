import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, Container, MenuItem, Popover, Typography, Stack, Button, IconButton, Modal, Box, TextField, CircularProgress } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { useGetTasks } from '../hooks/useGetTasks';
import { useStoreNewTask } from '../hooks/useStoreNewTask';
import { fDate } from '../utils/formatTime';



function createData(title, start, due, responsable) {
  return { title, start, due, responsable };
}

export default function TaskPage() {

  const [open, setOpen] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [dateStart, setDateStart] = React.useState(null);
  const [deadline, setDeadline] = React.useState(null);
  const [titleError, setTitleError] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');
  const [startError, setStartError] = React.useState('');
  const [dueError, setDueError] = React.useState('');

  const { errors, isLoading, storeNewTask } = useStoreNewTask('http://localhost:8080/tasks/create', { title, description, dateStart, deadline });
  const { tasks, error, isTasksLoading } = useGetTasks('http://localhost:8080/tasks/');
  React.useEffect(() => {
    if (errors) {
      setTitleError(errors.title || '');
      setDescriptionError(errors.description || '');
      setStartError(errors.start || '');
      setDueError(errors.due || '');
    }
  }, [errors]);

  let rows = [];
  if (!isTasksLoading && tasks) {
    rows = tasks.map(task => createData(task.title, fDate(task.dateStart), fDate(task.deadline), 'Youssef'));
  }

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setTitle(null);
    setDescription(null);
    setDateStart(null);
    setDeadline(null);
    setTitleError(null)
    setDescriptionError(null)
    setStartError(null)
    setDueError(null)
    setOpenModal(false);
  };

  const cancel = () => {

    handleCloseModal()
  }

  console.log(errors)
  const submitTasks = async e => {
    e.preventDefault();

    const isTaskAdd = await storeNewTask();
    if (isTaskAdd) {
      handleCloseModal();
      window.location.reload();
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
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenModal}>
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
                <Button disabled={isLoading} variant="contained" onClick={submitTasks}>Add this task</Button>
                <Button onClick={cancel}>Cancel</Button>
              </Stack>
            </Box>
          </Box>
        </Modal>


        {isTasksLoading ? <CircularProgress sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} disableShrink /> :
          <Card>
            {error && <Typography variant='body2'>{error}</Typography>}
            <Scrollbar>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Task title</TableCell>
                      <TableCell align="center">Start</TableCell>
                      <TableCell align="center">Due</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center"> </TableCell>
                    </TableRow>
                  </TableHead>


                  <TableBody>
                    {rows.map((row, i) => (

                      <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                        <TableCell component="th" scope="row">
                          {row.title}
                        </TableCell>

                        <TableCell align="center">{row.start}</TableCell>

                        <TableCell align="center">{row.due}</TableCell>

                        <TableCell align="center">
                          {row.responsable}
                        </TableCell>


                        <TableCell align="center">
                          <IconButton size="md" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>

                      </TableRow>

                    ))}
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
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
