import axios from "axios"
import { useMutation } from "react-query"
import useAuthContext from "./useAuthContext"

const useStoreMember = ({ onSuccess }) => {
    const { auth } = useAuthContext();

    const query = useMutation(async (memberData) => {
        try {
            await axios.post(`http://localhost:3001/member/create/${auth.user._id}`, memberData, {
                headers: {
                    "Authorization": `bearer ${auth.token}`
                }
            });
            onSuccess()
            return true;
        } catch (error) {
            console.log({ error: Object.keys(error.response) });
            console.log({
                message: error,
                code: error.code,
            })
            throw error.response.data;
        }
    },
    
    )

    return query;

}

export default useStoreMember