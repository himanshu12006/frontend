// src/context/ToastContext.js
import { createContext, useContext } from 'react';
export const ToastContext = createContext({ addToast: () => {} });
export const useAdminToast = () => useContext(ToastContext);
