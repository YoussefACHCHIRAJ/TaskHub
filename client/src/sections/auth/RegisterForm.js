import React from 'react'
import { useState } from 'react';

// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../components/iconify';
import { useRegister } from '../../hooks/useRegister';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, error, isLoading } = useRegister()


  const handleSubmit = async e => {
    e.preventDefault();
    const registerData = { name, email, password }
    const isRegistered = await register('http://localhost:3001/auth/register', registerData);
    if (isRegistered) {
      console.log('user is register');
    } else {
      console.log('user does not register');
      console.log(error);
    }
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="name"
          required
          label="Full name"
          error={error && error.name}
          helperText={error ? error.name : ''}
          onChange={e => setName(e.target.value)} />
        <TextField
          name="email"
          required
          label="Email"
          error={error && error.email}
          helperText={error ? error.email : ''}
          onChange={e => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          required
          error={error && error.password}
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
      </Stack>

      <LoadingButton className='bg-black mt-4' fullWidth size="large" type="submit" disabled={isLoading} variant="contained" onClick={handleSubmit}>
        Register
      </LoadingButton>
    </>
  );
}
