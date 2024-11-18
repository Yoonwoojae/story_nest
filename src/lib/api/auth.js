// src/lib/api/auth.js
import api from './axios';

export const signup = async (userData) => {
    try {
        const response = await api.post('/auth/signup', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const socialLogin = async (provider, code) => {
    try {
        const response = await api.post(`/auth/${provider}`, { code });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
