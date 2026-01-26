import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useApi } from '../hooks/useApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const { instance, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const { syncUser } = useApi();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            if (isAuthenticated && accounts.length > 0) {
                setLoading(true);
                try {
                    const account = accounts[0];
                    const email = account.username; // email is usually username in Azure AD
                    const fullName = account.name;

                    console.log("Syncing user...", email);
                    const result = await syncUser(email, fullName);
                    console.log("Sync result:", result);

                    // Set user state with basic info + sync result status if needed
                    setUser({
                        ...account,
                        syncStatus: result
                    });
                } catch (err) {
                    console.error("Error syncing user:", err);
                    setError(err);
                } finally {
                    setLoading(false);
                }
            } else {
                setUser(null);
            }
        };

        checkUser();
    }, [isAuthenticated, accounts, syncUser]); // Dependencies for effect

    const login = () => {
        // MSAL handles login, this might not be needed or can check instance.loginRedirect
    };

    const logout = () => {
        instance.logoutRedirect();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
