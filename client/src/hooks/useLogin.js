import { useState } from "react";
import useAuthContext from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext()

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

            if (!response.ok) {
                setIsLoading(false);
                setError(result.error);
            }
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(result));
                dispatch({type:'login', payload:result});
            }
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    }
    return {login, error, isLoading};
}

