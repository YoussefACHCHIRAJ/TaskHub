import React, { useEffect, useState } from 'react'
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

const UpdateMemberModel = ({
    openModal,
    setOpenModal,
    memberSelected,
    members,
    setOpenSnackbar,
    setSnackbarMsg
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Frontend');
    const error = null;

    useEffect(() => {
        if (memberSelected) {
            console.log('member to delete', memberSelected);
            console.log('member first', members[0]);
            console.table('members table', members.find(member => member.id === memberSelected));

            const memberToUpdate = members.find(member => member.id === memberSelected);
            const { name, email, role } = memberToUpdate;
            setName(name);
            setEmail(email);
            setRole(role);
        }
    }, [memberSelected, members]);

    const cancel = () => {
        setName('');
        setEmail('');
        setPassword('');
        setRole('Fronend');
        setOpenModal(false)
    }

    const submitStoreMember = async e => {
        e.preventDefault();
        setOpenSnackbar(true);
        setSnackbarMsg('This member was updated.');
        setOpenModal(false);
    }
    return (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { sx: '80%', sm: '65%' }, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '10px' }}>
                <Typography variant='h4' gutterBottom >Add New Member</Typography>
                <Box component='form'>
                    <Stack spacing={2}>
                        <TextField
                            onChange={e => setName(e.target.value)}
                            value={name}
                            id="outlined-basic"
                            label="Full name"
                            variant="outlined"
                            fullWidth
                            required
                            error={error && error.name}
                            helperText={error ? error.name : ''}
                            FormHelperTextProps={{
                                style: {
                                    color: '#f44336',
                                },
                            }}
                        />
                        <TextField
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            id="outlined-multiline-flexible"
                            label="Email"
                            name='email'
                            type='email'
                            maxRows={4}
                            multiline
                            fullWidth
                            required
                            error={error && error.email}
                            helperText={error && error.email || ''}
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
                            error={error ? error.password : false}
                            helperText={error ? error.password : ''}
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

                        <Button className='bg-black hover:bg-gray-900' onClick={submitStoreMember} variant="contained">Add this Member</Button>
                        <Button onClick={cancel}>Cancel</Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

export default UpdateMemberModel