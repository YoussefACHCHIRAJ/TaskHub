import React, { useState } from 'react'
import { useQueryClient } from 'react-query';

import {
    Typography, MenuItem,
    InputLabel,
    Select,
    FormControl,
    TextField,
    Modal,
    Box,
    InputAdornment,
    IconButton,
    Stack,
    Button,
} from '@mui/material'
import Iconify from '../iconify';

import { useStoreMember, useAuthContext } from '../../hooks';

function AddMemberModel({
    openModal,
    setOpenModal,
    setOpenSnackbar,
    setSnackbarMsg,
    roles
}) {

    const { auth } = useAuthContext();

    const queryClient = useQueryClient();

    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [role, setRole] = useState('');

    const { isError, error, isLoading, mutate: storeMember, reset } = useStoreMember({
        onSuccess: () => {
            setOpenModal(false);
            setOpenSnackbar(true);
            setSnackbarMsg('This member was add.');
            queryClient.invalidateQueries(["getMembers", auth?.user?._id])
            setTimeout(() => {
                setOpenSnackbar(false);
            }, 2000);
        }
    })
    const cancel = () => {
        setName('');
        setEmail('');
        setPassword('');
        setRole('');
        setOpenModal(false);
        reset();
    }
    const submitStoreMember = event => {
        event.preventDefault();
        storeMember({ name, email, password: password.trim(), role });
    }
    return (
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
                            error={isError && error.name}
                            helperText={isError ? error.name : ''}
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
                            error={isError && error.email}
                            helperText={isError && error.email || ''}
                            FormHelperTextProps={{
                                style: {
                                    color: '#f44336',
                                },
                            }}
                        />
                        <TextField
                            name="password"
                            label="Password"
                            required
                            error={isError ? error.password : false}
                            helperText={isError ? error.password : ''}
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
                                error={isError ? error.role : false}
                                helperText={isError ? error.role : ''}
                                value={role}
                            >
                                {roles?.map(role => (
                                    <MenuItem value={role} key={role}>{role}</MenuItem>
                                ))}
                            </Select>
                            {isError && error.role && (<Typography className='block sm:px-4' variant='caption' color='error'>{error.role}</Typography>)}

                        </FormControl>
                        {isError && error?.authorization &&
                            (<Typography className='block sm:px-2' variant='caption' color='error'>{error?.authorization?.message}</Typography>)}
                        <Button className='bg-black hover:bg-gray-900' onClick={submitStoreMember} variant="contained" disabled={isLoading}>Add this Member</Button>
                        <Button onClick={cancel}>Cancel</Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddMemberModel