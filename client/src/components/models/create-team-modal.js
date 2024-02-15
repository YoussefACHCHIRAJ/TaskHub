import React, { useState } from 'react';

import {
    Typography,
    TextField,
    Modal,
    Box,
    Stack,
    Button,
} from '@mui/material'

import { useStoreTeam } from '../../hooks';

function CreateTeamModal({
    openModal,
    setOpenModal,
    setOpenSnackbar,
    setSnackbarMsg,
}) {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [roles, setRoles] = useState(new Set());

    const { mutate: storeTeam, error, isError, isLoading, reset } = useStoreTeam({
        onSuccess: () => {
            setOpenModal(false);
            setOpenSnackbar(true);
            setSnackbarMsg("The team has been created");
        }
    });

    const handleAddRole = () => {
        const updatedRoles = new Set(roles);
        updatedRoles.add(role);
        setRoles(updatedRoles);
        setRole('');
    }

    const handleRemoveRole = role => {
        const updateRoles = new Set(roles);
        updateRoles.delete(role);
        setRoles(updateRoles);
    }

    const cancel = () => {
        setName('');
        setRoles(new Set());
        setRole('');
        reset();
        setOpenModal(false);

    }


    const submit = e => {
        e.preventDefault();
        storeTeam({ name, roles: Array.from(roles) });
    }
    return (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { sx: '80%', sm: '65%' }, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '10px' }}>
                <Typography variant='h4' gutterBottom >Team</Typography>
                <Box component='form'>
                    <Stack spacing={2}>
                        <TextField
                            onChange={e => setName(e.target.value)}
                            id="outlined-basic"
                            label="Team name"
                            variant="outlined"
                            fullWidth
                            required
                            error={isError && error?.name}
                            helperText={isError ? error?.name : ''}
                            FormHelperTextProps={{
                                style: {
                                    color: '#f44336',
                                },
                            }}
                        />

                        <Stack direction="row" spacing={2}>
                            <TextField
                                onChange={e => setRole(e.target.value)}
                                id="outlined-basic"
                                value={role}
                                label="Roles"
                                variant="outlined"
                                fullWidth
                                required
                                error={isError && error?.roles}
                                helperText={isError ? error?.roles : ''}
                                FormHelperTextProps={{
                                    style: {
                                        color: '#f44336',
                                    },
                                }}
                            />
                            <Button onClick={handleAddRole} className=' bg-teal-600 hover:bg-teal-900 text-sm' variant="contained">Add role</Button>
                        </Stack>
                        <div className='space-x-3 text-sm bg-gray-100 py-3 px-2 rounded-xl flex '>
                            {Array.from(roles)?.map(role => (
                                <span key={role} className="bg-gray-300 py-1 text-gray-600 px-1 rounded-xl flex grow-0 shrink-0 gap-2 items-center">
                                    {role}
                                    <button onClick={() => handleRemoveRole(role)}>
                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>

                                    </button>

                                </span>
                            ))}
                        </div>

                        {isError && error?.authorization &&
                            (<Typography className='block sm:px-2' variant='caption' color='error'>{error?.authorization?.message}</Typography>)}
                        <Button onClick={submit} disabled={isLoading} className='bg-black hover:bg-gray-900' variant="contained">Add this Team</Button>
                        <Button onClick={cancel}>Cancel</Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

export default CreateTeamModal