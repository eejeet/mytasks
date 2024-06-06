import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    // here use can use environment variable for base URL, right now I am using current URL as base URL becuse of inertiajs
    baseURL: window.apiUrl || 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the Bearer token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to format responses
api.interceptors.response.use(
    (response) => {
        // Format response data
        return {
            data: response.data.data || response.data,
            message: response.data.message || 'Operation successful',
            status: true,
            code: response.status,
        };
    },
    (error) => {
        // Handle errors
        const { response } = error;
        const formattedError = {
            data: response?.data?.data || null,
            message: response?.data?.message || 'Operation failed',
            status: false,
            code: response?.status || 500,
        };
        return Promise.reject(formattedError);
    }
);

export default api;
