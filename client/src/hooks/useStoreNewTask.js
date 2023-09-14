import { useEffect, useState } from "react";
import useAuthContext from "./useAuthContext";


export const useStoreNewTask = (endpoint) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => { }, [error]);

    const storeNewTask = async taskData => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    'authorization': `bearer ${user.token}`
                },
                body: JSON.stringify(taskData)
            });

            const result = await response.json();
            if (!response.ok) {
                setError(result.error);
                return false;
            }
            setError(null);
            return true;
        } catch (error) {
            console.log('catch hook: ', error);
            setError(error);
            return false;
        }finally {
            setIsLoading(false);
        }
    }

    return {  error, isLoading, storeNewTask }
}
