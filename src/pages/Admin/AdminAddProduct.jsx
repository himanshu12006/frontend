// src/pages/Admin/AdminAddProduct.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus } from 'lucide-react';
import { addProduct } from '../../services/adminService';
import { useAdminToast } from '../../context/ToastContext';

const CATEGORIES = ['Men', 'Women', 'Kids', 'T-Shirts', 'Shirts', 'Jeans', 'Dresses', 'Kurta', 'Saree', 'Accessories', 'Other'];
const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];

const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#C5A880]/60 transition-colors';
const labelCls = 'block text-slate-400 text-xs font-medium uppercase tracking-wider mb-1.5';

export default function AdminAddProduct() {
  const navigate = useNavigate();
  const { addToast } = useAdminToast();
  const [submitting, setSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '', stock: '', sizes: [],
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleSize = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    const previews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category || !form.stock) {
      addToast('Please fill all required fields.', 'warning');
      return;
    }
    if (imageFiles.length === 0) {
      addToast('Please upload at least one product image.', 'warning');
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('description', form.description);
      fd.append('price', form.price);
      fd.append('category', form.category);
      fd.append('stock', form.stock);
      fd.append('sizes', JSON.stringify(form.sizes));
      imageFiles.forEach((f) => fd.append('images', f));

      await addProduct(fd);
      addToast('Product added successfully!', 'success');
      navigate('/admin/products');
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to add product', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {/* Basic Info */}
      <div className="bg-[#0f1623] border border-white/5 rounded-2xl p-6 space-y-5">
        <h2 className="text-white font-semibold text-base mb-1">Product Information</h2>

        <div>
          <label className={labelCls}>Product Name <span className="text-red-400">*</span></label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Classic Silk Kurta" className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Describe the product in detail..." className={`${inputCls} resize-none`} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Price (₹) <span className="text-red-400">*</span></label>
            <input name="price" type="number" min="0" value={form.price} onChange={handleChange} placeholder="999" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Stock <span className="text-red-400">*</span></label>
            <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} placeholder="50" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Category <span className="text-red-400">*</span></label>
            <select name="category" value={form.category} onChange={handleChange} className={`${inputCls} cursor-pointer`}>
              <option value="" className="bg-[#0f1623]">Select category</option>
              {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#0f1623]">{c}</option>)}
            </select>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className={labelCls}>Available Sizes</label>
          <div className="flex flex-wrap gap-2">
            {ALL_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  form.sizes.includes(size)
                    ? 'bg-[#C5A880]/20 border-[#C5A880]/50 text-[#C5A880]'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/25'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className="bg-[#0f1623] border border-white/5 rounded-2xl p-6 space-y-4">
        <h2 className="text-white font-semibold text-base">Product Images</h2>

        {/* Previews */}
        {imagePreviews.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {imagePreviews.map((src, i) => (
              <div key={i} className="relative group w-24 h-24">
                <img src={src} alt="" className="w-24 h-24 object-cover rounded-xl border border-white/10" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload zone */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-8 cursor-pointer hover:border-[#C5A880]/40 transition-colors group">
          <Upload className="w-8 h-8 text-slate-500 group-hover:text-[#C5A880] transition-colors mb-2" />
          <p className="text-slate-400 text-sm">Click to upload images</p>
          <p className="text-slate-600 text-xs mt-1">JPG, PNG, WEBP • Max 5MB each</p>
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleImages} />
        </label>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 bg-[#C5A880] hover:bg-[#A98E65] disabled:opacity-60 text-[#0a0f1a] font-bold px-6 py-3 rounded-xl transition-colors"
        >
          {submitting ? (
            <div className="w-4 h-4 border-2 border-[#0a0f1a]/30 border-t-[#0a0f1a] rounded-full animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {submitting ? 'Adding Product...' : 'Add Product'}
        </button>
        <button type="button" onClick={() => navigate('/admin/products')} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white text-sm transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
