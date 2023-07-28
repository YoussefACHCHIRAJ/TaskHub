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
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  TextField,
  Modal,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
// hooks
import useGetMembers from '../hooks/useGetMembers';
import useStoreMember from '../hooks/useStoreMember';

import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead } from '../sections/@dashboard/user';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'team', label: 'Team', alignRight: false },
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

  const { getMembersError, getMembersIsLoading, members } = useGetMembers('http://localhost:8080/member');
  const { error, isLoading, storeMember } = useStoreMember('http://localhost:8080/member/create')

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');


  const [orderBy, setOrderBy] = useState('name');

  const [filterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openModal, setOpenModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Frontend');

  let users = []

  if (!getMembersIsLoading && members) {
    users = members.map((member) => ({
      id: member._id,
      name: member.name,
      email: member.email,
      role: member.post,
      team: member.team,
    }));
  }


  const cancel = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRole('Fronend');
    setOpenModal(false)
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const submitStoreMember = async e => {
    e.preventDefault();
    const isMemberSotred = await storeMember({ name, email, password, role });

    if (isLoading) {
      console.log('loding...');
    } else {
      console.log('loaded');
      if (isMemberSotred) {
        setOpenModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.log('error: ', error);
      }
    }
  }

  return (
    <>
      <Helmet>
        <title> Member | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Members
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setOpenModal(true)}>
            New Member
          </Button>
        </Stack>

        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { sx: '80%', sm: '65%' }, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '10px' }}>
            <Typography variant='h4' gutterBottom >Add New Member</Typography>
            <Box component='form'>
              <Stack spacing={2}>
                <TextField
                  onChange={e => setName(e.target.value)}
                  id="outlined-basic"
                  label="Full name"
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
                  onChange={e => setEmail(e.target.value)}
                  id="outlined-multiline-flexible"
                  label="Email"
                  name='email'
                  type='email'
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
                <TextField
                  name="password"
                  label="Password"
                  onChange={e => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControl sx={{ m: 1, width: '100%' }}>
                  <InputLabel id="demo-multiple-name-label">Role</InputLabel>
                  <Select
                    onChange={e => setRole(e.target.value)}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    label='Role'
                    value={role}
                  >
                    <MenuItem value='Frontend'>Front end</MenuItem>
                    <MenuItem value='Backend'>Back end</MenuItem>
                    <MenuItem value='Designer'>Designer</MenuItem>
                    <MenuItem value='Devops'>Devops</MenuItem>
                  </Select>
                </FormControl>

                <Button onClick={submitStoreMember} variant="contained">Add this Member</Button>
                <Button onClick={cancel}>Cancel</Button>
              </Stack>
            </Box>
          </Box>
        </Modal>

        {getMembersIsLoading ? <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} disableShrink /> :

          getMembersError ? 'no members' :

            (<Card>

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
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
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{email}</TableCell>

                            <TableCell align="left">{role}</TableCell>

                            <TableCell align="left">{team}</TableCell>

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
    </>
  );
}
