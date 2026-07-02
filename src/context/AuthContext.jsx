import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axiosInstance';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check login status on page refresh/initial load
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const { data } = await API.get('/auth/profile');
        if (data && data.success) {
          setUser(data.data);
        }
      } catch (err) {
        // User is not logged in, clear storage
        localStorage.removeItem('om_user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const { data } = await API.post('/auth/login', { email, password });
      if (data && data.success) {
        setUser(data.data);
        // Save the details/token for state restoration and fallback headers
        localStorage.setItem('om_user', JSON.stringify(data.data));
        return data.data;
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errMsg);
      throw new Error(errMsg);
    }
  };

  const register = async (name, email, password) => {
    setError(null);
    try {
      const { data } = await API.post('/auth/register', { name, email, password });
      if (data && data.success) {
        setUser(data.data);
        localStorage.setItem('om_user', JSON.stringify(data.data));
        return data.data;
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errMsg);
      throw new Error(errMsg);
    }
  };

  const forgotPassword = async (email) => {
    setError(null);
    try {
      // Simulate/call reset password endpoint if backend expands it, or mock resolved for now
      return new Promise((resolve) => setTimeout(resolve, 800));
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to send password reset request.';
      setError(errMsg);
      throw new Error(errMsg);
    }
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (err) {
      console.error('Failed to logout on backend', err);
    } finally {
      setUser(null);
      localStorage.removeItem('om_user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, loading, login, register, forgotPassword, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

