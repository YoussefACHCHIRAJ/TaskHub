import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, Container, MenuItem, Popover, Typography, Stack, Button, IconButton } from '@mui/material';
import useFetchData from '../hooks/useFetchData';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import Label from '../components/label';

const setColor = status => {

  if (status === 'End') {
    return 'error';
  }
  if (status === 'Progress') {
    return 'success';
  }
  return 'info';
}

function createData(title, start, due, status) {
  return { title, start, due, status };
}

const rows = [
  createData('create database', '03/06/2023', '20/06/2023', 'To do'),
  createData('Ice cream sandwich', '12/11/2023', '22/11/2023', 'Progress'),
  createData('Eclair', '23/12/2023', '27/12/2023', 'To do'),
  createData('Cupcake', '05/04/2024', '03/05/2024', 'End'),
  createData('Gingerbread', '19/03/2024', '28/03/2024', 'Progress'),
];

export default function TaskPage() {
  const [open, setOpen] = React.useState(null);
  const {tasks, error, loading} = useFetchData("localhost:8080/tasks");

  if(loading){
    console.log('loading...');
  }
  if(error){
    console.log('error: ', error);
  }
  console.log('tasks:', tasks);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };


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
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Task
          </Button>
        </Stack>

        <Card>
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

                  {rows.map((row) => (

                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>

                      <TableCell align="center">{row.start}</TableCell>

                      <TableCell align="center">{row.due}</TableCell>

                      <TableCell align="center">
                        <Label color={setColor(row.status)}>{row.status}</Label>
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
