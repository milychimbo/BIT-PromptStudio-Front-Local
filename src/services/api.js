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

        const response = await fetch(`${API_BASE_URL}/api/agent/fix-prompt`, {
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

/**
 * Save a prompt to the backend
 * @param {Object} promptData - The prompt data to save
 * @param {string} token - The access token
 * @returns {Promise<Object>} - The saved prompt data
 */
export const savePrompt = async (promptData, token = null) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/api/prompts`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(promptData),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error saving prompt:', error);
        throw error;
    }
};

/**
 * Get user by email
 * @param {string} email - The user's email
 * @param {string} token - The access token
 * @returns {Promise<Object>} - The user object or null if not found
 */
export const getUserByEmail = async (email, token = null) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/api/users/${email}`, {
            method: 'GET',
            headers: headers,
        });

        if (response.status === 404) {
            return null;
        }

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data; // Returns the user object
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
};

/**
 * Register a new user
 * @param {Object} userData - The user data { email, fullName }
 * @param {string} token - The access token
 * @returns {Promise<Object>} - The created user data
 */
export const registerUser = async (userData, token = null) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/api/users`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        // Check content type to decide how to parse response
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }
        return await response.text();
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};
