import { useEffect, useState } from "react";
import useAuthContext from "./useAuthContext";


export const useGetTasks = (endpoint) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [teamMembers, setTeamMembers] = useState(null);
    const { user } = useAuthContext()

    useEffect(() => {
        const getTasks = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(endpoint, {
                    headers: { 'authorization': `bearer ${user.token}` }
                })
                const result = await response.json();

                if (result.error) {
                    setIsLoading(false);
                    setError(result.error);
                }
                if (response.ok) {
                    setIsLoading(false);
                    setError(false);
                    setTasks(result.tasks);
                    setTeamMembers(result.teamMembers);

                }
            } catch (error) {
                setIsLoading(false);
                setError(error);
            }
        }
        getTasks();
    }, [endpoint, user.token])
    return { tasks, teamMembers, error, isLoading };
}

