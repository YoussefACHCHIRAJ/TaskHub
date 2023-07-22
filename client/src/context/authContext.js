import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {

    switch (action.type) {
        case 'login':
            return { user: action.payload };
        case 'logout':
            return { user: null };
        default:
            return state;
    }
}

export const AuthContextProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || null;
        
        if (user) {
            dispatch({ type: 'login', payload: user });
        }
    }, [])

    console.log('authContext state: ', state)

    return (

        <AuthContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}
