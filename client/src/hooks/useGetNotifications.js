import { useQuery } from "react-query";
import axios from "axios";
import useAuthContext from "./useAuthContext";
import { axiosBase } from ".";


const useGetNotifications = () => {
    const { auth } = useAuthContext();

    const query = useQuery({
        queryKey: ["get notifications", auth?.user?._id],
        queryFn: async () => {
            try {
                const { data } = await axiosBase.get(`notifications/${auth?.user?._id}`, {
                    headers: { 'authorization': `bearer ${auth?.token}` }
                });
                console.log("hook: ", data?.notifications);
                return data?.notifications
            } catch (error) {
                console.log({notfError: error});
                throw new Error(`Failed load notifications. ${error?.response?.data?.authorization?.message}`);
            }

        }
    });
    return query;
}

export default useGetNotifications;