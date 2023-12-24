import React, { useState } from 'react'
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
import useAuthContext from '../../hooks/useAuthContext';
import useStoreMember from '../../hooks/useStoreMember';
import Iconify from '../iconify';

const AddMemberModel = ({
    openModal,
    setOpenModal,
    setOpenSnackbar,
    setSnackbarMsg,
    refetchMembers
}) => {
    const { auth } = useAuthContext();
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Frontend');
    const { isError, error, isLoading, mutate: storeMember, reset } = useStoreMember(`http://localhost:3001/member/create/${auth.user.team}`, {
        onSuccess: () => {
            setOpenModal(false);
            setOpenSnackbar(true);
            setSnackbarMsg('This member was add.');
            refetchMembers();
            setTimeout(() => {
                setOpenSnackbar(false);
            }, 2000);
        }
    })
    const cancel = () => {
        setName('');
        setEmail('');
        setPassword('');
        setRole('Frontend');
        setOpenModal(false);
        reset();
    }
    const submitStoreMember = e => {
        e.preventDefault();
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
                                value={role}
                            >
                                <MenuItem value='Frontend'>Front end</MenuItem>
                                <MenuItem value='Backend'>Back end</MenuItem>
                                <MenuItem value='Designer'>Designer</MenuItem>
                                <MenuItem value='Devops'>Devops</MenuItem>
                            </Select>
                        </FormControl>

                        <Button className='bg-black hover:bg-gray-900' onClick={submitStoreMember} variant="contained" disabled={isLoading}>Add this Member</Button>
                        <Button onClick={cancel}>Cancel</Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddMemberModel