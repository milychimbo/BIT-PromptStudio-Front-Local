import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import * as apiService from '../services/api';

/**
 * Custom hook to access API services with automatic token injection.
 * Handles silent token acquisition and falls back to interaction if needed.
 */
export const useApi = () => {
    const { instance, accounts } = useMsal();

    const acquireToken = async () => {
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
    };

    const fixPrompt = async (prompt) => {
        try {
            const token = await acquireToken();
            return await apiService.fixPrompt(prompt, token);
        } catch (error) {
            console.error("API call failed:", error);
            throw error;
        }
    };

    return {
        fixPrompt
    };
};
