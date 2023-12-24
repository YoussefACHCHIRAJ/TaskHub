import { useQuery } from "react-query"
import axios from "axios";
import useAuthContext from "./useAuthContext";

const useGetTasks = () => {
    const { auth } = useAuthContext();

    const query = useQuery({
        queryKey: ["gettasks"],
        queryFn: async () => {
            try {
                console.log("send get tasks request.");
                const { data } = await axios.get(`http://localhost:3001/tasks/${auth.user._id}`, {
                    headers: { 'authorization': `bearer ${auth.token}` }
                });
                console.log({ data })
                return data;
            } catch (error) {
                throw new Error(`Failed load members. ${error}`);
            }
        }
    });

    return query;
}

export default useGetTasks;