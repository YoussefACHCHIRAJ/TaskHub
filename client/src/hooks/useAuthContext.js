import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if(!context) throw new Error("can not use Context");

  return context;
}

export default useAuthContext