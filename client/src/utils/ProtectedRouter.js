import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

export const ProtectLoginPage = ({ loginPage }) => {
    const { user } = useAuthContext()
    return !user ? loginPage : <Navigate to='/dashboard/app' />
}

const ProtectedRouter = ({ element }) => {
    const { user } = useAuthContext();
    return user ? element : <Navigate to='/login' />
}

export default ProtectedRouter;