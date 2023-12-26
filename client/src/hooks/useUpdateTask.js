import axios from "axios";
import { useMutation } from "react-query";
import useAuthContext from "./useAuthContext";

const useUpdateTask = ({ onSuccess }) => {
    const { auth } = useAuthContext()

    const query = useMutation(async ({taskId, updatedTask }) => {
        try {
            const response = await axios.put(`http://localhost:3001/tasks/update/${taskId}`, updatedTask, {
                headers: {
                    "Authorization": `bearer ${auth.token}`
                }
            });
            onSuccess();
            console.log({ response });
            return true;
        } catch (error) {
            console.log({ updateError: error.response.data });
            return error.response.data;
        }
    }
    );
    return query;
}


export default useUpdateTask;