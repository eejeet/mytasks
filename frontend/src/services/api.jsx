import axios from "axios";
import { axiosErrorAlert } from "./helpers";

// Create a new instance of Axios with default configurations
const api = axios.create({
  baseURL: "http://mytasks.test/api", // Replace with your base URL
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers here
  },
});

// Add an interceptor to include the token in every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Check if token is available in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add an interceptor to handle API response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    axiosErrorAlert(error);

    return Promise.reject(error);
  }
);

export default api;
