import axios from "axios";
import { useMutation } from "react-query";
import useAuthContext from "./useAuthContext";
import { axiosBase } from ".";

const useDeleteTask = ({ onSuccess }) => {
  const { auth } = useAuthContext()

  const query = useMutation(
    async (taskSelected) => {
      try {
        const { data } = await axiosBase.delete(`tasks/delete/${taskSelected}`, {
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