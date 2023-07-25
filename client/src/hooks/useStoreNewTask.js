import { useEffect, useState } from "react";
import useAuthContext from "./useAuthContext";


export const useStoreNewTask = (endpoint, taskData) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => { }, [error]);

    const storeNewTask = async () => {
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
                setIsLoading(false);
                setError(result.error);
                return false;
            }
            setIsLoading(false);
            setError(null);
            return true;
        } catch (error) {
            console.log('catch hook: ', error);
            setIsLoading(false);
            setError(error);
            return false;
        }
    }

    return { errors: error, isLoading, storeNewTask }
}
