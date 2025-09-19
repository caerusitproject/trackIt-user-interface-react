import axios from "axios";
import { domainurl } from "./domain.js";

// Create Axios instance
const api = axios.create({
  baseURL: domainurl,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
// Queue to hold requests while refreshing
let failedQueue = [];

// Process queued requests after token refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

// Add request interceptor to attach access token
api.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem("access-token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Check if error is 401 and request hasn't been retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request if refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh-token");
        // Make request to refresh token endpoint
        const response = await axios.post(`${domainurl}/gateway/auth/refresh`, {
          refreshToken,
        });
        console.log('axios instance__',response?.data)
        const { accessToken: newAccessToken } = response.data?.data;
        localStorage.setItem("access-token", newAccessToken);
        
        // Update authorization header for original request
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        
        // Process queued requests
        processQueue(null, newAccessToken);
        
        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., invalid refresh token)
        processQueue(refreshError);
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
        // Optionally redirect to login page
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;