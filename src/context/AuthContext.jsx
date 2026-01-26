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
                    const entraObjectId = account.idTokenClaims?.oid;

                    console.log("Syncing user...", email);
                    const dbUser = await syncUser(email, fullName, entraObjectId);
                    console.log("Sync result (DB User):", dbUser);

                    // Set user state with basic info + DB info (id, etc)
                    setUser({
                        ...account,
                        ...dbUser, // Merge DB user properties (like id)
                        syncStatus: 'synced'
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
