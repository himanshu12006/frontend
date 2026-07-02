// src/services/paymentService.js
// PURPOSE: All Razorpay-related API calls to our backend

import API from '../api/axiosInstance';

/**
 * Step 1 — Ask backend to create a Razorpay order
 * Returns: { id, amount, currency, key_id }
 */
export const createRazorpayOrder = async (amount) => {
  const { data } = await API.post('/payment/create-order', { amount });
  return data.data;
};

/**
 * Step 2 — After payment, send signature to backend for verification
 * Backend verifies it and creates the order in MongoDB
 */
export const verifyPayment = async (paymentData) => {
  const { data } = await API.post('/payment/verify', paymentData);
  return data.data;
};

/**
 * Step 3 — Notify backend if payment failed
 */
export const reportPaymentFailure = async (failureData) => {
  const { data } = await API.post('/payment/failure', failureData);
  return data;
};

/**
 * Dynamically load the Razorpay checkout script from CDN
 * (Only loaded once — safe to call multiple times)
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
