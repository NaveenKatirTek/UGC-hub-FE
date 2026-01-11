import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // Handle different error scenarios
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    // Unauthorized - clear token and redirect to login
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    window.location.href = '/sign-in';
                    break;
                case 403:
                    // Forbidden
                    console.error('Access forbidden:', data.message);
                    break;
                case 404:
                    // Not found
                    console.error('Resource not found:', data.message);
                    break;
                case 422:
                    // Validation error
                    console.error('Validation error:', data.errors);
                    break;
                case 500:
                    // Server error
                    console.error('Server error:', data.message);
                    break;
                default:
                    console.error('API error:', data.message);
            }

            return Promise.reject(data);
        } else if (error.request) {
            // Request made but no response received
            console.error('Network error: No response from server');
            return Promise.reject({
                message: 'Network error. Please check your connection.',
                code: 'NETWORK_ERROR',
            });
        } else {
            // Something else happened
            console.error('Request error:', error.message);
            return Promise.reject({
                message: 'An unexpected error occurred.',
                code: 'UNKNOWN_ERROR',
            });
        }
    }
);

// Token management utilities
export const setAuthToken = (token) => {
    localStorage.setItem('authToken', token);
};

export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const removeAuthToken = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
};

export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export default apiClient;
