import { useMutation } from "react-query";
import axios from "axios";
import useAuthContext from "./useAuthContext";


const useDeleteMember = ({ onSuccess }) => {

    const { auth } = useAuthContext();

    const query = useMutation(
        async memberId => {
            try {
                const { data } = await axios.delete(`http://localhost:3001/member/delete/${memberId}`, {
                    headers: { 'authorization': `bearer ${auth.token}` }
                  });
                onSuccess();
                // return true;
            } catch (error) {
                console.log({errorMessage: error.response.data});
                // return false;
            }       
        }
    );

    return query;
}


export default useDeleteMember;