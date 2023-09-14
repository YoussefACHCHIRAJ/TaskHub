import { useState } from 'react'
import useAuthContext from './useAuthContext';

const useStoreMember = endpoint => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const{user} = useAuthContext();


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

            if(result.error){
                setError(result.error);
                setIsLoading(false);
                console.log(error);
                return false;
            }

            setError(null);
            setIsLoading(false);
            return true;
        } catch (error) {
            setError(error);
            setIsLoading(false);
            return false;
        }
    }
    return {error, isLoading, storeMember}
}

export default useStoreMember