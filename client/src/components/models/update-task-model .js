/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTheme } from '@mui/material/styles';
import useUpdateTask from '../../hooks/useUpdateTask';
import useAuthContext from '../../hooks/useAuthContext';


const today = dayjs();
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

function getStyles(member, responsables, theme) {
    return {
        fontWeight:
            responsables?.indexOf(member) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function UpdateTaskModel({
    openUpdate,
    setOpenUpdate,
    members,
    setOpenSnackbar,
    setSnackbarMsg,
    taskSelected,
    refetchTasks,
    tasks
}) {
    const theme = useTheme();
    const { auth } = useAuthContext()

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [deadline, setDeadline] = useState('');

    const [responsables, setResponsables] = useState([]);

    const { isError, error, isLoading, mutate: storeNewTask, reset } = useUpdateTask({
        onSuccess: () => {
            handleCloseModal();
            setOpenSnackbar(true);
            setSnackbarMsg('This task was updated.');
            refetchTasks();
            setTimeout(() => {
                setOpenSnackbar(false);
            }, 1500);
        }
    });

    const handleChangeResponsables = (event) => {
        const {
            target: { value },
        } = event;
        setResponsables(typeof value === 'string' ? value.split(',') : value,);
    };

    const handleCloseModal = () => {
        setTitle('');
        setDescription('');
        setDateStart('');
        setDeadline('');
        setResponsables([]);
        reset()
        setOpenUpdate(false);
    };


    const submitTasks = event => {
        event.preventDefault();
        const responsablesArray = responsables?.length > 0 ? responsables : null;
        const updatedTask = { title, description, dateStart, deadline, responsables: responsablesArray };
        storeNewTask({ taskId: taskSelected.id, updatedTask });

    }
    useEffect(() => {
        if (taskSelected) {
            const { title, description, dateStart, deadline, responsibleUsers } = taskSelected;
            setTitle(title);
            setDescription(description);
            setDateStart(dateStart);
            setDeadline(deadline);
            setResponsables(responsibleUsers?.map(respo => respo._id));
        }
    }, [taskSelected, tasks]);
    return (
        <Modal open={openUpdate} onClose={handleCloseModal}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { sx: '80%', sm: '65%' }, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '10px' }}>
                <Typography variant='h4' gutterBottom >Add New task</Typography>
                <Box component='form'>
                    <Stack spacing={2}>
                        <TextField
                            onChange={e => setTitle(e.target.value)}
                            helperText={isError ? error.title : ''}
                            error={isError && error.title}
                            required
                            id="outlined-basic"
                            label="Task title"
                            variant="outlined"
                            defaultValue={title}
                            fullWidth
                            FormHelperTextProps={{
                                style: {
                                    color: '#f44336',
                                },
                            }}
                        />
                        <TextField
                            onChange={e => setDescription(e.target.value)}
                            helperText={isError ? error.description : ''}
                            error={isError && error.description}
                            required
                            defaultValue={description}
                            id="outlined-multiline-flexible"
                            label="task description"
                            maxRows={4}
                            multiline
                            fullWidth
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
                                        label='date start *'
                                        value={dayjs(dateStart)}
                                        minDate={today}
                                        slotProps={{
                                            textField: {
                                                helperText: isError ? error.dateStart : '',
                                            },
                                            tabs: {
                                                color: 'red'
                                            }
                                        }}
                                    />

                                </div>
                                <div>
                                    <DatePicker
                                        onChange={date => setDeadline(date)}
                                        label='deadline *'
                                        value={dayjs(deadline)}
                                        disabled={dateStart === null}
                                        minDate={dayjs(dateStart)}
                                        error
                                        slotProps={{
                                            textField: {
                                                helperText: isError ? error.deadline : '',
                                            },

                                        }}
                                    />
                                </div>
                            </Stack>
                        </LocalizationProvider>

                        <FormControl
                            sx={{ m: 1, width: '100%' }}
                            error={error && error.responsables}
                            required>
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

                                {members.map((member) => {
                                    const memberName = member.name === auth.user.name
                                        ? `${member.name} (You)`
                                        : member.name;
                                    return (
                                        <MenuItem
                                            key={member.id}
                                            value={member.id}
                                            style={getStyles(member, responsables, theme)}
                                        >
                                            {memberName}
                                        </MenuItem>
                                    )
                                })}

                            </Select>
                            {error && error.responsables && (<Typography className='block sm:px-4' variant='caption' color='error'>{error.responsables}</Typography>)}

                        </FormControl>
                        {isError && error?.authorization &&
                            (<Typography className='block sm:px-2' variant='caption' color='error'>{error?.authorization?.message}</Typography>)}
                        <Button className='bg-black hover:bg-gray-900' variant="contained" onClick={submitTasks} disabled={isLoading}>Update this task</Button>
                        <Button onClick={handleCloseModal}>Cancel</Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

export default UpdateTaskModel