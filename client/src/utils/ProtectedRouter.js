/* eslint-disable react/prop-types */
import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

export function ProtectLoginPage({ loginPage }) {
    const { auth } = useAuthContext()
    return !auth ? loginPage : <Navigate to='/dashboard/app' />
}

function ProtectedRouter({ element }) {
    const { auth } = useAuthContext();
    return auth ? element : <Navigate to='/login' />
}

export default ProtectedRouter;