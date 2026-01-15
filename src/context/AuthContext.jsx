import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (email) => {
        // Mock login by extracting name from email or using a default
        const name = email.split('@')[0];
        const mockUser = {
            name: name.charAt(0).toUpperCase() + name.slice(1),
            email: email,
            avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
        };
        setUser(mockUser);
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

export const useAuth = () => useContext(AuthContext);
