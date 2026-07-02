// src/api/axiosInstance.js
// PURPOSE: Configured Axios instance to communicate with the Node.js backend.
// It uses credentials (cookies) and dynamically handles authorization headers if needed.

import axios from 'axios';

const API = axios.create({
  baseURL: 'https://backend-0cpd.onrender.com', // backend base URL
  withCredentials: true,                // sends/receives HttpOnly cookies containing JWT
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach Bearer token if cookies are not used or as fallback
API.interceptors.request.use(
  (config) => {
    // If the token is stored in localStorage, attach it to headers
    const savedUser = localStorage.getItem('om_user');
    if (savedUser) {
      try {
        const userObj = JSON.parse(savedUser);
        if (userObj && userObj.token) {
          config.headers.Authorization = `Bearer ${userObj.token}`;
        }
      } catch (e) {
        console.error("Failed to parse user details for Auth header", e);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally (like unauthorized token expiration)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error is 401 (Not Authorized)
    if (error.response && error.response.status === 401) {
      console.warn("Session expired or unauthorized request. Logging out user...");
      localStorage.removeItem('om_user');
      // Optional: redirect to login page
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
