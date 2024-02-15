import React, { useState } from 'react'

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../components/iconify';
import { useLogin } from '../../hooks';
import ForgetPasswordModel from '../../components/models/forget-password-model';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [open, setOpen] = useState(false);
  const { mutate:login , error, isLoading } = useLogin();


  const handleSubmit = async e => {
    e.preventDefault();
    login({ email, password });
    console.log({front:error, isLoading});

  }

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          required
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" className=' cursor-pointer' onClick={() => {setOpen(true)}}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton className='bg-black mt-4' fullWidth size="large" type="submit" variant="contained" disabled={isLoading} onClick={handleSubmit}>
        Login
      </LoadingButton>

      <ForgetPasswordModel open={open} setOpen={setOpen} />
    </>
  );
}
