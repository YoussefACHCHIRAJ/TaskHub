import { useState } from 'react';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../../components/iconify';
import { useLogin } from '../../../hooks/useLogin';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { login, error, isLoading } = useLogin();


  const handleSubmit = async e => {
    e.preventDefault();
    const isLoged = await login('http://localhost:8080/auth/login', { email, password });
   
    if(isLoged) console.log('loged');
   
    else {
      console.log('does not loged');
      console.log(error)
    }

  }

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={e => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
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
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={isLoading} onClick={handleSubmit}>
        Login
      </LoadingButton>
      {error && (<div>{error}</div>)}
    </>
  );
}
