// import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
// import useAuthContext from './useAuthContext';

const useGetDefaultInfo = (payload) => {


    const query = useQuery({
        queryKey: ['getDefaultInfo'],
        queryFn: async () => {
            try {
                const { data } = await axios(payload);
                console.log({data});
                return data;

            } catch (error) {
                throw new Error("Failed get the default info. ", error);
            }
        }
    });

    return query;

    // const [error, setError] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);
    // const [defaultInfo, setDefaultInfo] = useState({ memberNumber: 0, tasksNumber: 0, userTasksNumber: 0, tasks: [] });
    // const { auth } = useAuthContext();

    // useEffect(() => {
    //     const getDefaultInfo = async () => {
    //         try {
    //             setIsLoading(true);
    //             const response = await fetch(payload,{
    //                 headers: { 'authorization': `bearer ${auth.token}` },
    //             });

    //             const result = await response.json();

    //             if(result.error){
    //                 setIsLoading(false);
    //                 setError(result.error);
    //                 return;
    //             }
    //             setIsLoading(false);
    //             setError(null);
    //             setDefaultInfo(result);

    //         } catch (error) {
    //             setIsLoading(false);
    //             setError(error);
    //         }
    //     }
    //     getDefaultInfo();
    // }, [payload, auth.token]);

    // return { error,  isLoading, defaultInfo};
}

export default useGetDefaultInfo