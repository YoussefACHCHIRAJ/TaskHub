import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTheme } from '@mui/material/styles';
import { useStoreNewTask } from '../../hooks/useStoreNewTask';


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
    members
}) => {
    const theme = useTheme();

    const [title, setTitle] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [dateStart, setDateStart] = React.useState(null);
    const [deadline, setDeadline] = React.useState(null);

    const [responsables, setResponsables] = React.useState([]);

    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [startError, setStartError] = useState('');
    const [dueError, setDueError] = useState('');

    

    const { errors, isLoading, storeNewTask } = useStoreNewTask('http://localhost:3001/tasks/create',
        { title, description, dateStart, deadline, responsables });
    useEffect(() => {
        if (errors) {
            setTitleError(errors.title || '');
            setDescriptionError(errors.description || '');
            setStartError(errors.start || '');
            setDueError(errors.due || '');
        }
    }, [errors]);
    const handleChangeResponsables = (event) => {
        const {
            target: { value },
        } = event;
        setResponsables(typeof value === 'string' ? value.split(',') : value,);
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

    const submitTasks = async e => {
        e.preventDefault();

        const isTaskAdd = await storeNewTask();

        if (isTaskAdd) {
            handleCloseModal();
            window.location.reload();
        }else{
            console.log('failed create task', errors);
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
                                        minDate={today}
                                        
                                    />
                                    {startError && <Typography variant="body2" fontSize={12} paddingLeft={2} color="error">{startError}</Typography>}
                                </div>
                                <div>
                                    <DatePicker
                                        onChange={date => setDeadline(date)}
                                        label='deadline'
                                        disabled={dateStart === null}
                                        minDate={dayjs(dateStart)}
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

                        <Button className='bg-black hover:bg-gray-900' disabled={isLoading} variant="contained" onClick={submitTasks}>Add this task</Button>
                        <Button onClick={handleCloseModal}>Cancel</Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

export default CreateTaskModal