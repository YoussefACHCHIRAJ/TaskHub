import React from 'react'
import { Avatar, Box, Container, Divider, Stack, Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'

const ProfilePage = () => (
    <>
        <Helmet>
            <title>Profile | Minimal UI </title>
        </Helmet>
        <Container>

            <Stack>
                <Typography variant="h3" gutterBottom>
                    Your Profile
                </Typography>
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
                        Youssef ACHCHIRAJ
                    </Typography>
                </Stack>
                <Divider sx={{ marginBlock: '.5em', backgroundColor: 'black' }} />

                <Stack direction='row' spacing={1} alignItems='center'>
                    <Typography variant='h5'>
                        Contact:
                    </Typography>
                    <Typography variant='p'>
                        youssefachchiraj@email.com
                    </Typography>
                </Stack>
                <Divider sx={{ marginBlock: '.5em', backgroundColor: 'black' }} />
                <Stack direction='row' spacing={1} alignItems='center'>
                    <Typography variant='h5'>
                        Role:
                    </Typography>
                    <Typography variant='p'>
                        Backend
                    </Typography>
                </Stack>
                <Divider sx={{ marginBlock: '.5em', backgroundColor: 'black' }} />
                <Stack direction='row' spacing={1} alignItems='center'>
                    <Typography variant='h5'>
                        Team:
                    </Typography>
                    <Typography variant='p'>
                        Full stack
                    </Typography>
                </Stack>
                <Divider sx={{ marginBlock: '.5em', backgroundColor: 'black' }} />
                <Stack direction='row' spacing={1} alignItems='center'>
                    <Typography variant='h5'>
                        Technologies:
                    </Typography>
                    <Typography variant='p'>
                        Nodejs - React - Expressjs - MongoDB - TailwindCSS
                    </Typography>
                </Stack>

            </Box>
        </Container>
    </>
)

export default ProfilePage