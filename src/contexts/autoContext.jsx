import { createContext, useContext, useState, useEffect } from "react";
import usersService from "../services/usersService";

const fn_error_context_must_be_used = () => {
    throw new Error("must use authContext provider for consumer to work");
};

export const authContext = createContext({
    user: null,
    login: fn_error_context_must_be_used,
    logout: fn_error_context_must_be_used,
    signUp: fn_error_context_must_be_used,
    editUser: fn_error_context_must_be_used,
});
authContext.displayName = "auth";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
    const loadUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const userData = await usersService.getUserById(token);
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user', error);
            }
        }
    };

    loadUser();
}, []);

    const login = async (credentials) => {
    const response = await usersService.login(credentials);
    const userData = await usersService.getUserById();
    setUser(userData);
    return response;
    };

    const logout = () => {
    usersService.logout();
    setUser(null);
    };

    const editUser = async (id, data) =>{
        const response = await usersService.updateUser(id,data);
        setUser(response.data);
        return response;
    }

    return (
    <authContext.Provider value={{user, login, logout, signUp: usersService.createUser, editUser}}>
        {children}
    </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}
