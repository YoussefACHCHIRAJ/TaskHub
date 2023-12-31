import axios from "axios";
import { useMutation } from "react-query";
import useAuthContext from "./useAuthContext";

const useDeleteTask = ({ onSuccess }) => {
  const { auth } = useAuthContext()

  const query = useMutation(
    async (taskSelected) => {
      try {
        const { data } = await axios.delete(`http://localhost:3001/tasks/delete/${taskSelected}`, {
          headers: { 'authorization': `bearer ${auth.token}` }
        });
        onSuccess();
        return data;
      } catch (error) {
        throw error.response.data;
      }
    }
  );

  return query;
}

export default useDeleteTask;