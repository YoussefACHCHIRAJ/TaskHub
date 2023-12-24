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
    Typography,
    Stack,
    CircularProgress,
    Alert,
    AlertTitle,
} from '@mui/material';

import useGetTasks from '../hooks/useGetTasks';
import { fDate } from '../utils/formatTime';

import Scrollbar from '../components/scrollbar';
import Row from '../components/row/row';

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


export default function YourTasksPage() {
    const { user } = useAuthContext();

    const { tasks, error, isLoading } = useGetTasks('http://localhost:3001/tasks/');
    const [categorize, setCategorize] = React.useState('All');

    let rows = [];

    if (!isLoading && tasks) {
        rows = tasks.filter(task => task.responsables.includes(user.member.name))
            .map(task => createData(
                task._id,
                task.title,
                fDate(task.dateStart),
                fDate(task.deadline),
                task.description,
                task.responsables,
                categorize)
            );
    }
    if (isLoading) return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} disableShrink />

    if (error) return (<Typography variant='h6' color='error' sx={{ paddingInline: '3em' }}>
        <Alert severity="error">
            <AlertTitle>error</AlertTitle>
            {error.message}<br/>
            This could be due a server issue.<br/>
            Check if you are connecting to the server or internet.<br/>
        </Alert>
    </Typography>)
    return (
        <>
            <Helmet>
                <title> Your Tasks | TaskHub </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        Your Tasks {user.member.name}
                    </Typography>
                    <CategorizeTasksModale categorize={categorize} setCategorize={setCategorize} />
                </Stack>

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
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <Row key={row.id} row={row} options={false} />
                                            ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Scrollbar>
                        </Card>
                }
            </Container>

        </>
    );
}
