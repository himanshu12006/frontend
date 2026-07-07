// src/firebase.js
// PURPOSE: Initialize Firebase Client SDK for Google Authentication.
// This file is the single source of truth for all Firebase configuration.
// It reads credentials from environment variables — NEVER hardcode secrets here.

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase project configuration from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize the Firebase application
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth service
export const auth = getAuth(app);

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Force Google to always show the account picker, even if the user is already signed in
// This gives users the ability to switch Google accounts
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export default app;
