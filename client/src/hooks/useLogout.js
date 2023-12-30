import useAuthContext from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = async () => {
        localStorage.removeItem('auth');

        dispatch({ type: 'logout' });
    }
    return { logout };
}

