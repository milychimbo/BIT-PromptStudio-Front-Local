// API Base URL - Update this with your actual backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Call the fix-prompt API endpoint
 * @param {string} prompt - The prompt text to analyze
 * @returns {Promise<Object>} - The API response with analysis data
 */
export const fixPrompt = async (prompt, token = null) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/api/Agent/fix-prompt`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error calling fix-prompt API:', error);
        throw error;
    }
};
