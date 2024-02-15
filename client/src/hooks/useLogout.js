import useAuthContext from "./useAuthContext";

const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = async () => {
        localStorage.removeItem('auth');

        dispatch({ type: 'logout' });
    }
    return logout;
}

export default useLogout;
