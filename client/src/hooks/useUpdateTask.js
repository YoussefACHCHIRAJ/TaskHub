import axios from "axios";
import { useMutation } from "react-query";
import useAuthContext from "./useAuthContext";
import { axiosBase } from ".";

const useUpdateTask = ({ onSuccess }) => {
    const { auth } = useAuthContext()

    const query = useMutation(async ({taskId, updatedTask }) => {
        try {
            await axiosBase.put(`tasks/update/${taskId}`, updatedTask, {
                headers: {
                    "Authorization": `bearer ${auth.token}`
                }
            });
            onSuccess();
            return true;
        } catch (error) {
            throw error.response.data;
        }
    }
    );
    return query;
}


export default useUpdateTask;