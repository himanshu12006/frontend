// src/pages/Admin/AdminOrders.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { getAllOrders, updateOrderStatus } from '../../services/adminService';
import { useAdminToast } from '../../context/ToastContext';

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const STATUS_COLORS = {
  pending:    'bg-amber-500/20 text-amber-300 border-amber-500/30',
  processing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  shipped:    'bg-purple-500/20 text-purple-300 border-purple-500/30',
  delivered:  'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  cancelled:  'bg-red-500/20 text-red-300 border-red-500/30',
};

const PAYMENT_COLORS = {
  paid:    'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  pending: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  failed:  'bg-red-500/20 text-red-300 border-red-500/30',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState(null);
  const { addToast } = useAdminToast();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
      setFiltered(data);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to fetch orders', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  useEffect(() => {
    let result = [...orders];
    if (statusFilter !== 'all') result = result.filter((o) => o.orderStatus === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) => o._id.toLowerCase().includes(q) || o.user?.name?.toLowerCase().includes(q) || o.user?.email?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [search, statusFilter, orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      addToast(`Order status updated to "${newStatus}"`, 'success');
      setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update status', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by order ID or customer..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#C5A880]/50 transition-colors" />
        </div>
        <div className="relative">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-white/5 border border-white/10 rounded-xl pl-4 pr-8 py-2.5 text-sm text-white outline-none focus:border-[#C5A880]/50 transition-colors cursor-pointer">
            <option value="all" className="bg-[#0f1623]">All Statuses</option>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s} className="bg-[#0f1623] capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0f1623] border border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-[#C5A880]/30 border-t-[#C5A880] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-500">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-white/3">
                  {['Order ID', 'Customer', 'Items', 'Amount', 'Payment', 'Status', 'Update Status'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-slate-500 text-xs font-medium uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((order) => (
                  <tr key={order._id} className="hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3.5 text-[#C5A880] font-mono text-xs">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-white text-sm font-medium">{order.user?.name || 'Guest'}</p>
                      <p className="text-slate-500 text-xs">{order.user?.email}</p>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">{order.orderItems?.length} item(s)</td>
                    <td className="px-5 py-3.5 text-white font-semibold">₹{order.totalPrice?.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border capitalize ${PAYMENT_COLORS[order.paymentStatus] || ''}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium border capitalize ${STATUS_COLORS[order.orderStatus] || ''}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="relative">
                        <select
                          value={order.orderStatus}
                          disabled={updatingId === order._id || order.orderStatus === 'delivered' || order.orderStatus === 'cancelled'}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="appearance-none bg-white/5 border border-white/10 rounded-lg pl-3 pr-7 py-1.5 text-xs text-white outline-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:border-[#C5A880]/40 transition-colors"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s} className="bg-[#0f1623] capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                        {updatingId === order._id && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-[#C5A880]/30 border-t-[#C5A880] rounded-full animate-spin" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
