import { useCallback } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import * as apiService from '../services/api';

/**
 * Custom hook to access API services with automatic token injection.
 * Handles silent token acquisition and falls back to interaction if needed.
 */
export const useApi = () => {
    const { instance, accounts } = useMsal();

    const acquireToken = useCallback(async () => {
        const account = accounts[0];
        if (!account) {
            throw new Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
        }

        const request = {
            ...loginRequest,
            account: account,
        };

        try {
            const response = await instance.acquireTokenSilent(request);
            return response.accessToken;
        } catch (error) {
            console.warn("Silent token acquisition failed, attempting interaction...", error);
            // In a real app you might want to trigger a popup or redirect here,
            // or just let the caller handle the error.
            // For now we'll rethrow so the component knows auth failed.
            throw error;
        }
    }, [instance, accounts]);

    const fixPrompt = useCallback(async (prompt) => {
        try {
            const token = await acquireToken();
            return await apiService.fixPrompt(prompt, token);
        } catch (error) {
            console.error("API call failed:", error);
            throw error;
        }
    }, [acquireToken]);

    /**
     * Sync user with backend: Check if exists, if not register.
     * @param {string} email 
     * @param {string} fullName 
     * @returns {Promise<string>} Status message
     */
    const syncUser = useCallback(async (email, fullName, entraObjectId) => {
        try {
            const token = await acquireToken();

            // 1. Check if user exists
            const existingUser = await apiService.getUserByEmail(email, token);

            if (existingUser) {
                return existingUser;
            }

            // 2. If not, register user
            const newUser = await apiService.registerUser({ email, fullName, entraObjectId }, token);
            return newUser;

        } catch (error) {
            console.error("Sync user failed:", error);
            throw error;
        }
    }, [acquireToken]);

    return {
        fixPrompt,
        syncUser
    };
};
