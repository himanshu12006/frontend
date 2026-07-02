// src/components/Admin/AdminSidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, PlusSquare, ShoppingCart,
  Users, LogOut, ChevronLeft, ChevronRight, Store, ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'Dashboard',    icon: LayoutDashboard, path: '/admin' },
  { label: 'Products',     icon: Package,         path: '/admin/products' },
  { label: 'Add Product',  icon: PlusSquare,      path: '/admin/add-product' },
  { label: 'Orders',       icon: ShoppingCart,    path: '/admin/orders' },
  { label: 'Users',        icon: Users,           path: '/admin/users' },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`relative flex flex-col bg-[#0f1623] border-r border-white/5 transition-all duration-300 ease-in-out flex-shrink-0 ${
        collapsed ? 'w-[72px]' : 'w-60'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C5A880] to-[#A98E65] flex items-center justify-center flex-shrink-0">
          <Store className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white font-bold text-sm leading-tight tracking-wide">OM CLOTH</p>
            <p className="text-[#C5A880] text-[10px] tracking-widest uppercase">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-[68px] w-7 h-7 rounded-full bg-[#1e2433] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#C5A880] transition-all z-10 shadow-lg"
      >
        {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Nav Links */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, path }) => (
          <Link
            key={path}
            to={path}
            title={collapsed ? label : ''}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
              isActive(path)
                ? 'bg-gradient-to-r from-[#C5A880]/20 to-[#C5A880]/5 text-[#C5A880] border border-[#C5A880]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 ${isActive(path) ? 'text-[#C5A880]' : ''}`} />
            {!collapsed && (
              <span className="text-sm font-medium truncate">{label}</span>
            )}
            {isActive(path) && !collapsed && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            )}
          </Link>
        ))}
      </nav>

      {/* View Website + Logout */}
      <div className="px-2 py-4 border-t border-white/5 space-y-1">
        {/* View Website */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title={collapsed ? 'View Website' : ''}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
        >
          <ExternalLink className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">View Website</span>}
        </a>

        {/* Logout */}
        <button
          onClick={handleLogout}
          title={collapsed ? 'Logout' : ''}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
