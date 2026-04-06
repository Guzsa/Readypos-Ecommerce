import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Simulación de login (Luego podés conectarlo a Firebase Auth)
    const login = (userData) => {
        setUser(userData); // userData tendría { name: "Santiago", email: "..." }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};