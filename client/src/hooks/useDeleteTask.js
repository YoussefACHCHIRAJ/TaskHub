import { useState } from 'react'
import useAuthContext from './useAuthContext';

export const useDeleteTask = (endpoint) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    const {user} = useAuthContext();

  const deleteTask = async () => {
    try {
        setIsLoading(true);

        const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {'authorization': `bearer ${user.token}`},
        });
        const result = await response.json();

        if(result.error){
            setIsLoading(false);
            setError(result.error);
            return false;
        }
        setIsLoading(false);
        return true;
    } catch (error) {
        setIsLoading(false);
        setError(error);
        return false;
    }
  }
  return {deleteError: error, deleteIsLoading: isLoading, deleteTask};
}

