import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";


export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();


    const login = async (endpoint, dataObject) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(dataObject)
            })
            const result = await response.json();

            if (result.error) {
                setError(result.error);
                setIsLoading(false);
                return false;
            }

            localStorage.setItem('auth', JSON.stringify(result));
            setError(false);
            dispatch({ type: 'login', payload: result });
            setIsLoading(false);
            navigate('/dashboard/app');
            return true;

        } catch (error) {
            setError(error);
            setIsLoading(false);
            return false;
        }
    }
    return { login, error, isLoading };
}

