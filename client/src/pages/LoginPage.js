import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// components
import Logo from '../components/logo';
// sections
import { LoginForm } from '../sections/auth';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));


const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {


  return (
    <>
      <Helmet>
        <title> Login | TaskHub </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        

        <Container maxWidth="sm">
          <StyledContent>
          <Typography variant="h3" sx={{mt: 2, mb: 2 }}>
              Hi, Welcome Back
            </Typography>
            <Typography variant="h4" gutterBottom>
              Sign in to TaskHub
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don't have an account? {''}
                <Link to='/register' className='text-blue-600 font-semibold'>Get started</Link>
            </Typography>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
