import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";


export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();


    const register = async (endpoint, dataObject) => {
        setIsLoading(true);

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(dataObject)
            })
            const result = await response.json();

            if (!response.ok) {
                setError(result.error);
                return false;
            }

            localStorage.setItem('auth', JSON.stringify(result));
            setError(false);
            dispatch({ type: 'login', payload: result });
            navigate('/dashboard/app');
            return true;

        } catch (error) {
            setError(error);
            return false;
        }finally{
            setIsLoading(false);
        }

    }
    return { register, error, isLoading };
}

