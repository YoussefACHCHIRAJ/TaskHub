import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";


 const useRegister = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const query = useMutation(
        async (payload) => {
            try {
                const { data } = await axios.post('http://localhost:3001/auth/register', payload);
                localStorage.setItem('auth', JSON.stringify(data));
                dispatch({ type: 'login', payload: data });
                navigate('/dashboard/app');
            } catch (error) {
                throw error.response.data.error
            }
        }
    )

    return query;
}

export default useRegister;