import React from 'react'
import { Avatar, Box, Button, Container, Divider, Stack, Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import useAuthContext from '../hooks/useAuthContext'
import Iconify from '../components/iconify'

const ProfilePage = () => {
    const { user } = useAuthContext();
    return (
        <>
            <Helmet>
                <title>Profile | TaskHub </title>
            </Helmet>
            <Container>

                <Stack  direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h3" gutterBottom>
                        Your Profile
                    </Typography>
                    <Button className='bg-black hover:bg-gray-900' variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                        Update profile
                    </Button>
                </Stack>
                <Box sx={{ padding: '1em' }}>
                    <Avatar
                        sx={{ width: '8em', height: "8em", borderRadius: '10px', marginBottom: '1em' }}
                        src="/assets/images/avatars/avatar_default.jpg"
                        alignItems='center'
                        variant="square"
                        alt="user"
                    />

                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Typography variant='h5'>
                            Full Name:
                        </Typography>

                        <Typography variant='p'>
                            {user.member.name}
                        </Typography>
                    </Stack>
                    <Divider sx={{ marginBlock: '.5em', backgroundColor: 'black' }} />

                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Typography variant='h5'>
                            Contact:
                        </Typography>
                        <Typography variant='p'>
                            {user.member.email}
                        </Typography>
                    </Stack>
                    <Divider sx={{ marginBlock: '.5em', backgroundColor: 'black' }} />
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Typography variant='h5'>
                            Role:
                        </Typography>
                        <Typography variant='p'>
                            {user.member.post}
                        </Typography>
                    </Stack>
                    <Divider sx={{ marginBlock: '.5em', backgroundColor: 'black' }} />
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Typography variant='h5'>
                            Team:
                        </Typography>
                        <Typography variant='p'>
                            {user.member.team}
                        </Typography>
                    </Stack>
                    <Divider sx={{ marginBlock: '.5em', backgroundColor: 'black' }} />
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Typography variant='h5'>
                            Technologies:
                        </Typography>
                        <Typography variant='p'>
                            not add yet!!
                        </Typography>
                    </Stack>

                </Box>
            </Container>
        </>
    )
}
export default ProfilePage