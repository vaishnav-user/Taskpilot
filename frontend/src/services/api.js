import axios from 'axios';

// Use environment variable if available, otherwise localhost
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/auth`;

export const login = async (email, password) => {
  return await axios.post(`${API_URL}/login`, { email, password });
};

// Signup
export const signup = async (name, email, password) => {
  return await axios.post(`${API_URL}/signup`, { name, email, password });
};

// Forgot password
export const forgotPassword = async (email) => {
  return await axios.post(`${API_URL}/forgot-password`, { email });
};

// Reset password
export const resetPassword = async (email, otp, newPassword) => {
  return await axios.post(`${API_URL}/reset-password`, {
    email,
    otp,
    newPassword,
  });
};
