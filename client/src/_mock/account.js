// import React from 'react'
import useAuthContext from "../hooks/useAuthContext";

// ----------------------------------------------------------------------

const Account = () => {
  const { auth } = useAuthContext();

  return {
    displayName: auth.user.name,
    email: auth.user.email,
    photoURL: '',
  };
}

export default Account


