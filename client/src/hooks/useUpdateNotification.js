import { useMutation } from "react-query"
import axios from "axios";
import useAuthContext from "./useAuthContext"
import { axiosBase } from ".";

const useUpdateNotification = () => {
    const { auth } = useAuthContext();

    const query = useMutation(async () => {
        try {
            await axiosBase.post(`notifications/${auth?.user?._id}`, null, {
                headers: { 'authorization': `bearer ${auth?.token}` }
            });
        } catch (error) {
            throw new Error(`Failed to update notifications. ${error?.response?.data?.authorization?.message}`);
        }
    });
    return query
}

export default useUpdateNotification;