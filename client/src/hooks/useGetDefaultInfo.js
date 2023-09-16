import { useEffect, useState } from 'react'
import useAuthContext from './useAuthContext';

const useGetDefaultInfo = (endpoint) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [defaultInfo, setDefaultInfo] = useState({ memberNumber: 0, tasksNumber: 0, userTasksNumber: 0, tasks: [] });
    const { user } = useAuthContext();
    const {name } = user.member

    useEffect(() => {
        const getDefaultInfo = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(endpoint,{
                    headers: { 'authorization': `bearer ${user.token}` },
                });

                const result = await response.json();

                if(result.error){
                    setIsLoading(false);
                    setError(result.error);
                    return;
                }
                setIsLoading(false);
                setError(null);
                setDefaultInfo(result);

            } catch (error) {
                setIsLoading(false);
                setError(error);
            }
        }
        getDefaultInfo();
    }, [endpoint, user.token, name]);

    return { error,  isLoading, defaultInfo};
}

export default useGetDefaultInfo