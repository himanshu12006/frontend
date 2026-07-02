// src/pages/Admin/AdminUsers.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Search, Trash2, ShieldCheck, User as UserIcon } from 'lucide-react';
import { getAllUsers, updateUserRole, deleteUser } from '../../services/adminService';
import { useAdminToast } from '../../context/ToastContext';
import ConfirmDialog from '../../components/Admin/ConfirmDialog';
import { useAuth } from '../../context/AuthContext';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const { addToast } = useAdminToast();
  const { user: currentUser } = useAuth();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
      setFiltered(data);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  useEffect(() => {
    const q = search.toLowerCase().trim();
    setFiltered(q ? users.filter((u) => u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q)) : users);
  }, [search, users]);

  const handleRoleToggle = async (user) => {
    if (user._id === currentUser?._id) {
      addToast("You can't change your own role.", 'warning'); return;
    }
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    setUpdatingId(user._id);
    try {
      await updateUserRole(user._id, newRole);
      addToast(`${user.name}'s role changed to "${newRole}"`, 'success');
      setUsers((prev) => prev.map((u) => u._id === user._id ? { ...u, role: newRole } : u));
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update role', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(deleteTarget._id);
      addToast(`${deleteTarget.name} deleted successfully`, 'success');
      setUsers((prev) => prev.filter((u) => u._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete user', 'error');
    }
  };

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#C5A880]/50 transition-colors" />
        </div>
        <div className="text-slate-500 text-sm">{filtered.length} user{filtered.length !== 1 ? 's' : ''}</div>
      </div>

      {/* Table */}
      <div className="bg-[#0f1623] border border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-[#C5A880]/30 border-t-[#C5A880] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-500">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-white/3">
                  {['User', 'Email', 'Role', 'Joined', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-slate-500 text-xs font-medium uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((user) => (
                  <tr key={user._id} className="hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                          user.role === 'admin'
                            ? 'bg-gradient-to-br from-[#C5A880] to-[#A98E65] text-white'
                            : 'bg-white/10 text-slate-300'
                        }`}>
                          {user.name?.substring(0, 2)?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-medium leading-tight">{user.name}</p>
                          {user._id === currentUser?._id && (
                            <span className="text-[10px] text-[#C5A880]">You</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 text-xs">{user.email}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border capitalize ${
                        user.role === 'admin'
                          ? 'bg-[#C5A880]/20 text-[#C5A880] border-[#C5A880]/30'
                          : 'bg-white/5 text-slate-400 border-white/10'
                      }`}>
                        {user.role === 'admin' ? <ShieldCheck className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs">
                      {new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        {/* Role toggle */}
                        <button
                          onClick={() => handleRoleToggle(user)}
                          disabled={updatingId === user._id}
                          title={user.role === 'admin' ? 'Make User' : 'Make Admin'}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors disabled:opacity-40 ${
                            user.role === 'admin'
                              ? 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                              : 'bg-[#C5A880]/15 border-[#C5A880]/30 text-[#C5A880] hover:bg-[#C5A880]/25'
                          }`}
                        >
                          {updatingId === user._id
                            ? '...'
                            : user.role === 'admin' ? 'Demote' : 'Make Admin'}
                        </button>
                        {/* Delete */}
                        {user._id !== currentUser?._id && (
                          <button
                            onClick={() => setDeleteTarget(user)}
                            className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/25 flex items-center justify-center text-red-400 hover:bg-red-500/25 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
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

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete User"
        message={`Are you sure you want to permanently delete "${deleteTarget?.name}"? All their data will be lost.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
