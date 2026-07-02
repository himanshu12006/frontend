// src/layouts/AdminLayout.jsx
// Wraps all admin pages with sidebar + header shell
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/Admin/AdminSidebar';
import AdminHeader from '../components/Admin/AdminHeader';
import ToastContainer from '../components/Admin/ToastContainer';
import { useToast } from '../hooks/useToast';
import { ToastContext } from '../context/ToastContext';

export default function AdminLayout() {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div className="flex h-screen bg-[#0a0f1a] overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main content area */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Global toast notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}
