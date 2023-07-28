// import React from 'react'
import useAuthContext from "../hooks/useAuthContext";

// ----------------------------------------------------------------------

const Account = () => {
  const { user } = useAuthContext();

  return {
    displayName: user.member.name,
    email: user.member.email,
    photoURL: '',
  };
}

export default Account


