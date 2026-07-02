// src/pages/Admin/AdminEditProduct.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, Save, Loader2 } from 'lucide-react';
import { getSingleProduct, updateProduct } from '../../services/adminService';
import { useAdminToast } from '../../context/ToastContext';

const CATEGORIES = ['Men', 'Women', 'Kids', 'T-Shirts', 'Shirts', 'Jeans', 'Dresses', 'Kurta', 'Saree', 'Accessories', 'Other'];
const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];
const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#C5A880]/60 transition-colors';
const labelCls = 'block text-slate-400 text-xs font-medium uppercase tracking-wider mb-1.5';

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useAdminToast();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '', stock: '', sizes: [],
  });
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getSingleProduct(id);
        setForm({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          category: product.category || '',
          stock: product.stock || '',
          sizes: product.sizes || [],
        });
        setExistingImages(product.images || []);
      } catch (err) {
        addToast('Failed to load product details', 'error');
        navigate('/admin/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleSize = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }));
  };

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImageFiles((prev) => [...prev, ...files]);
    setNewImagePreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeNewImage = (i) => {
    setNewImageFiles((prev) => prev.filter((_, idx) => idx !== i));
    setNewImagePreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('description', form.description);
      fd.append('price', form.price);
      fd.append('category', form.category);
      fd.append('stock', form.stock);
      fd.append('sizes', JSON.stringify(form.sizes));
      newImageFiles.forEach((f) => fd.append('images', f));

      await updateProduct(id, fd);
      addToast('Product updated successfully!', 'success');
      navigate('/admin/products');
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update product', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-[#C5A880]/30 border-t-[#C5A880] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="bg-[#0f1623] border border-white/5 rounded-2xl p-6 space-y-5">
        <h2 className="text-white font-semibold text-base">Edit Product Information</h2>

        <div>
          <label className={labelCls}>Product Name <span className="text-red-400">*</span></label>
          <input name="name" value={form.name} onChange={handleChange} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} className={`${inputCls} resize-none`} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Price (₹)</label>
            <input name="price" type="number" min="0" value={form.price} onChange={handleChange} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Stock</label>
            <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Category</label>
            <select name="category" value={form.category} onChange={handleChange} className={`${inputCls} cursor-pointer`}>
              {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#0f1623]">{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className={labelCls}>Available Sizes</label>
          <div className="flex flex-wrap gap-2">
            {ALL_SIZES.map((size) => (
              <button key={size} type="button" onClick={() => toggleSize(size)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  form.sizes.includes(size)
                    ? 'bg-[#C5A880]/20 border-[#C5A880]/50 text-[#C5A880]'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/25'
                }`}
              >{size}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-[#0f1623] border border-white/5 rounded-2xl p-6 space-y-4">
        <h2 className="text-white font-semibold text-base">Product Images</h2>

        {/* Existing images */}
        {existingImages.length > 0 && (
          <div>
            <p className="text-slate-500 text-xs mb-2">Current Images (uploading new images will replace these)</p>
            <div className="flex flex-wrap gap-3">
              {existingImages.map((img, i) => (
                <img key={i} src={img.url} alt="" className="w-20 h-20 object-cover rounded-xl border border-white/10 opacity-60" />
              ))}
            </div>
          </div>
        )}

        {/* New image previews */}
        {newImagePreviews.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {newImagePreviews.map((src, i) => (
              <div key={i} className="relative group w-20 h-20">
                <img src={src} alt="" className="w-20 h-20 object-cover rounded-xl border border-[#C5A880]/30" />
                <button type="button" onClick={() => removeNewImage(i)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-2.5 h-2.5 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-6 cursor-pointer hover:border-[#C5A880]/40 transition-colors group">
          <Upload className="w-7 h-7 text-slate-500 group-hover:text-[#C5A880] transition-colors mb-2" />
          <p className="text-slate-400 text-sm">Upload new images to replace current ones</p>
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleNewImages} />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={submitting}
          className="flex items-center gap-2 bg-[#C5A880] hover:bg-[#A98E65] disabled:opacity-60 text-[#0a0f1a] font-bold px-6 py-3 rounded-xl transition-colors">
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => navigate('/admin/products')} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white text-sm transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
