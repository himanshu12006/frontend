// src/services/adminService.js
// PURPOSE: All Axios API calls for the admin dashboard — one place for all admin API logic

import API from '../api/axiosInstance';

// ─── DASHBOARD ─────────────────────────────────────────────────────────
export const getDashboardStats = async () => {
  const [productsRes, ordersRes, usersRes] = await Promise.all([
    API.get('/products'),
    API.get('/orders'),
    API.get('/auth/users'),
  ]);
  const orders = ordersRes.data.data || [];
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'paid' || o.orderStatus === 'delivered')
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  return {
    totalProducts: (productsRes.data.data || []).length,
    totalOrders: orders.length,
    totalUsers: (usersRes.data.data || []).length,
    totalRevenue,
    recentOrders: orders.slice(0, 8),
  };
};

// ─── PRODUCTS ──────────────────────────────────────────────────────────
export const getAllProducts = async () => {
  const { data } = await API.get('/products');
  return data.data || [];
};

export const getSingleProduct = async (id) => {
  const { data } = await API.get(`/products/${id}`);
  return data.data;
};

export const addProduct = async (formData) => {
  const { data } = await API.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const updateProduct = async (id, formData) => {
  const { data } = await API.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await API.delete(`/products/${id}`);
  return data;
};

// ─── ORDERS ────────────────────────────────────────────────────────────
export const getAllOrders = async () => {
  const { data } = await API.get('/orders');
  return data.data || [];
};

export const updateOrderStatus = async (id, orderStatus) => {
  const { data } = await API.put(`/orders/${id}/status`, { orderStatus });
  return data;
};

// ─── USERS ─────────────────────────────────────────────────────────────
export const getAllUsers = async () => {
  const { data } = await API.get('/auth/users');
  return data.data || [];
};

export const updateUserRole = async (id, role) => {
  const { data } = await API.put(`/auth/users/${id}/role`, { role });
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await API.delete(`/auth/users/${id}`);
  return data;
};
