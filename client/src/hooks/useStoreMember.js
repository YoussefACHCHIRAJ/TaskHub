import { useState } from 'react'
import useAuthContext from './useAuthContext';

const useStoreMember = endpoint => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();


    const storeMember = async memberData => {
        try {
            setIsLoading(true);
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${user.token}`
                },
                body: JSON.stringify(memberData)
            });
            const result = await response.json();

            if (!response.ok) {
                setError(result.error);
                return false;
            }

            setError(null);
            return true;
        } catch (error) {
            setError(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }
    return { error, isLoading, storeMember }
}

export default useStoreMember