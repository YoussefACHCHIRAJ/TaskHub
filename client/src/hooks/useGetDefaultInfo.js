// import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
import useAuthContext from './useAuthContext';
import { axiosBase } from '.';
// import useAuthContext from './useAuthContext';

const useGetDefaultInfo = (payload) => {
    const { auth } = useAuthContext();

    const query = useQuery({
        queryKey: ['getDefaultInfo'],
        queryFn: async () => {
            try {
                const { data } = await axiosBase.get(`defaultInfo/${auth.user._id}`);
                return data;

            } catch (error) {
                throw new Error(`Failed load default info. ${error?.response?.data?.authorization?.message}`);
            }
        }
    });

    return query;
}

export default useGetDefaultInfo