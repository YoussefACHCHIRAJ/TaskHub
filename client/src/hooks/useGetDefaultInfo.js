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
}

export default useGetDefaultInfo