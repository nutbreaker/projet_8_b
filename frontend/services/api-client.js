const API_BASE_URL = process.env.API_BASE_URL || '';

/**
 * @typedef {import("../types/property").Options} Options
 */

/**
 * Generic HTTP client to request the API.
 * 
 * @param {string | URL} endpoint
 * @param {Options} options
 */
export async function apiClient(endpoint, options) {
    try {
        const { token } = options;

        if (!API_BASE_URL) throw { error: 'Configuration API invalide' };

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...(options.headers || {})
        };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });

        return await response.json();
    } catch (error) {
        return error
    }
}