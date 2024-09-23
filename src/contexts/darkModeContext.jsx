import { createContext, useState, useEffect, useContext } from "react";

export const darkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode !== null ? JSON.parse(savedMode) : false;
    });

    const toggleDarkMode = () => setDarkMode(prevMode => !prevMode);

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <darkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </darkModeContext.Provider>
    );
};

export function useDarkMode() {
    return useContext(darkModeContext);
}


