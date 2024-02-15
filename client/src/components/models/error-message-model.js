import React from 'react'

import { Alert, AlertTitle, Typography } from '@mui/material'

import { useLogout } from '../../hooks';


const ErrorMessageModel = ({ message }) => {
  const logout = useLogout();
  return (
    <Typography variant='h6' color='error' sx={{ paddingInline: '3em' }}>
      <Alert severity="error">
        <AlertTitle>error</AlertTitle>
        {message}<br />
        This could be due a server issue or you're token has been expired.<br />
        Check if you are connecting to the server or internet or try login again.<br />
        <button className=" bg-blue-700 text-white rounded-2xl py-1 px-3 mt-3 " onClick={logout}>Log out</button>
      </Alert>
    </Typography>
  )
}

export default ErrorMessageModel