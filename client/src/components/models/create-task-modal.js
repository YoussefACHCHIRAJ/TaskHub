import React, { useState } from 'react'
import dayjs from 'dayjs';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTheme } from '@mui/material/styles';
import { useStoreNewTask } from '../../hooks/useStoreNewTask';
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
            responsables.indexOf(member) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const CreateTaskModal = ({
    openModal,
    setOpenModal,
    members,
    setOpenSnackbar,
    setSnackbarMsg
}) => {
    const theme = useTheme();
    const { user } = useAuthContext()

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [deadline, setDeadline] = useState('');

    const [responsables, setResponsables] = useState([]);

    const { error, isLoading, storeNewTask } = useStoreNewTask('http://localhost:3001/tasks/create');

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

        setOpenModal(false);
    };

    const submitTasks = async e => {
        e.preventDefault();
        const responsablesArray = responsables.length > 0 ? responsables : null;
        const isTaskAdd = await storeNewTask(
            { title, description, dateStart, deadline, responsables: responsablesArray });

        if (isTaskAdd) {
            handleCloseModal();
            setOpenSnackbar(true);
            setSnackbarMsg('This task was add.');
            if (!isLoading) {
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        }
    }
    return (
        <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { sx: '80%', sm: '65%' }, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '10px' }}>
                <Typography variant='h4' gutterBottom >Add New task</Typography>
                <Box component='form'>
                    <Stack spacing={2}>
                        <TextField
                            onChange={e => setTitle(e.target.value)}
                            helperText={error ? error.title : ''}
                            error={error && error.title}
                            required
                            id="outlined-basic"
                            label="Task title"
                            variant="outlined"
                            fullWidth
                            FormHelperTextProps={{
                                style: {
                                    color: '#f44336',
                                },
                            }}
                        />
                        <TextField
                            onChange={e => setDescription(e.target.value)}
                            helperText={error ? error.description : ''}
                            error={error && error.description}
                            required
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
                                        minDate={today}
                                        className="border border-red-500"
                                        slotProps={{
                                            textField: {
                                                helperText: error ? error.dateStart : '',
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
                                        disabled={dateStart === null}
                                        minDate={dayjs(dateStart)}
                                        error
                                        slotProps={{
                                            textField: {
                                                helperText: error ? error.deadline : '',
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
                                    const memberName = member.name === user.member.name
                                        ? `${member.name} (You)`
                                        : member.name;
                                    return (
                                        <MenuItem
                                            key={member.id}
                                            value={member.name}
                                            style={getStyles(member, responsables, theme)}
                                        >
                                            {memberName}
                                        </MenuItem>
                                    )
                                })}

                            </Select>
                            {error && error.responsables && (<Typography className='block sm:px-4' variant='caption' color='error'>{error.responsables}</Typography>)}

                        </FormControl>

                        <Button className='bg-black hover:bg-gray-900' disabled={isLoading} variant="contained" onClick={submitTasks}>Add this task</Button>
                        <Button onClick={handleCloseModal}>Cancel</Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

export default CreateTaskModal