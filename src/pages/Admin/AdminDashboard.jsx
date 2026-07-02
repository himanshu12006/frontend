// src/pages/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Users, IndianRupee, ArrowRight, Clock } from 'lucide-react';
import StatCard from '../../components/Admin/StatCard';
import { getDashboardStats } from '../../services/adminService';

const STATUS_COLORS = {
  pending:    'bg-amber-500/20 text-amber-300 border-amber-500/30',
  processing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  shipped:    'bg-purple-500/20 text-purple-300 border-purple-500/30',
  delivered:  'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  cancelled:  'bg-red-500/20 text-red-300 border-red-500/30',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-[#C5A880]/30 border-t-[#C5A880] rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-red-400 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Products" value={stats.totalProducts} icon={Package}      color="blue"   change="+12%" />
        <StatCard title="Total Orders"   value={stats.totalOrders}   icon={ShoppingCart} color="purple" change="+8%"  />
        <StatCard title="Total Users"    value={stats.totalUsers}    icon={Users}        color="green"  change="+23%" />
        <StatCard title="Total Revenue"  value={stats.totalRevenue}  icon={IndianRupee}  color="gold"   prefix="₹" change="+18%" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Add New Product',  to: '/admin/add-product', desc: 'List a new item in store' },
          { label: 'Manage Orders',    to: '/admin/orders',      desc: 'View & update order statuses' },
          { label: 'Manage Users',     to: '/admin/users',       desc: 'Control user roles & access' },
        ].map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-[#C5A880]/40 hover:bg-white/8 transition-all group"
          >
            <div>
              <p className="text-white font-semibold text-sm">{action.label}</p>
              <p className="text-slate-500 text-xs mt-0.5">{action.desc}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#C5A880] group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-[#0f1623] border border-white/5 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C5A880]" />
            <h2 className="text-white font-semibold">Recent Orders</h2>
          </div>
          <Link to="/admin/orders" className="text-xs text-[#C5A880] hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/3">
                {['Order ID', 'Customer', 'Items', 'Total', 'Payment', 'Status'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-slate-500 text-xs font-medium uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(stats.recentOrders || []).length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-500">No orders yet</td>
                </tr>
              ) : (
                stats.recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-white/3 transition-colors">
                    <td className="px-6 py-3.5 text-[#C5A880] font-mono text-xs">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-3.5 text-slate-300">
                      {order.user?.name || 'Guest'}
                    </td>
                    <td className="px-6 py-3.5 text-slate-400">
                      {order.orderItems?.length || 0} item(s)
                    </td>
                    <td className="px-6 py-3.5 text-white font-semibold">
                      ₹{order.totalPrice?.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border capitalize ${
                        order.paymentStatus === 'paid'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium border capitalize ${STATUS_COLORS[order.orderStatus] || 'bg-slate-500/20 text-slate-300 border-slate-500/30'}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
