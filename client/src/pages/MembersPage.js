import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,

  Alert,
  AlertTitle,
  IconButton,
  Popover,
  MenuItem,
  Snackbar,
} from '@mui/material';
// hooks
import useGetMembers from '../hooks/useGetMembers';

import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { AddMemberModel, DeleteMemberModel, UpdateMemberModel } from '../components/models';
import { UserListHead } from '../sections/@dashboard/user';
import useAuthContext from '../hooks/useAuthContext';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'team', label: 'Team', alignRight: false },
  { id: 'actions', label: ' ', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function MembersPage() {
  const { user } = useAuthContext();


  const { error, isLoading, members } = useGetMembers('http://localhost:3001/member');

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');


  const [orderBy, setOrderBy] = useState('name');

  const [filterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openModal, setOpenModal] = useState(false);

  const [open, setOpen] = useState(false);

  const [openUpdate, setOpenUpdate] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [snackbarMsg, setSnackbarMsg] = useState('');


  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const [memberSelected, setMemberSelected] = useState(null);


  let users = []
  console.log('members: ', members);

  if (!isLoading && members) {
    users = members.map((member) => ({
      id: member._id,
      name: member.name,
      email: member.email,
      role: member.post,
      team: member.team,
    }));
  }



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleOpenMenu = (event, memberId) => {
    setMemberSelected(memberId);
    setOpen(event.currentTarget);
    console.log('three point:', memberSelected);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setMemberSelected(null);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;


  if (isLoading) return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} disableShrink />

  if (error) return (<Typography variant='h6' color='error' sx={{ paddingInline: '3em' }}>
    <Alert severity="error">
      <AlertTitle>error</AlertTitle>
      {error.message}<br />
      This could be due a server issue.<br />
      Check if you are connecting to the server or internet.<br />
    </Alert>
  </Typography>)

  return (
    <>
      <Helmet>
        <title> Member | TaskHub </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Members
          </Typography>
          {user.member.post.toLowerCase() === 'admin' &&
            (<Button className='bg-black hover:bg-gray-900' variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setOpenModal(true)}>
              New Member
            </Button>)}
        </Stack>

        <AddMemberModel
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
        <DeleteMemberModel
          deleteConfirmationOpen={deleteConfirmationOpen}
          setDeleteConfirmationOpen={setDeleteConfirmationOpen}
          memberSelected={memberSelected}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarMsg={setSnackbarMsg}
        />

        <UpdateMemberModel
          openModal={openUpdate}
          setOpenModal={setOpenUpdate}
          memberSelected={memberSelected}
          members={filteredUsers}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarMsg={setSnackbarMsg}
        />


        {isLoading ? <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} disableShrink /> :

          !filteredUsers.length ?
            <Alert severity="info">
              <AlertTitle>info</AlertTitle>
              There is no Members yet
            </Alert>
            :

            (<Card>

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={user?.member?.post.toLowerCase() === 'admin' ? TABLE_HEAD : TABLE_HEAD.slice(0, -1)}
                      rowCount={users.length}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { id, name, role, team, email } = row;

                        return (
                          <TableRow hover key={id} tabIndex={-1}>


                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2} sx={{ paddingLeft: '4px' }}>
                                <Typography variant="subtitle2" noWrap>
                                  {name}{user.member.name === name && " (You)"}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{email}</TableCell>

                            <TableCell align="left">{role}</TableCell>

                            <TableCell align="left">{team}</TableCell>
                            {user.member.post.toLowerCase() === 'admin' && user.member.email !== email && (<TableCell align="center">
                              <IconButton size="md" color="inherit" onClick={e => handleOpenMenu(e, id)}>
                                <Iconify icon={'eva:more-vertical-fill'} />
                              </IconButton>
                            </TableCell>)}

                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>

                    {isNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <Paper
                              sx={{
                                textAlign: 'center',
                              }}
                            >
                              <Typography variant="h6" paragraph>
                                Not found
                              </Typography>

                              <Typography variant="body2">
                                No results found for &nbsp;
                                <strong>&quot;{filterName}&quot;</strong>.
                                <br /> Try checking for typos or using complete words.
                              </Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
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
        <MenuItem sx={{ color: 'error.main' }} onClick={() => setDeleteConfirmationOpen(true)} >
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete Member
        </MenuItem>
        <MenuItem sx={{ color: 'success.main' }} onClick={() => setOpenUpdate(true)} >
          <Iconify icon={'mdi:pencil'} sx={{ mr: 2 }} />
          Update Member
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
