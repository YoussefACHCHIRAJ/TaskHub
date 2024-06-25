import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";
import { axiosBase } from ".";


 const useLogin = () => {

    const { dispatch } = useAuthContext()
    const navigate = useNavigate();

    const query = useMutation(
        async (payload) => {
            try {
            
                const { data } = await axiosBase.post(`auth/login`, payload);
            
                localStorage.setItem('auth', JSON.stringify(data));
            
                dispatch({ type: 'login', payload: data });
            
                navigate('/dashboard/app');
            
                return true;
            } catch (error) {
                throw error.response.data.error
            }

        }
    )
    return query
}

export default useLogin;