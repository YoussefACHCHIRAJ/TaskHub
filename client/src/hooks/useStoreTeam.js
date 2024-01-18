import axios from "axios";
import { useMutation } from "react-query";
import useAuthContext from "./useAuthContext";

const useStoreTeam = ({ onSuccess }) => {
    const { auth, dispatch } = useAuthContext();

    const query = useMutation(
        async (payload) => {
            try {
                const { data } = await axios.post(`http://localhost:3001/team/store/${auth?.user?._id}`, payload, {
                    headers: { "Authorization": `bearer ${auth?.token}` }
                });
                const newAuth = {
                    user: { ...auth?.user, team: data.team },
                    token: auth.token
                }
                dispatch({ type: "storeTeam", payload: newAuth });
                localStorage.removeItem('auth');
                localStorage.setItem('auth', JSON.stringify(newAuth));
                onSuccess();
            } catch (error) {
                console.log(Object.keys(error.response.data));
                throw error.response.data;
            }
        }
    );

    return query;
}


export default useStoreTeam;