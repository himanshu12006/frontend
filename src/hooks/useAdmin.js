// src/hooks/useAdmin.js
// Custom hook that checks if the logged-in user is an admin
import { useAuth } from '../context/AuthContext';

export const useAdmin = () => {
  const { user, loading } = useAuth();
  const isAdmin = user?.role === 'admin';
  return { user, isAdmin, loading };
};
