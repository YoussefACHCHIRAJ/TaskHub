import { useQuery } from "react-query"
import axios from "axios";
import useAuthContext from "./useAuthContext";

const useGetTasks = () => {
    const { auth } = useAuthContext();

    const query = useQuery({
        queryKey: ["gettasks", auth?.user?._id],
        queryFn: async () => {
            try {
                const { data } = await axios.get(`http://localhost:3001/tasks/${auth?.user?._id}`, {
                    headers: { 'authorization': `bearer ${auth?.token}` }
                });
                return data;
            } catch (error) {
                throw new Error(`Failed load tasks. ${error?.response?.data?.authorization?.message}`);
            }
        }
    });

    return query;
}

export default useGetTasks;