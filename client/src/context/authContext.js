import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {

    switch (action.type) {
        case 'login':
            return { auth: action.payload };
        case 'logout':
            return { auth: null };
        case 'storeTeam':
            return { auth: action.payload };
        default:
            return state;
    }
}

export const AuthContextProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, {
        auth: JSON.parse(localStorage.getItem('auth')) || null
    });

    console.log('authContext state: ', state);

    return (

        <AuthContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}
