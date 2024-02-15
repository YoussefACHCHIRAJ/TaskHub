import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
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
  TablePagination,
} from '@mui/material';

import {
  DeleteTaskModel,
  CreateTaskModel,
  UpdateTaskModel,
  AskForCreateTeamModal,
  TaskCategorySelectorModal,
  ErrorMessageModel
} from '../components/models';

import { fDate } from '../utils/formatTime';
import Iconify from '../components/iconify';

import Row from '../components/row/row';

import { useGetTasks, useAuthContext } from '../hooks';

import { UserListHead } from '../sections/@dashboard/user';
import Scrollbar from '../components/scrollbar';


const TABLE_HEAD = [
  { id: 'responsibles', label: ' ', alignRight: false },
  { id: 'Task title', label: 'Task title', alignRight: false },
  { id: 'Start', label: 'Start', alignRight: false },
  { id: 'Due', label: 'Due', alignRight: false },
  { id: 'Status', label: 'Status ', alignRight: false },
  { id: 'actions', label: ' ', alignRight: false },
];


// function applyCategoryFilter(array, filter){
//   return array.filter(item => item?.)
// }

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

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openModal, setOpenModal] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const [taskSelected, setTaskSelected] = useState(null);

  const [rows, setRows] = useState([]);

  const [members, setMembers] = useState([]);

  const [snackbarMsg, setSnackbarMsg] = useState('');

  const [category, setCategory] = useState('All');

  const { data, error, isLoading, isError } = useGetTasks();



  useEffect(() => {
    if (!isLoading) {
      const newRows = data?.tasks?.map(task => createData(task._id, task.title, fDate(task.dateStart), fDate(task.deadline), task.description, task.responsibleUsers));
      setRows(newRows);
      const newMembers = data?.teamMembers?.map(member => ({ id: member._id, name: member.name }));
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


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
            {auth?.user?.role?.toLowerCase() === 'leader' && (<Button disabled={isError} className='bg-black hover:bg-gray-900' variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setOpenModal(true)}>
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
        />
        <DeleteTaskModel
          deleteConfirmationOpen={deleteConfirmationOpen}
          setDeleteConfirmationOpen={setDeleteConfirmationOpen}
          taskSelected={taskSelected}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarMsg={setSnackbarMsg}
        />

        <UpdateTaskModel
          openUpdate={openUpdate}
          setOpenUpdate={setOpenUpdate}
          members={members}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarMsg={setSnackbarMsg}
          taskSelected={taskSelected}
          tasks={rows}
        />


        {isLoading ? <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} disableShrink /> :

          isError ? <ErrorMessageModel message={error?.message} /> :
            rows.length === 0 ?
              <Alert severity="info">
                <AlertTitle>info</AlertTitle>
                There is no Tasks
              </Alert> :
              (<Card>

                <Scrollbar>
                  <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                      <UserListHead
                        headLabel={auth.user?.role?.toLowerCase() === 'leader' ? TABLE_HEAD : TABLE_HEAD.slice(0, -1)}
                        rowCount={rows.length}
                      />
                      <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (<Row key={row?.id} row={row} selectedCategory={category} handleOpenMenu={handleOpenMenu} options={Boolean(true)} />)
                        )}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>


                    </Table>
                  </TableContainer>
                </Scrollbar>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Card>)
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
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete task
        </MenuItem>
        <MenuItem sx={{ color: 'success.main' }} onClick={() => { setOpenUpdate(true); setOpen(false) }} >
          <Iconify icon="mdi:pencil" sx={{ mr: 2 }} />
          Update task
        </MenuItem>
      </Popover>

      <Snackbar open={openSnackbar} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
