import axios from "axios"
import { useMutation } from "react-query"
import useAuthContext from "./useAuthContext"
import { axiosBase } from ".";

const useStoreTask = ({onSuccess}) => {
    const { auth } = useAuthContext();

    const query = useMutation(async (taskData) => {
        try {
            const { data } = await axiosBase.post(`tasks/create`, taskData, {
                headers: {
                    "Authorization": `bearer ${auth.token}`
                }
            });
            onSuccess();
            return data;
        } catch (error) {
            throw error?.response?.data;
        }
    },
    
    )

    return query;
}
export default useStoreTask;