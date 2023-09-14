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
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [team, setTeam] = useState(null);
  const { register, error, isLoading } = useRegister()


  const handleSubmit = async e => {
    e.preventDefault();
    console.log('sending register request', name, email, password, team);
    const registerData = { name, email, password, team }
    const isRegistered = await register('http://localhost:3001/auth/register', registerData);
    console.log("isRegistered", isRegistered);
    if(isRegistered){
      console.log('user is register');
    }else{
      console.log('user does not register');
      console.log(error);
    }
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField name="name" label="Full name" onChange={e => setName(e.target.value)} />
        <TextField name="email" label="Email" onChange={e => setEmail(e.target.value)} />

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
        <TextField name="team" label="Team name" onChange={e => setTeam(e.target.value)} />
      </Stack>

      <LoadingButton className='bg-black mt-4' fullWidth size="large" type="submit" disabled={isLoading} variant="contained" onClick={handleSubmit}>
        Register
      </LoadingButton>
    </>
  );
}
