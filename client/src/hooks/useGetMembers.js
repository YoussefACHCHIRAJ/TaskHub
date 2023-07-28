import { useEffect, useState } from 'react'
import useAuthContext from './useAuthContext';

const useGetMembers = (endpoint) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [members, setMembers] = useState(null);
    const { user } = useAuthContext()

    useEffect(() => {
        const getMembers = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(endpoint,{
                    headers: { 'authorization': `bearer ${user.token}` }
                });

                const result = await response.json();

                if(result.error){
                    setIsLoading(false);
                    setError(result.error);
                    return;
                }
                setIsLoading(false);
                setError(null);
                setMembers(result);

            } catch (error) {
                setIsLoading(false);
                setError(error);
            }
        }
        getMembers();
    }, [endpoint, user.token]);

    return { getMembersError: error, getMembersIsLoading: isLoading, members};
}

export default useGetMembers