// src/pages/Admin/AdminProducts.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, Package, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { getAllProducts, deleteProduct } from '../../services/adminService';
import { useAdminToast } from '../../context/ToastContext';
import ConfirmDialog from '../../components/Admin/ConfirmDialog';

const PAGE_SIZE = 8;

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { addToast } = useAdminToast();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
      setFiltered(data);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to fetch products', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // Search filter
  useEffect(() => {
    const q = search.toLowerCase().trim();
    setFiltered(
      q ? products.filter((p) => p.name?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)) : products
    );
    setPage(1);
  }, [search, products]);

  const confirmDelete = async () => {
    try {
      await deleteProduct(deleteTarget._id);
      addToast(`"${deleteTarget.name}" deleted successfully`, 'success');
      setDeleteTarget(null);
      fetchProducts();
    } catch (err) {
      addToast(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-5">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#C5A880]/50 transition-colors"
          />
        </div>
        <Link
          to="/admin/add-product"
          className="flex items-center gap-2 bg-[#C5A880] hover:bg-[#A98E65] text-[#0a0f1a] text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="bg-[#0f1623] border border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-[#C5A880]/30 border-t-[#C5A880] rounded-full animate-spin" />
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-500 gap-3">
            <Package className="w-10 h-10 opacity-40" />
            <p>{search ? 'No products match your search.' : 'No products found. Add your first product!'}</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-white/3">
                    {['Image', 'Name', 'Category', 'Price', 'Stock', 'Sizes', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-slate-500 text-xs font-medium uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {paginated.map((product) => (
                    <tr key={product._id} className="hover:bg-white/3 transition-colors">
                      <td className="px-5 py-3">
                        {product.images?.[0]?.url ? (
                          <img src={product.images[0].url} alt={product.name} className="w-12 h-12 object-cover rounded-xl border border-white/10" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <ImageOff className="w-5 h-5 text-slate-500" />
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-3 text-white font-medium max-w-[180px] truncate">{product.name}</td>
                      <td className="px-5 py-3">
                        <span className="bg-blue-500/15 text-blue-300 border border-blue-500/25 px-2 py-0.5 rounded-full text-xs">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-[#C5A880] font-semibold">₹{product.price?.toLocaleString('en-IN')}</td>
                      <td className="px-5 py-3">
                        <span className={`font-semibold ${product.stock === 0 ? 'text-red-400' : product.stock < 5 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-400 text-xs">{(product.sizes || []).join(', ') || '—'}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/edit-product/${product._id}`}
                            className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 hover:bg-blue-500/25 transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(product)}
                            className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/25 flex items-center justify-center text-red-400 hover:bg-red-500/25 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
                <p className="text-slate-500 text-xs">
                  Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`w-8 h-8 rounded-lg text-xs font-medium border transition-colors ${
                        page === n
                          ? 'bg-[#C5A880] text-[#0a0f1a] border-[#C5A880]'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone and will also remove images from Cloudinary.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
