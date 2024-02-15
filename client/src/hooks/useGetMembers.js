import { useQuery } from "react-query"
import axios from "axios";
import useAuthContext from "./useAuthContext";

const useGetMembers = () => {
    const { auth } = useAuthContext();

    const query = useQuery({
        queryKey: ["getMembers", auth?.user?._id],
        queryFn: async () => {
            try {
                const { data } = await axios.get(`http://localhost:3001/member/${auth?.user?._id}`, {
                    headers: { 'authorization': `bearer ${auth?.token}` }
                });
                return data;
            } catch (error) {
                throw new Error(`Failed load members. ${error?.response?.data?.authorization?.message}`);
            }
        }
    });

    return query;

}

export default useGetMembers