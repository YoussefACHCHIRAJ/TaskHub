import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

const ProtectedRouter = ({ element }) => {
    const { user } = useAuthContext()
    console.log('protected: ', user);
    return user ? element : <Navigate to='/login' />
}

export default ProtectedRouter